import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import Link from "next/link";
import AnalyticsTracker from "@/components/dashboard/AnalyticsTracker";

export default async function DashboardPage() {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) return null;

  const store = await prisma.store.findUnique({
    where: { userId },
    include: { _count: { select: { products: true } } },
  });

  // User baru tanpa toko → onboarding flow
  if (!store) redirect("/onboarding");

  const firstName = session?.user?.name?.split(" ")[0] ?? "Seller";

  return (
    <div className="p-6 lg:p-8 max-w-4xl">
      <AnalyticsTracker event="dashboard_view" />

      {/* Header */}
      <div className="mb-8 pb-6 border-b border-slate-100">
        <h1 className="text-xl font-bold text-slate-900">
          Halo, {firstName}
        </h1>
        <p className="text-sm text-slate-500 mt-0.5">
          Selamat datang kembali di TokoCepat.
        </p>
      </div>

      {/* ── Sudah ada toko ── */}
      <div className="space-y-5">
        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
          <StatCard
            label="Nama Toko"
            value={store.name}
            sub="Toko aktif"
          />
          <StatCard
            label="Total Produk"
            value={store._count.products.toString()}
            sub={store._count.products === 0 ? "Belum ada produk" : "produk"}
          />
          <StatCard
            label="Link Toko"
            value="Buka toko ↗"
            href={`/toko/${store.slug}`}
            sub={`/toko/${store.slug}`}
            linkTarget="_blank"
          />
        </div>

        {/* Quick actions */}
        <div className="bg-white border border-slate-200 rounded-xl p-5">
          <h2 className="text-sm font-semibold text-slate-500 mb-3 uppercase tracking-wide">
            Aksi Cepat
          </h2>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/dashboard/produk/tambah"
              className="inline-flex items-center gap-2 bg-green-600 text-white text-sm font-semibold px-5 py-3 rounded-lg hover:bg-green-700 transition-colors min-h-[44px]"
            >
              + Tambah Produk
            </Link>
            <Link
              href="/dashboard/toko"
              className="inline-flex items-center gap-2 bg-white text-slate-700 text-sm font-semibold px-5 py-3 rounded-lg border border-slate-200 hover:border-slate-300 transition-colors min-h-[44px]"
            >
              Edit Toko
            </Link>
            <Link
              href={`/toko/${store.slug}`}
              target="_blank"
              className="inline-flex items-center gap-2 bg-white text-slate-700 text-sm font-semibold px-5 py-3 rounded-lg border border-slate-200 hover:border-slate-300 transition-colors min-h-[44px]"
            >
              Lihat Toko ↗
            </Link>
          </div>
        </div>

        {store._count.products === 0 && (
          <div className="border border-amber-200 bg-amber-50 rounded-xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-amber-900 mb-0.5">
                Tokomu masih kosong
              </p>
              <p className="text-sm text-amber-700 leading-relaxed">
                Pembeli tidak bisa memesan jika belum ada produk. Tambahkan produk pertamamu sekarang.
              </p>
            </div>
            <Link
              href="/dashboard/produk/tambah"
              className="flex-shrink-0 text-sm font-semibold text-amber-900 border border-amber-300 bg-white px-4 py-2.5 rounded-lg hover:bg-amber-100 transition-colors min-h-[44px] inline-flex items-center justify-center"
            >
              Tambah Produk
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

function StatCard({
  label,
  value,
  sub,
  href,
  linkTarget,
}: {
  label: string;
  value: string;
  sub: string;
  href?: string;
  linkTarget?: string;
}) {
  return (
    <div className="bg-white border border-slate-100 rounded-xl p-4 sm:p-5">
      <p className="text-[11px] font-medium text-slate-400 uppercase tracking-wider mb-2">
        {label}
      </p>
      {href ? (
        <Link
          href={href}
          target={linkTarget}
          className="block text-sm font-semibold text-green-600 hover:text-green-700 truncate"
        >
          {value}
        </Link>
      ) : (
        <p className="text-sm font-semibold text-slate-900 truncate">{value}</p>
      )}
      <p className="text-xs text-slate-400 mt-1 truncate">{sub}</p>
    </div>
  );
}
