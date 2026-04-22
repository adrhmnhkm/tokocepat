import { prisma } from "@/lib/prisma";

function formatDate(d: Date | null) {
  if (!d) return "—";
  return d.toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" });
}

function Badge({ active }: { active: boolean }) {
  return (
    <span className={`inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full ${active ? "bg-green-100 text-green-700" : "bg-slate-100 text-slate-400"}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${active ? "bg-green-500" : "bg-slate-300"}`} />
      {active ? "Aktif" : "Belum setup"}
    </span>
  );
}

export default async function AdminUsersPage() {
  const users = await prisma.user.findMany({
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      name: true,
      email: true,
      createdAt: true,
      lastLoginAt: true,
      store: {
        select: {
          slug: true,
          name: true,
          _count: { select: { products: true } },
        },
      },
    },
  });

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-black text-slate-900">Users</h1>
          <p className="text-sm text-slate-400 mt-0.5">{users.length} user terdaftar</p>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-100 text-xs text-slate-400 uppercase tracking-wider">
              <th className="text-left px-5 py-3">Nama</th>
              <th className="text-left px-5 py-3">Email</th>
              <th className="text-left px-5 py-3">Status</th>
              <th className="text-left px-5 py-3 hidden lg:table-cell">Produk</th>
              <th className="text-left px-5 py-3 hidden lg:table-cell">Daftar</th>
              <th className="text-left px-5 py-3 hidden lg:table-cell">Login Terakhir</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {users.map((u) => (
              <tr key={u.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-5 py-3 font-medium text-slate-800">{u.name}</td>
                <td className="px-5 py-3 text-slate-500 text-xs">{u.email}</td>
                <td className="px-5 py-3">
                  {u.store ? (
                    <div className="flex flex-col gap-1">
                      <Badge active={u.store._count.products > 0} />
                      <a
                        href={`/${u.store.slug}`}
                        target="_blank"
                        className="text-[11px] text-green-600 hover:underline"
                      >
                        /{u.store.slug}
                      </a>
                    </div>
                  ) : (
                    <span className="text-xs text-slate-300">Belum buat toko</span>
                  )}
                </td>
                <td className="px-5 py-3 text-slate-500 hidden lg:table-cell">
                  {u.store ? `${u.store._count.products} produk` : "—"}
                </td>
                <td className="px-5 py-3 text-slate-400 text-xs hidden lg:table-cell">
                  {formatDate(u.createdAt)}
                </td>
                <td className="px-5 py-3 text-slate-400 text-xs hidden lg:table-cell">
                  {formatDate(u.lastLoginAt)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
