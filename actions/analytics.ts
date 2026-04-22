"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

function daysAgo(n: number): Date {
  const d = new Date();
  d.setUTCHours(0, 0, 0, 0);
  d.setUTCDate(d.getUTCDate() - n);
  return d;
}

export type DailyStat = {
  date: string; // "YYYY-MM-DD"
  views: number;
  waClicks: number;
};

export type AnalyticsData = {
  total7d: { views: number; waClicks: number };
  total30d: { views: number; waClicks: number };
  daily: DailyStat[]; // last 7 days, oldest first
};

export async function getAnalytics(): Promise<AnalyticsData | null> {
  const session = await auth();
  if (!session?.user?.id) return null;

  const store = await prisma.store.findUnique({
    where: { userId: session.user.id },
    select: { id: true },
  });
  if (!store) return null;

  const since7d = daysAgo(6);
  const since30d = daysAgo(29);

  const [views7d, views30d, clicks7d, clicks30d] = await Promise.all([
    prisma.storeView.findMany({
      where: { storeId: store.id, date: { gte: since7d } },
      select: { date: true, count: true },
    }),
    prisma.storeView.aggregate({
      where: { storeId: store.id, date: { gte: since30d } },
      _sum: { count: true },
    }),
    prisma.waClick.findMany({
      where: { storeId: store.id, date: { gte: since7d } },
      select: { date: true, count: true },
    }),
    prisma.waClick.aggregate({
      where: { storeId: store.id, date: { gte: since30d } },
      _sum: { count: true },
    }),
  ]);

  // Build a map for last 7 days
  const viewMap = new Map<string, number>();
  for (const v of views7d) {
    const key = v.date.toISOString().slice(0, 10);
    viewMap.set(key, (viewMap.get(key) ?? 0) + v.count);
  }

  const clickMap = new Map<string, number>();
  for (const c of clicks7d) {
    const key = c.date.toISOString().slice(0, 10);
    clickMap.set(key, (clickMap.get(key) ?? 0) + c.count);
  }

  // Build daily array for last 7 days (oldest first)
  const daily: DailyStat[] = [];
  for (let i = 6; i >= 0; i--) {
    const d = daysAgo(i);
    const key = d.toISOString().slice(0, 10);
    daily.push({
      date: key,
      views: viewMap.get(key) ?? 0,
      waClicks: clickMap.get(key) ?? 0,
    });
  }

  const total7dViews = daily.reduce((s, d) => s + d.views, 0);
  const total7dClicks = daily.reduce((s, d) => s + d.waClicks, 0);

  return {
    total7d: { views: total7dViews, waClicks: total7dClicks },
    total30d: {
      views: views30d._sum.count ?? 0,
      waClicks: clicks30d._sum.count ?? 0,
    },
    daily,
  };
}
