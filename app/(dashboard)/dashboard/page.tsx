import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function DashboardPage() {
  const session = await auth();
  const store = await prisma.store.findUnique({
    where: { userId: session!.user.id },
    include: { _count: { select: { products: true } } },
  });

  const firstName = session?.user?.name?.split(" ")[0] ?? "Seller";

  return (
    <div className="p-6 lg:p-8 max-w-4xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-extrabold text-slate-900">
          Halo, {firstName} 👋
        </h1>
        <p className="text-slate-500 mt-1">
          Selamat datang di dashboard TokoCepat.
        </p>
      </div>

      {!store ? (
        /* ── Belum ada toko ── */
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-2xl p-8 text-center max-w-md">
          <div className="text-5xl mb-4">🏪</div>
          <h2 className="text-lg font-bold text-slate-900 mb-2">
            Kamu belum punya toko
          </h2>
          <p className="text-slate-500 text-sm mb-6">
            Buat toko sekarang dan mulai terima order dalam 5 menit. Tidak
            perlu teknis, tinggal isi dan bagikan link.
          </p>
          <Link
            href="/dashboard/toko"
            className="inline-flex items-center gap-2 bg-green-600 text-white font-semibold px-6 py-2.5 rounded-full shadow-[0_4px_12px_rgba(22,163,74,0.3)] hover:bg-green-700 transition-colors"
          >
            Buat Toko Sekarang →
          </Link>
        </div>
      ) : (
        /* ── Sudah ada toko ── */
        <div className="space-y-6">
          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
            <StatCard
              icon="🏪"
              label="Nama Toko"
              value={store.name}
              sub="Toko aktif"
            />
            <StatCard
              icon="📦"
              label="Total Produk"
              value={store._count.products.toString()}
              sub={store._count.products === 0 ? "Belum ada produk" : "produk aktif"}
            />
            <StatCard
              icon="🔗"
              label="Link Toko"
              value="Lihat →"
              href={`/toko/${store.slug}`}
              sub={`/toko/${store.slug}`}
              linkTarget="_blank"
            />
          </div>

          {/* Quick actions */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6">
            <h2 className="font-bold text-slate-900 mb-4">Aksi Cepat</h2>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/dashboard/produk/tambah"
                className="inline-flex items-center gap-2 bg-green-600 text-white text-sm font-semibold px-5 py-2.5 rounded-full hover:bg-green-700 transition-colors"
              >
                + Tambah Produk
              </Link>
              <Link
                href="/dashboard/toko"
                className="inline-flex items-center gap-2 bg-white text-slate-700 text-sm font-semibold px-5 py-2.5 rounded-full border border-slate-200 hover:border-slate-400 transition-colors"
              >
                Edit Toko
              </Link>
              <Link
                href={`/toko/${store.slug}`}
                target="_blank"
                className="inline-flex items-center gap-2 bg-white text-slate-700 text-sm font-semibold px-5 py-2.5 rounded-full border border-slate-200 hover:border-slate-400 transition-colors"
              >
                Lihat Halaman Toko ↗
              </Link>
            </div>
          </div>

          {store._count.products === 0 && (
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-800">
              💡 Toko kamu belum punya produk. Tambahkan produk agar pembeli
              bisa melihat dan order.{" "}
              <Link
                href="/dashboard/produk/tambah"
                className="font-semibold underline"
              >
                Tambah sekarang
              </Link>
              .
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function StatCard({
  icon,
  label,
  value,
  sub,
  href,
  linkTarget,
}: {
  icon: string;
  label: string;
  value: string;
  sub: string;
  href?: string;
  linkTarget?: string;
}) {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
      <div className="text-2xl mb-2">{icon}</div>
      <div className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-1">
        {label}
      </div>
      {href ? (
        <Link
          href={href}
          target={linkTarget}
          className="text-base font-bold text-green-600 hover:underline"
        >
          {value}
        </Link>
      ) : (
        <div className="text-base font-bold text-slate-900 truncate">{value}</div>
      )}
      <div className="text-xs text-slate-400 mt-0.5 truncate">{sub}</div>
    </div>
  );
}
