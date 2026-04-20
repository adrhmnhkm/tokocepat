"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { productSchema } from "@/lib/validations";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export type ProductActionState = { error: string } | null;

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
    // Update — verifikasi ownership
    const product = await prisma.product.findUnique({ where: { id } });
    if (!product || product.storeId !== store.id) {
      return { error: "Produk tidak ditemukan." };
    }
    await prisma.product.update({ where: { id }, data });
  } else {
    // Create
    await prisma.product.create({ data: { ...data, storeId: store.id } });
  }

  revalidatePath("/dashboard/produk");
  revalidatePath(`/${store.slug}`);
  redirect("/dashboard/produk");
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
    include: { products: { orderBy: { createdAt: "desc" } } },
  });

  return store?.products ?? [];
}
