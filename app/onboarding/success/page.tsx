import { getMyStore } from "@/actions/store";
import { redirect } from "next/navigation";
import Link from "next/link";
import Logo from "@/components/ui/Logo";
import ShareActions from "@/components/ui/ShareActions";

export default async function OnboardingSuccessPage() {
  const store = await getMyStore();
  if (!store) redirect("/onboarding");

  const storeSlug = store.slug;
  const storePath = `/${storeSlug}`;

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <header className="px-6 py-4 border-b border-slate-100">
        <Logo size="sm" />
      </header>

      <main className="flex-1 flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-[400px]">

          {/* Checkmark */}
          <div className="w-11 h-11 rounded-full bg-green-100 grid place-items-center mb-6 animate-fade-in">
            <svg className="w-5 h-5 text-green-600" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </div>

          {/* Headline */}
          <div className="mb-6 animate-enter">
            <h1 className="text-2xl font-bold text-slate-900 leading-snug mb-2">
              Toko kamu sudah siap!
            </h1>
            <p className="text-sm text-slate-500 leading-relaxed">
              Sekarang kirim link ini ke customer kamu di WhatsApp — mereka bisa langsung lihat semua produk.
            </p>
          </div>

          {/* Link preview */}
          <div className="bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 mb-5 animate-enter-delayed">
            <p className="text-xs text-slate-400 mb-0.5">Link toko kamu</p>
            <p className="text-sm font-mono text-slate-700 break-all">
              kirimlink.id{storePath}
            </p>
          </div>

          {/* Share actions — WA first */}
          <div className="mb-6 animate-enter-delayed">
            <ShareActions slug={storeSlug} storeName={store.name} layout="stack" />
          </div>


          {/* Next step */}
          <div className="border-t border-slate-100 pt-6">
            <p className="text-xs text-slate-400 text-center mb-3">
              Belum ada produk? Tambah sekarang supaya link kamu langsung bisa dipakai.
            </p>
            <Link
              href="/dashboard/produk/tambah"
              className="w-full inline-flex items-center justify-center px-5 py-3 rounded-lg bg-slate-900 text-white text-sm font-semibold hover:bg-slate-800 transition-colors min-h-[48px]"
            >
              Tambah produk pertama
            </Link>
            <Link
              href="/dashboard"
              className="w-full inline-flex items-center justify-center px-5 py-3 text-slate-400 text-sm hover:text-slate-600 transition-colors"
            >
              Masuk dashboard dulu
            </Link>
          </div>

        </div>
      </main>
    </div>
  );
}
