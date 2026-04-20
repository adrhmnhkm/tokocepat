"use client";

import { useActionState, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { saveProduct, type ProductActionState } from "@/actions/product";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";
import Button from "@/components/ui/Button";
import ImageUpload from "@/components/ui/ImageUpload";
import ShareActions from "@/components/ui/ShareActions";
import Link from "next/link";
import { toast } from "sonner";
import type { Product } from "@prisma/client";

type Props = { product?: Product | null };

export default function ProductForm({ product }: Props) {
  const router = useRouter();
  const [imageUrl, setImageUrl] = useState(product?.imageUrl ?? "");
  const [state, formAction, pending] = useActionState<ProductActionState, FormData>(
    saveProduct,
    null
  );

  useEffect(() => {
    if (state && "error" in state) {
      toast.error(state.error);
    }
  }, [state]);

  // ── Success state setelah tambah produk baru ──
  if (state && "success" in state) {
    const { storeSlug, storeName } = state.success;
    return (
      <div className="py-2">
        {/* Checkmark */}
        <div className="w-10 h-10 rounded-full bg-green-100 grid place-items-center mb-5">
          <svg className="w-5 h-5 text-green-600" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        </div>

        <h2 className="text-lg font-bold text-slate-900 mb-1">
          Produk berhasil ditambah!
        </h2>
        <p className="text-sm text-slate-500 leading-relaxed mb-6">
          Sekarang share link toko kamu ke customer di WhatsApp — mereka bisa langsung lihat dan pesan.
        </p>

        {/* Link preview */}
        <div className="bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 mb-4">
          <p className="text-xs text-slate-400 mb-0.5">Link toko kamu</p>
          <p className="text-sm font-mono text-slate-700 break-all">
            kirimlink.id/{storeSlug}
          </p>
        </div>

        {/* Share actions */}
        <ShareActions slug={storeSlug} storeName={storeName} layout="stack" />

        {/* Secondary */}
        <div className="flex gap-3 mt-5">
          <button
            onClick={() => router.push("/dashboard/produk/tambah")}
            className="flex-1 inline-flex items-center justify-center px-4 py-3 rounded-lg border border-slate-200 text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors min-h-[44px]"
          >
            + Tambah produk lagi
          </button>
          <Link
            href="/dashboard/produk"
            className="flex-1 inline-flex items-center justify-center px-4 py-3 rounded-lg border border-slate-200 text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors min-h-[44px]"
          >
            Lihat semua produk
          </Link>
        </div>
      </div>
    );
  }

  // ── Form biasa ──
  return (
    <form action={formAction} className="space-y-5">
      {product && <input type="hidden" name="id" value={product.id} />}
      <input type="hidden" name="imageUrl" value={imageUrl} />

      {state && "error" in state && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600">
          {state.error}
        </div>
      )}

      <ImageUpload value={imageUrl} onChange={setImageUrl} />

      <Input
        name="name"
        label="Nama Produk"
        defaultValue={product?.name ?? ""}
        placeholder="Contoh: Kaos Polos Premium"
        required
      />

      <Input
        name="price"
        label="Harga (Rp)"
        type="number"
        defaultValue={product?.price?.toString() ?? ""}
        placeholder="Contoh: 50000"
        min="1"
        required
        hint="Masukkan harga dalam Rupiah, tanpa titik atau koma"
      />

      <Textarea
        name="description"
        label="Deskripsi Produk"
        defaultValue={product?.description ?? ""}
        placeholder="Ceritakan detail produk: ukuran, bahan, varian warna, dll..."
        rows={4}
        maxLength={500}
        hint="Maks 500 karakter"
      />

      <div className="flex gap-3 pt-2">
        <Button
          type="button"
          variant="outline"
          size="lg"
          onClick={() => window.history.back()}
          className="flex-1"
        >
          Batal
        </Button>
        <Button type="submit" loading={pending} size="lg" className="flex-1">
          {pending
            ? "Menyimpan..."
            : product
            ? "Simpan Perubahan"
            : "Tambah Produk"}
        </Button>
      </div>
    </form>
  );
}
