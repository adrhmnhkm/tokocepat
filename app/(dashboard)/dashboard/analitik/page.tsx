import { getAnalytics } from "@/actions/analytics";
import { redirect } from "next/navigation";

function formatDate(iso: string) {
  const d = new Date(iso + "T00:00:00Z");
  return d.toLocaleDateString("id-ID", { weekday: "short", day: "numeric", month: "short", timeZone: "UTC" });
}

function StatCard({ label, value7d, value30d }: { label: string; value7d: number; value30d: number }) {
  return (
    <div className="bg-white border border-slate-100 rounded-xl p-5">
      <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">{label}</p>
      <div className="flex items-end gap-6">
        <div>
          <p className="text-3xl font-black text-slate-900">{value7d.toLocaleString("id-ID")}</p>
          <p className="text-xs text-slate-400 mt-0.5">7 hari terakhir</p>
        </div>
        <div className="pb-0.5">
          <p className="text-lg font-bold text-slate-500">{value30d.toLocaleString("id-ID")}</p>
          <p className="text-xs text-slate-400 mt-0.5">30 hari terakhir</p>
        </div>
      </div>
    </div>
  );
}

export default async function AnalitikPage() {
  const data = await getAnalytics();
  if (!data) redirect("/onboarding");

  const maxVal = Math.max(...data.daily.map((d) => Math.max(d.views, d.waClicks)), 1);

  return (
    <div className="p-5 lg:p-8 max-w-2xl">
      <div className="mb-8">
        <h1 className="text-lg font-bold text-slate-900">Analitik</h1>
        <p className="text-sm text-slate-400 mt-0.5">
          Berapa kali toko kamu dilihat dan tombol WA diklik.
        </p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 gap-3 mb-8">
        <StatCard
          label="Kunjungan Toko"
          value7d={data.total7d.views}
          value30d={data.total30d.views}
        />
        <StatCard
          label="Klik Tombol WA"
          value7d={data.total7d.waClicks}
          value30d={data.total30d.waClicks}
        />
      </div>

      {/* Bar chart — 7 days */}
      <div className="bg-white border border-slate-100 rounded-xl p-5">
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-5">
          7 Hari Terakhir
        </p>

        {/* Legend */}
        <div className="flex items-center gap-4 mb-5 text-xs text-slate-500">
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-sm bg-green-500 inline-block" />
            Kunjungan
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-sm bg-slate-300 inline-block" />
            Klik WA
          </span>
        </div>

        <div className="flex items-end gap-2 h-36">
          {data.daily.map((d) => (
            <div key={d.date} className="flex-1 flex flex-col items-center gap-1">
              <div className="w-full flex items-end gap-0.5 h-28">
                <div
                  className="flex-1 bg-green-500 rounded-t-sm min-h-[2px] transition-all"
                  style={{ height: `${(d.views / maxVal) * 100}%` }}
                  title={`${d.views} kunjungan`}
                />
                <div
                  className="flex-1 bg-slate-200 rounded-t-sm min-h-[2px] transition-all"
                  style={{ height: `${(d.waClicks / maxVal) * 100}%` }}
                  title={`${d.waClicks} klik WA`}
                />
              </div>
              <p className="text-[10px] text-slate-400 text-center leading-tight">
                {formatDate(d.date)}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Table detail */}
      <div className="mt-4 bg-white border border-slate-100 rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-100">
              <th className="text-left px-5 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">Tanggal</th>
              <th className="text-right px-5 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">Kunjungan</th>
              <th className="text-right px-5 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">Klik WA</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {[...data.daily].reverse().map((d) => (
              <tr key={d.date} className="hover:bg-slate-50 transition-colors">
                <td className="px-5 py-3 text-slate-600">{formatDate(d.date)}</td>
                <td className="px-5 py-3 text-right font-semibold text-slate-900">{d.views.toLocaleString("id-ID")}</td>
                <td className="px-5 py-3 text-right font-semibold text-slate-900">{d.waClicks.toLocaleString("id-ID")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="mt-4 text-xs text-slate-400 text-center">
        Data diperbarui secara real-time · Zona waktu UTC
      </p>
    </div>
  );
}
