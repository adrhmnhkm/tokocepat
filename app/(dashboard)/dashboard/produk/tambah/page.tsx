import ProductForm from "@/components/forms/ProductForm";
import Link from "next/link";

export default function TambahProdukPage() {
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
        <h1 className="text-2xl font-extrabold text-slate-900">Tambah Produk</h1>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
        <ProductForm />
      </div>
    </div>
  );
}
