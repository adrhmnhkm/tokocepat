import { prisma } from "@/lib/prisma";

function StatCard({ label, value, sub }: { label: string; value: string | number; sub?: string }) {
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-5">
      <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">{label}</p>
      <p className="text-3xl font-black text-slate-900">{value}</p>
      {sub && <p className="text-xs text-slate-400 mt-1">{sub}</p>}
    </div>
  );
}

function formatDate(d: Date | null) {
  if (!d) return "—";
  return d.toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" });
}

export default async function AdminPage() {
  const now = new Date();
  const since7d = new Date(now);
  since7d.setDate(since7d.getDate() - 7);
  const since30d = new Date(now);
  since30d.setDate(since30d.getDate() - 30);

  const [
    totalUsers,
    newUsers7d,
    newUsers30d,
    totalStores,
    storesWithProducts,
    totalProducts,
    recentUsers,
  ] = await Promise.all([
    prisma.user.count(),
    prisma.user.count({ where: { createdAt: { gte: since7d } } }),
    prisma.user.count({ where: { createdAt: { gte: since30d } } }),
    prisma.store.count(),
    prisma.store.count({ where: { products: { some: {} } } }),
    prisma.product.count(),
    prisma.user.findMany({
      orderBy: { createdAt: "desc" },
      take: 10,
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
        lastLoginAt: true,
        store: { select: { slug: true, _count: { select: { products: true } } } },
      },
    }),
  ]);

  const storesNoProduct = totalStores - storesWithProducts;

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-xl font-black text-slate-900">Overview</h1>
        <p className="text-sm text-slate-400 mt-0.5">Data platform KirimLink secara keseluruhan.</p>
      </div>

      {/* Stat grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard label="Total User" value={totalUsers} sub={`+${newUsers7d} minggu ini`} />
        <StatCard label="Total Toko" value={totalStores} sub={`${storesWithProducts} toko aktif (ada produk)`} />
        <StatCard label="Total Produk" value={totalProducts} />
        <StatCard label="Toko Tanpa Produk" value={storesNoProduct} sub="perlu diaktifkan" />
      </div>

      {/* Growth 7d vs 30d */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="bg-white border border-slate-200 rounded-xl p-5">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4">User Baru</p>
          <div className="flex gap-8">
            <div>
              <p className="text-2xl font-black text-slate-900">{newUsers7d}</p>
              <p className="text-xs text-slate-400 mt-0.5">7 hari terakhir</p>
            </div>
            <div>
              <p className="text-2xl font-black text-slate-500">{newUsers30d}</p>
              <p className="text-xs text-slate-400 mt-0.5">30 hari terakhir</p>
            </div>
          </div>
        </div>
        <div className="bg-white border border-slate-200 rounded-xl p-5">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4">Aktivasi Toko</p>
          <div className="flex gap-8">
            <div>
              <p className="text-2xl font-black text-slate-900">
                {totalStores > 0 ? Math.round((storesWithProducts / totalStores) * 100) : 0}%
              </p>
              <p className="text-xs text-slate-400 mt-0.5">toko sudah punya produk</p>
            </div>
            <div>
              <p className="text-2xl font-black text-slate-500">
                {totalUsers > 0 ? Math.round((totalStores / totalUsers) * 100) : 0}%
              </p>
              <p className="text-xs text-slate-400 mt-0.5">user punya toko</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent users */}
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-100">
          <h2 className="font-bold text-slate-900 text-sm">User Terbaru</h2>
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-100 text-xs text-slate-400 uppercase tracking-wider">
              <th className="text-left px-5 py-3">Nama</th>
              <th className="text-left px-5 py-3 hidden md:table-cell">Email</th>
              <th className="text-left px-5 py-3">Toko</th>
              <th className="text-left px-5 py-3 hidden lg:table-cell">Daftar</th>
              <th className="text-left px-5 py-3 hidden lg:table-cell">Login Terakhir</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {recentUsers.map((u) => (
              <tr key={u.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-5 py-3 font-medium text-slate-800">{u.name}</td>
                <td className="px-5 py-3 text-slate-500 hidden md:table-cell">{u.email}</td>
                <td className="px-5 py-3">
                  {u.store ? (
                    <a
                      href={`/${u.store.slug}`}
                      target="_blank"
                      className="text-green-600 hover:underline font-medium"
                    >
                      {u.store.slug}
                      <span className="text-slate-400 font-normal ml-1">
                        ({u.store._count.products} produk)
                      </span>
                    </a>
                  ) : (
                    <span className="text-slate-300 text-xs">Belum ada toko</span>
                  )}
                </td>
                <td className="px-5 py-3 text-slate-400 hidden lg:table-cell">{formatDate(u.createdAt)}</td>
                <td className="px-5 py-3 text-slate-400 hidden lg:table-cell">{formatDate(u.lastLoginAt)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
