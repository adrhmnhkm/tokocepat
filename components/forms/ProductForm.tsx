"use client";

import { useActionState, useState, useEffect } from "react";
import { saveProduct, type ProductActionState } from "@/actions/product";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";
import Button from "@/components/ui/Button";
import ImageUpload from "@/components/ui/ImageUpload";
import { toast } from "sonner";
import type { Product } from "@prisma/client";

type Props = { product?: Product | null };

export default function ProductForm({ product }: Props) {
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

  return (
    <form action={formAction} className="space-y-5">
      {/* Hidden fields */}
      {product && <input type="hidden" name="id" value={product.id} />}
      <input type="hidden" name="imageUrl" value={imageUrl} />

      {state && "error" in state && (
        <div className="p-3.5 bg-red-50 border border-red-200 rounded-xl text-sm text-red-600">
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
