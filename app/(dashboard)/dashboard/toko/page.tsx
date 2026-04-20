import { getMyStore } from "@/actions/store";
import StoreForm from "@/components/forms/StoreForm";
import Link from "next/link";

export default async function TokoPage() {
  const store = await getMyStore();

  return (
    <div className="p-6 lg:p-8 max-w-2xl">
      <div className="mb-8">
        <h1 className="text-2xl font-extrabold text-slate-900">
          {store ? "Edit Toko" : "Buat Toko"}
        </h1>
        <p className="text-slate-500 mt-1">
          {store
            ? "Update informasi tokomu."
            : "Isi informasi toko untuk mulai jualan."}
        </p>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
        <StoreForm store={store} />
      </div>

      {store && (
        <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-xl flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-green-800">Preview toko kamu</p>
            <p className="text-xs text-green-700 font-mono mt-0.5">
              /{store.slug}
            </p>
          </div>
          <Link
            href={`/${store.slug}`}
            target="_blank"
            className="text-xs font-semibold text-green-700 underline hover:no-underline whitespace-nowrap"
          >
            Lihat toko ↗
          </Link>
        </div>
      )}
    </div>
  );
}
