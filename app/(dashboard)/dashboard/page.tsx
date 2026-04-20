import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import Link from "next/link";
import AnalyticsTracker from "@/components/dashboard/AnalyticsTracker";
import ShareActions from "@/components/ui/ShareActions";

export default async function DashboardPage() {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) return null;

  const store = await prisma.store.findUnique({
    where: { userId },
    include: { _count: { select: { products: true } } },
  });

  if (!store) redirect("/onboarding");

  const firstName = session?.user?.name?.split(" ")[0] ?? "Seller";
  const hasProducts = store._count.products > 0;

  return (
    <div className="p-5 lg:p-8 max-w-2xl">
      <AnalyticsTracker event="dashboard_view" />

      {/* Header */}
      <div className="mb-6">
        <h1 className="text-lg font-bold text-slate-900">Halo, {firstName}</h1>
        <p className="text-sm text-slate-400 mt-0.5">
          {hasProducts
            ? "Toko kamu aktif — share linknya ke customer sekarang."
            : "Tambah produk dulu, lalu share link toko ke customer."}
        </p>
      </div>

      {/* ── Share box — ini yang paling penting ── */}
      <div className={`bg-white border rounded-xl p-5 mb-5 ${hasProducts ? "border-slate-200" : "border-slate-200 opacity-90"}`}>
        <div className="mb-4">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-1">
            Link toko kamu
          </p>
          <p className={`text-sm font-mono break-all ${hasProducts ? "text-slate-700" : "text-slate-400"}`}>
            kirimlink.id/{store.slug}
          </p>
        </div>

        {hasProducts ? (
          <ShareActions slug={store.slug} storeName={store.name} layout="row" />
        ) : (
          <div className="space-y-3">
            <div className="bg-amber-50 border border-amber-200 rounded-lg px-4 py-3">
              <p className="text-xs font-semibold text-amber-800 mb-0.5">
                Link belum bisa dipakai
              </p>
              <p className="text-xs text-amber-700 leading-relaxed">
                Tambah minimal 1 produk dulu biar customer bisa lihat tokomu.
              </p>
            </div>
            <Link
              href="/dashboard/produk/tambah"
              className="w-full inline-flex items-center justify-center gap-2 bg-green-600 text-white text-sm font-semibold px-5 py-3 rounded-lg hover:bg-green-700 transition-colors min-h-[48px]"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
              </svg>
              Tambah Produk Pertama
            </Link>
          </div>
        )}
      </div>

      {/* ── Stats row ── */}
      <div className="grid grid-cols-2 gap-3 mb-5">
        <div className="bg-white border border-slate-100 rounded-xl p-4">
          <p className="text-[11px] font-medium text-slate-400 uppercase tracking-wider mb-1">
            Produk
          </p>
          <p className="text-xl font-bold text-slate-900">
            {store._count.products}
          </p>
          <p className="text-xs text-slate-400 mt-0.5">
            {store._count.products === 0 ? "Belum ada" : "aktif"}
          </p>
        </div>
        <div className="bg-white border border-slate-100 rounded-xl p-4">
          <p className="text-[11px] font-medium text-slate-400 uppercase tracking-wider mb-1">
            Toko
          </p>
          <p className="text-sm font-semibold text-slate-900 truncate mt-1">
            {store.name}
          </p>
          {hasProducts ? (
            <Link
              href={`/${store.slug}`}
              target="_blank"
              className="text-xs text-green-600 hover:text-green-700 mt-0.5 block"
            >
              Lihat toko ↗
            </Link>
          ) : (
            <span className="text-xs text-slate-300 mt-0.5 block cursor-not-allowed">
              Belum ada produk
            </span>
          )}
        </div>
      </div>

      {/* ── Quick links ── */}
      <div className="flex flex-wrap gap-2">
        <Link
          href="/dashboard/produk/tambah"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-600 border border-slate-200 bg-white px-4 py-2.5 rounded-lg hover:border-slate-300 hover:bg-slate-50 transition-colors min-h-[40px]"
        >
          + Tambah Produk
        </Link>
        <Link
          href="/dashboard/produk"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-600 border border-slate-200 bg-white px-4 py-2.5 rounded-lg hover:border-slate-300 hover:bg-slate-50 transition-colors min-h-[40px]"
        >
          Lihat Semua Produk
        </Link>
        <Link
          href="/dashboard/toko"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-600 border border-slate-200 bg-white px-4 py-2.5 rounded-lg hover:border-slate-300 hover:bg-slate-50 transition-colors min-h-[40px]"
        >
          Edit Toko
        </Link>
      </div>
    </div>
  );
}
