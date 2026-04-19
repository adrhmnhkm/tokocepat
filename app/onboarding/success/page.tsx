import { getMyStore } from "@/actions/store";
import { redirect } from "next/navigation";
import Link from "next/link";
import CopyButton from "./CopyButton";

export default async function OnboardingSuccessPage() {
  const store = await getMyStore();
  if (!store) redirect("/onboarding");

  const storeSlug = store.slug;
  const storePath = `/toko/${storeSlug}`;

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Top bar */}
      <header className="px-6 py-5 border-b border-slate-100">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-900 hover:text-slate-700 transition-colors"
        >
          <span className="w-2 h-2 rounded-full bg-green-600 flex-shrink-0" />
          TokoCepat
        </Link>
      </header>

      {/* Main content */}
      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-[400px]">
          {/* Visual indicator */}
          <div className="w-11 h-11 rounded-full bg-green-100 grid place-items-center mb-8 animate-fade-in">
            <svg
              className="w-5 h-5 text-green-600"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </div>

          <div className="mb-8 animate-enter">
            <h1 className="text-2xl font-bold text-slate-900 leading-snug mb-2">
              Toko kamu sudah jadi
            </h1>
            <p className="text-sm text-slate-500 leading-relaxed">
              Sekarang kamu cukup kirim link ini ke pembeli — mereka bisa
              lihat semua produk tanpa kamu kirim satu-satu.
            </p>
          </div>

          {/* Link display */}
          <div className="bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 mb-5 animate-enter-delayed">
            <p className="text-xs text-slate-400 mb-1">Link toko kamu</p>
            <p className="text-sm font-mono text-slate-700 break-all leading-relaxed">
              tokocepat.web.id{storePath}
            </p>
          </div>

          {/* Primary actions */}
          <div className="space-y-3 mb-8">
            <CopyButton slug={storeSlug} />
            <Link
              href={storePath}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg border border-slate-200 bg-white text-slate-700 text-sm font-semibold hover:border-slate-300 hover:bg-slate-50 transition-colors min-h-[48px]"
            >
              Lihat toko saya
              <svg
                className="w-3.5 h-3.5 flex-shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
            </Link>
          </div>

          {/* Divider + secondary CTA */}
          <div className="border-t border-slate-100 pt-6 space-y-3">
            <p className="text-xs text-slate-400 text-center mb-3">
              Langkah berikutnya
            </p>
            <Link
              href="/dashboard/produk/tambah"
              className="w-full inline-flex items-center justify-center px-5 py-3 rounded-lg bg-slate-900 text-white text-sm font-semibold hover:bg-slate-800 transition-colors min-h-[48px]"
            >
              Tambah produk pertama
            </Link>
            <Link
              href="/dashboard"
              className="w-full inline-flex items-center justify-center px-5 py-3 rounded-lg text-slate-500 text-sm hover:text-slate-700 transition-colors"
            >
              Masuk ke dashboard
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
