import { type NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const slug = req.nextUrl.searchParams.get("slug");
  const storeId = req.nextUrl.searchParams.get("storeId");

  if (!slug || slug.length < 3) {
    return NextResponse.json({ available: false });
  }

  const store = await prisma.store.findUnique({ where: { slug } });

  if (!store) return NextResponse.json({ available: true });

  // Toko milik sendiri → tetap available (bisa pakai slug yang sama)
  if (storeId && store.id === storeId) {
    return NextResponse.json({ available: true });
  }

  return NextResponse.json({ available: false });
}
