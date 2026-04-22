import { prisma } from "@/lib/prisma";

function formatDate(d: Date) {
  return d.toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" });
}

export default async function AdminStoresPage() {
  const stores = await prisma.store.findMany({
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      name: true,
      slug: true,
      whatsapp: true,
      createdAt: true,
      user: { select: { name: true, email: true } },
      _count: { select: { products: true } },
      views: {
        select: { count: true },
      },
      waClicks: {
        select: { count: true },
      },
    },
  });

  const storesWithStats = stores.map((s) => ({
    ...s,
    totalViews: s.views.reduce((acc, v) => acc + v.count, 0),
    totalWaClicks: s.waClicks.reduce((acc, c) => acc + c.count, 0),
  }));

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-xl font-black text-slate-900">Toko</h1>
        <p className="text-sm text-slate-400 mt-0.5">{stores.length} toko terdaftar</p>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden overflow-x-auto">
        <table className="w-full text-sm min-w-[700px]">
          <thead>
            <tr className="border-b border-slate-100 text-xs text-slate-400 uppercase tracking-wider">
              <th className="text-left px-5 py-3">Toko</th>
              <th className="text-left px-5 py-3">Owner</th>
              <th className="text-center px-5 py-3">Produk</th>
              <th className="text-center px-5 py-3">Views</th>
              <th className="text-center px-5 py-3">Klik WA</th>
              <th className="text-left px-5 py-3">Dibuat</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {storesWithStats.map((s) => (
              <tr key={s.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-5 py-3">
                  <div>
                    <p className="font-semibold text-slate-800">{s.name}</p>
                    <a
                      href={`/${s.slug}`}
                      target="_blank"
                      className="text-xs text-green-600 hover:underline"
                    >
                      /{s.slug}
                    </a>
                  </div>
                </td>
                <td className="px-5 py-3">
                  <p className="text-slate-700 font-medium">{s.user.name}</p>
                  <p className="text-xs text-slate-400">{s.user.email}</p>
                </td>
                <td className="px-5 py-3 text-center">
                  <span className={`font-semibold ${s._count.products === 0 ? "text-slate-300" : "text-slate-800"}`}>
                    {s._count.products}
                  </span>
                </td>
                <td className="px-5 py-3 text-center font-semibold text-slate-700">
                  {s.totalViews.toLocaleString("id-ID")}
                </td>
                <td className="px-5 py-3 text-center font-semibold text-slate-700">
                  {s.totalWaClicks.toLocaleString("id-ID")}
                </td>
                <td className="px-5 py-3 text-slate-400 text-xs">
                  {formatDate(s.createdAt)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
