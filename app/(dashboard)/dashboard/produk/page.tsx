import { getMyProducts } from "@/actions/product";
import { getMyStore } from "@/actions/store";
import ProductList from "@/components/dashboard/ProductList";
import Link from "next/link";

export default async function ProdukPage() {
  const [store, products] = await Promise.all([getMyStore(), getMyProducts()]);

  if (!store) {
    return (
      <div className="p-6 lg:p-8">
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-10 text-center max-w-md">
          <div className="text-5xl mb-4">🏪</div>
          <h2 className="font-bold text-slate-900 mb-2">Buat toko dulu</h2>
          <p className="text-sm text-slate-500 mb-6">
            Kamu perlu buat toko terlebih dahulu sebelum menambahkan produk.
          </p>
          <Link
            href="/dashboard/toko"
            className="inline-flex items-center gap-2 bg-green-600 text-white font-semibold px-6 py-3 rounded-full hover:bg-green-700 transition-colors min-h-[44px]"
          >
            Buat Toko Sekarang
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 lg:p-8 max-w-4xl">
      <div className="flex flex-wrap items-start justify-between gap-4 mb-8">
        <div className="min-w-0">
          <h1 className="text-2xl font-extrabold text-slate-900">Produk</h1>
          <p className="text-slate-500 mt-1 text-sm truncate max-w-[240px] sm:max-w-none">
            {products.length === 0
              ? "Belum ada produk"
              : `${products.length} produk di toko ${store.name}`}
          </p>
        </div>
        <Link
          href="/dashboard/produk/tambah"
          className="flex-shrink-0 bg-green-600 text-white font-semibold px-5 py-3 rounded-full hover:bg-green-700 transition-colors text-sm"
        >
          + Tambah Produk
        </Link>
      </div>

      <ProductList products={products} />
    </div>
  );
}
