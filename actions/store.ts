"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { storeSchema } from "@/lib/validations";
import { normalizeWhatsApp } from "@/lib/utils";
import { revalidatePath } from "next/cache";

export type StoreActionState = { error: string } | { success: string } | null;

export async function upsertStore(
  _prev: StoreActionState,
  formData: FormData
): Promise<StoreActionState> {
  const session = await auth();
  if (!session?.user?.id) return { error: "Tidak terautentikasi." };

  const raw = Object.fromEntries(formData);
  const result = storeSchema.safeParse(raw);

  if (!result.success) {
    return { error: result.error.errors[0].message };
  }

  const { name, slug, description, logoUrl, whatsapp } = result.data;
  const normalizedWA = normalizeWhatsApp(whatsapp);

  // Cek slug konflik dengan toko lain
  const existingOwn = await prisma.store.findUnique({
    where: { userId: session.user.id },
  });

  const slugConflict = await prisma.store.findUnique({ where: { slug } });

  if (slugConflict && slugConflict.id !== existingOwn?.id) {
    return { error: "Slug sudah dipakai toko lain. Pilih yang berbeda." };
  }

  await prisma.store.upsert({
    where: { userId: session.user.id },
    create: { name, slug, description, logoUrl: logoUrl || null, whatsapp: normalizedWA, userId: session.user.id },
    update: { name, slug, description, logoUrl: logoUrl || null, whatsapp: normalizedWA },
  });

  revalidatePath("/dashboard");
  revalidatePath("/dashboard/toko");
  revalidatePath(`/${slug}`);

  return { success: "Toko berhasil disimpan!" };
}

export async function getMyStore() {
  const session = await auth();
  if (!session?.user?.id) return null;

  return prisma.store.findUnique({ where: { userId: session.user.id } });
}

export async function checkSlugAvailable(
  slug: string,
  currentStoreId?: string
): Promise<boolean> {
  const store = await prisma.store.findUnique({ where: { slug } });
  if (!store) return true;
  if (currentStoreId && store.id === currentStoreId) return true;
  return false;
}
