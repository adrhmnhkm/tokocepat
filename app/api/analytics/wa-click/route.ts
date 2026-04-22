import { type NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

function startOfDayUTC(): Date {
  const d = new Date();
  d.setUTCHours(0, 0, 0, 0);
  return d;
}

export async function POST(req: NextRequest) {
  try {
    const { storeId } = await req.json();
    if (!storeId || typeof storeId !== "string") {
      return NextResponse.json({ ok: false }, { status: 400 });
    }

    const date = startOfDayUTC();

    await prisma.waClick.upsert({
      where: { storeId_date: { storeId, date } },
      create: { storeId, date, count: 1 },
      update: { count: { increment: 1 } },
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
