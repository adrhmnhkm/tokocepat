import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
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

  const firstName = session?.user?.name?.split(" ")[0] ?? "Seller";

  return (
    <div className="p-6 lg:p-8 max-w-4xl">
      <AnalyticsTracker event="dashboard_view" />

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
        /* ── Belum ada toko: onboarding 3 langkah ── */
        <div className="space-y-6 max-w-lg">
          {/* Steps — compact on small screens */}
          <div className="grid grid-cols-3 gap-2 sm:gap-3">
            {[
              { step: "1", icon: "🏪", label: "Buat toko", active: true },
              { step: "2", icon: "📦", label: "Tambah produk", active: false },
              { step: "3", icon: "🔗", label: "Bagikan link", active: false },
            ].map(({ step, icon, label, active }) => (
              <div
                key={step}
                className={`rounded-xl p-2.5 sm:p-4 text-center border ${
                  active
                    ? "bg-green-50 border-green-300"
                    : "bg-white border-slate-200 opacity-50"
                }`}
              >
                <div className="text-xl sm:text-2xl mb-1">{icon}</div>
                <div
                  className={`text-[10px] sm:text-xs font-bold mb-0.5 ${
                    active ? "text-green-700" : "text-slate-500"
                  }`}
                >
                  {step}
                </div>
                <div className="text-[10px] sm:text-xs text-slate-600 leading-tight">{label}</div>
              </div>
            ))}
          </div>

          {/* CTA card */}
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-2xl p-8 text-center">
            <div className="text-5xl mb-4">🏪</div>
            <h2 className="text-lg font-bold text-slate-900 mb-2">
              Mulai dengan membuat toko kamu
            </h2>
            <p className="text-slate-500 text-sm mb-6">
              Isi nama toko, slug URL, dan nomor WhatsApp. Selesai dalam 2 menit.
              Tidak perlu keahlian teknis.
            </p>
            <Link
              href="/dashboard/toko"
              className="inline-flex items-center gap-2 bg-green-600 text-white font-semibold px-6 py-2.5 rounded-full shadow-[0_4px_12px_rgba(22,163,74,0.3)] hover:bg-green-700 transition-colors"
            >
              Buat Toko Sekarang →
            </Link>
          </div>
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
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-3">
              <span className="text-xl flex-shrink-0">📦</span>
              <div className="flex-1 text-sm text-amber-800">
                <p className="font-semibold mb-0.5">Belum ada produk di tokomu</p>
                <p className="text-amber-700">
                  Pembeli tidak bisa order jika toko kosong. Tambahkan produk
                  pertamamu sekarang — hanya butuh 1 menit.
                </p>
              </div>
              <Link
                href="/dashboard/produk/tambah"
                className="flex-shrink-0 text-xs font-semibold text-amber-800 border border-amber-300 bg-white px-3 py-1.5 rounded-lg hover:bg-amber-100 transition-colors whitespace-nowrap"
              >
                + Tambah Produk
              </Link>
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
