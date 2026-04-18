import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { notFound, redirect } from "next/navigation";
import ProductForm from "@/components/forms/ProductForm";
import Link from "next/link";

export default async function EditProdukPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const session = await auth();

  const store = await prisma.store.findUnique({
    where: { userId: session!.user.id },
  });

  if (!store) redirect("/dashboard/toko");

  const product = await prisma.product.findUnique({ where: { id } });

  if (!product || product.storeId !== store.id) notFound();

  return (
    <div className="p-6 lg:p-8 max-w-2xl">
      <div className="flex items-center gap-3 mb-8">
        <Link
          href="/dashboard/produk"
          className="text-slate-400 hover:text-slate-700 transition-colors text-sm"
        >
          ← Produk
        </Link>
        <span className="text-slate-300">/</span>
        <h1 className="text-2xl font-extrabold text-slate-900">Edit Produk</h1>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
        <ProductForm product={product} />
      </div>
    </div>
  );
}
