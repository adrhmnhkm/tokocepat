"use client";

import { useState, useTransition } from "react";
import Image from "next/image";
import Link from "next/link";
import { deleteProduct, setFeaturedProduct } from "@/actions/product";
import { formatRupiah } from "@/lib/utils";
import ConfirmDialog from "@/components/ui/ConfirmDialog";
import { toast } from "sonner";
import type { Product } from "@prisma/client";

export default function ProductList({ products }: { products: Product[] }) {
  const [confirmId, setConfirmId] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function handleDelete(id: string) {
    startTransition(async () => {
      const result = await deleteProduct(id);
      setConfirmId(null);
      if (result && "error" in result) {
        toast.error(result.error);
      } else {
        toast.success("Produk berhasil dihapus.");
      }
    });
  }

  function handleSetFeatured(id: string) {
    startTransition(async () => {
      const result = await setFeaturedProduct(id);
      if (result && "error" in result) {
        toast.error(result.error);
      } else {
        toast.success("Produk unggulan berhasil diubah.");
      }
    });
  }

  if (products.length === 0) {
    return (
      <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center">
        <div className="text-5xl mb-4">📦</div>
        <h2 className="font-bold text-slate-900 mb-2">Belum ada produk</h2>
        <p className="text-sm text-slate-500 mb-6">
          Tambahkan produk pertamamu dan mulai terima order dari pembeli.
        </p>
        <Link
          href="/dashboard/produk/tambah"
          className="inline-flex items-center gap-2 bg-green-600 text-white text-sm font-semibold px-5 py-3 rounded-full hover:bg-green-700 transition-colors min-h-[44px]"
        >
          + Tambah Produk Pertama
        </Link>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-3">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white border border-slate-200 rounded-2xl p-4 flex items-center gap-3 shadow-sm hover:shadow-md transition-shadow"
          >
            {/* Thumbnail */}
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl overflow-hidden bg-slate-100 flex-shrink-0 relative">
              {product.imageUrl ? (
                <Image src={product.imageUrl} alt={product.name} fill className="object-cover" />
              ) : (
                <div className="w-full h-full grid place-items-center text-2xl">📦</div>
              )}
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5 flex-wrap">
                <h3 className="font-bold text-slate-900 truncate text-sm sm:text-base">
                  {product.name}
                </h3>
                {product.isFeatured && (
                  <span className="inline-flex items-center gap-0.5 text-[10px] font-bold text-amber-600 bg-amber-50 border border-amber-200 px-1.5 py-0.5 rounded-full flex-shrink-0">
                    ⭐ Unggulan
                  </span>
                )}
              </div>
              <p className="text-green-600 font-bold text-sm">{formatRupiah(product.price)}</p>
              {product.description && (
                <p className="text-xs text-slate-400 truncate mt-0.5 hidden sm:block">
                  {product.description}
                </p>
              )}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-1.5 flex-shrink-0">
              {/* Tombol unggulan */}
              <button
                onClick={() => handleSetFeatured(product.id)}
                disabled={isPending || product.isFeatured}
                title={product.isFeatured ? "Sudah jadi unggulan" : "Jadikan produk unggulan"}
                className="inline-flex items-center justify-center min-h-[40px] w-10 rounded-full border transition-colors disabled:opacity-40 disabled:cursor-not-allowed border-amber-200 text-amber-500 hover:bg-amber-50"
              >
                ⭐
              </button>

              <Link
                href={`/dashboard/produk/${product.id}/edit`}
                className="inline-flex items-center justify-center min-h-[40px] px-3.5 text-xs font-semibold text-slate-600 border border-slate-200 rounded-full hover:border-slate-400 transition-colors"
              >
                Edit
              </Link>
              <button
                onClick={() => setConfirmId(product.id)}
                className="inline-flex items-center justify-center min-h-[40px] px-3.5 text-xs font-semibold text-red-600 border border-red-200 rounded-full hover:bg-red-50 transition-colors"
              >
                Hapus
              </button>
            </div>
          </div>
        ))}
      </div>

      <ConfirmDialog
        open={!!confirmId}
        title="Hapus produk ini?"
        message="Produk yang sudah dihapus tidak bisa dikembalikan."
        onConfirm={() => confirmId && handleDelete(confirmId)}
        onCancel={() => setConfirmId(null)}
        loading={isPending}
      />
    </>
  );
}
