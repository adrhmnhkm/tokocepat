"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { productSchema } from "@/lib/validations";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export type ProductActionState =
  | { error: string }
  | { success: { storeSlug: string; storeName: string } }
  | null;

async function getStoreForUser(userId: string) {
  return prisma.store.findUnique({ where: { userId } });
}

// Satu action untuk create & update — bedanya dari field hidden "id"
export async function saveProduct(
  _prev: ProductActionState,
  formData: FormData
): Promise<ProductActionState> {
  const session = await auth();
  if (!session?.user?.id) return { error: "Tidak terautentikasi." };

  const store = await getStoreForUser(session.user.id);
  if (!store) return { error: "Buat toko terlebih dahulu." };

  const raw = Object.fromEntries(formData);
  const result = productSchema.safeParse(raw);
  if (!result.success) return { error: result.error.errors[0].message };

  const data = {
    name: result.data.name,
    description: result.data.description ?? null,
    price: result.data.price,
    imageUrl: result.data.imageUrl || null,
  };

  const id = formData.get("id") as string | null;

  if (id) {
    // Update — verifikasi ownership, lalu redirect ke list
    const product = await prisma.product.findUnique({ where: { id } });
    if (!product || product.storeId !== store.id) {
      return { error: "Produk tidak ditemukan." };
    }
    await prisma.product.update({ where: { id }, data });
    revalidatePath("/dashboard/produk");
    revalidatePath(`/${store.slug}`);
    redirect("/dashboard/produk");
  } else {
    // Create — return success state biar form bisa tampilkan share CTA
    await prisma.product.create({ data: { ...data, storeId: store.id } });
    revalidatePath("/dashboard/produk");
    revalidatePath(`/${store.slug}`);
    return { success: { storeSlug: store.slug, storeName: store.name } };
  }
}

export async function deleteProduct(id: string): Promise<ProductActionState> {
  const session = await auth();
  if (!session?.user?.id) return { error: "Tidak terautentikasi." };

  const store = await getStoreForUser(session.user.id);
  if (!store) return { error: "Toko tidak ditemukan." };

  const product = await prisma.product.findUnique({ where: { id } });
  if (!product || product.storeId !== store.id) {
    return { error: "Produk tidak ditemukan." };
  }

  await prisma.product.delete({ where: { id } });

  revalidatePath("/dashboard/produk");
  revalidatePath(`/${store.slug}`);
  return null;
}

export async function getMyProducts() {
  const session = await auth();
  if (!session?.user?.id) return [];

  const store = await prisma.store.findUnique({
    where: { userId: session.user.id },
    include: {
      products: { orderBy: [{ isFeatured: "desc" }, { createdAt: "desc" }] },
    },
  });

  return store?.products ?? [];
}

export async function setFeaturedProduct(productId: string): Promise<{ error: string } | null> {
  const session = await auth();
  if (!session?.user?.id) return { error: "Tidak terautentikasi." };

  const store = await getStoreForUser(session.user.id);
  if (!store) return { error: "Toko tidak ditemukan." };

  const product = await prisma.product.findUnique({ where: { id: productId } });
  if (!product || product.storeId !== store.id) return { error: "Produk tidak ditemukan." };

  // Unset semua produk lain, lalu set yang dipilih
  await prisma.$transaction([
    prisma.product.updateMany({
      where: { storeId: store.id },
      data: { isFeatured: false },
    }),
    prisma.product.update({
      where: { id: productId },
      data: { isFeatured: true },
    }),
  ]);

  revalidatePath("/dashboard/produk");
  revalidatePath(`/${store.slug}`);
  return null;
}
