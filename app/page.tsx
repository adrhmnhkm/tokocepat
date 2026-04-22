import Link from "next/link";
import MobileNav from "@/components/landing/MobileNav";
import Logo from "@/components/ui/Logo";

function WAIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={`fill-current ${className}`}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.089.534 4.055 1.47 5.765L0 24l6.432-1.434A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.007-1.371l-.36-.214-3.724.83.888-3.623-.233-.373A9.818 9.818 0 1112 21.818z" />
    </svg>
  );
}

function StarIcon() {
  return (
    <svg className="w-3.5 h-3.5 text-amber-400 fill-current" viewBox="0 0 20 20">
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  );
}

function StorefrontMockup() {
  const products = [
    { emoji: "👗", name: "Dress Linen", price: "Rp 145.000", color: "bg-amber-50" },
    { emoji: "👜", name: "Tas Anyam", price: "Rp 89.000", color: "bg-rose-50" },
    { emoji: "🧣", name: "Hijab Voal", price: "Rp 42.000", color: "bg-violet-50" },
    { emoji: "💍", name: "Cincin Silver", price: "Rp 38.000", color: "bg-sky-50" },
  ];

  return (
    <div className="relative mx-auto w-[260px] sm:w-[290px]">
      <div
        className="w-full rounded-[36px] overflow-hidden shadow-[0_32px_80px_rgba(0,0,0,0.18),0_8px_24px_rgba(0,0,0,0.10)]"
        style={{ background: "#0f172a" }}
      >
        <div className="flex items-center justify-between px-6 pt-3 pb-1">
          <span className="text-[10px] font-semibold text-white/60">9:41</span>
          <div className="w-16 h-4 rounded-full bg-black" />
          <div className="flex gap-1 items-center">
            <div className="w-3 h-2 rounded-sm bg-white/60" />
            <div className="w-1 h-2 rounded-sm bg-white/60" />
          </div>
        </div>

        <div className="mx-3 mb-2 flex items-center gap-1.5 bg-white/10 rounded-xl px-3 py-1.5">
          <div className="w-1.5 h-1.5 rounded-full bg-green-400 flex-shrink-0" />
          <span className="text-[10px] text-white/50 font-mono truncate">kirimlink.id/toko-rani</span>
        </div>

        <div className="bg-[#FFFBF5] rounded-t-3xl mx-1 pt-4 pb-2 px-3 min-h-[380px]">
          <div className="flex flex-col items-center text-center mb-4">
            <div
              className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl mb-2"
              style={{ background: "linear-gradient(135deg,#34d399,#059669)", boxShadow: "0 4px 12px rgba(16,185,129,0.3)" }}
            >
              🛍️
            </div>
            <p className="font-black text-slate-800 text-sm">Toko Rani Official</p>
            <p className="text-[10px] text-slate-400 mt-0.5">Fashion · Hijab · Aksesoris</p>
            <div
              className="mt-1.5 flex items-center gap-1 text-[9px] font-semibold text-emerald-700 px-2 py-0.5 rounded-full"
              style={{ background: "rgba(52,211,153,0.15)" }}
            >
              <span className="w-1 h-1 rounded-full bg-emerald-500 inline-block" />
              Toko aktif
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 mb-3">
            {products.map((p) => (
              <div
                key={p.name}
                className="rounded-2xl overflow-hidden bg-white"
                style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.07)" }}
              >
                <div className={`h-16 flex items-center justify-center text-3xl ${p.color}`}>
                  {p.emoji}
                </div>
                <div className="px-2 py-1.5">
                  <p className="text-[10px] font-semibold text-slate-700 truncate">{p.name}</p>
                  <p className="text-[10px] font-black text-green-600">{p.price}</p>
                </div>
              </div>
            ))}
          </div>

          <div
            className="flex items-center justify-center gap-1.5 py-2.5 rounded-2xl text-white font-bold text-[11px]"
            style={{ background: "#25d366", boxShadow: "0 4px 14px rgba(37,211,102,0.35)" }}
          >
            <WAIcon className="w-3.5 h-3.5" />
            Chat penjual di WhatsApp
          </div>
        </div>
      </div>

      <div className="absolute -bottom-4 -left-6 bg-white rounded-2xl px-3 py-2 shadow-[0_8px_24px_rgba(0,0,0,0.10)] flex items-center gap-2 border border-slate-100">
        <div className="w-7 h-7 rounded-xl bg-[#25d366] flex items-center justify-center flex-shrink-0">
          <WAIcon className="w-4 h-4 text-white" />
        </div>
        <div>
          <p className="text-[10px] font-bold text-slate-800 leading-tight">Pembeli baru!</p>
          <p className="text-[9px] text-slate-400">&ldquo;Kak, stok masih ada?&rdquo;</p>
        </div>
      </div>
    </div>
  );
}

export default function LandingPage() {
  return (
    <div className="bg-white text-slate-900 font-sans antialiased">

      {/* NAVBAR */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-100">
        <div className="w-[min(1100px,92%)] mx-auto flex items-center justify-between h-16">
          <Logo size="md" />
          <ul className="hidden lg:flex items-center gap-6 list-none">
            {[
              { href: "#cara-kerja", label: "Cara Kerja" },
              { href: "#fitur", label: "Fitur" },
              { href: "#testimoni", label: "Testimoni" },
              { href: "#faq", label: "FAQ" },
            ].map(({ href, label }) => (
              <li key={href}>
                <Link href={href} className="text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="hidden lg:flex items-center gap-3">
            <Link href="/masuk" className="text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors px-3 py-2">
              Masuk
            </Link>
            <Link
              href="/daftar"
              className="bg-green-600 text-white text-sm font-semibold px-5 py-2.5 rounded-full hover:bg-green-700 transition-colors"
            >
              Mulai gratis
            </Link>
          </div>
          <MobileNav />
        </div>
      </nav>

      {/* HERO */}
      <header className="pt-20 pb-28 overflow-x-hidden">
        <div className="w-[min(1100px,92%)] mx-auto">
          <div className="grid lg:grid-cols-[1fr_auto] gap-12 lg:gap-16 items-center">
            <div className="max-w-[560px]">
              <p className="text-sm font-semibold text-green-600 mb-4">
                Katalog online untuk seller WA
              </p>

              <h1 className="text-[clamp(2.2rem,5.5vw,3.5rem)] font-black leading-[1.05] tracking-tight text-slate-900 mb-5">
                Satu link.<br />
                Semua produkmu.<br />
                <span className="text-green-600">Langsung chat WA.</span>
              </h1>

              <p className="text-base sm:text-lg text-slate-500 leading-relaxed mb-8 max-w-[480px]">
                Tidak perlu kirim foto satu-satu ke setiap pembeli. Bagikan satu link,
                mereka lihat sendiri. Kalau mau order, tinggal chat WA seperti biasa.
              </p>

              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  href="/daftar"
                  className="inline-flex items-center justify-center gap-2 bg-green-600 text-white font-bold px-6 py-3.5 rounded-full hover:bg-green-700 transition-colors"
                >
                  Buat katalog gratis →
                </Link>
                <Link
                  href="/toko-contoh"
                  className="inline-flex items-center justify-center gap-2 text-slate-700 font-semibold px-6 py-3.5 rounded-full border border-slate-200 hover:border-slate-300 transition-colors"
                >
                  Lihat contoh toko
                </Link>
              </div>

              <p className="mt-5 text-xs text-slate-400">
                Setup 5 menit · Gratis · Tanpa kartu kredit
              </p>
            </div>

            <div className="flex justify-center lg:justify-end pt-8 lg:pt-0 pb-10">
              <StorefrontMockup />
            </div>
          </div>
        </div>
      </header>

      {/* CARA KERJA */}
      <section id="cara-kerja" className="py-24 border-t border-slate-100">
        <div className="w-[min(1100px,92%)] mx-auto">
          <div className="text-center max-w-[480px] mx-auto mb-16">
            <p className="text-sm font-semibold text-green-600 mb-3">Cara Kerja</p>
            <h2 className="text-[clamp(1.75rem,3.5vw,2.5rem)] font-black leading-tight">
              3 langkah, langsung bisa jualan hari ini
            </h2>
          </div>

          <div className="grid sm:grid-cols-3 gap-8">
            {[
              {
                n: "01",
                title: "Buat toko & tambah produk",
                desc: "Isi nama toko, nomor WA, foto produk, harga, dan deskripsi singkat. Tidak ada form yang rumit.",
                note: "± 3 menit",
              },
              {
                n: "02",
                title: "Bagikan link ke pembeli",
                desc: "Satu link untuk semua. Kirim ke grup WA, story IG, bio TikTok, atau langsung ke calon pembeli.",
                note: "Satu klik",
              },
              {
                n: "03",
                title: "Pembeli lihat, lalu chat WA",
                desc: "Mereka buka link, pilih produk, dan langsung chat kamu. Tidak perlu tanya produk apa yang ada.",
                note: "Closing tetap di WA",
              },
            ].map((step) => (
              <div key={step.n} className="flex flex-col">
                <span className="text-sm font-black text-slate-300 mb-4">{step.n}</span>
                <h3 className="font-bold text-slate-900 mb-2">{step.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed flex-1">{step.desc}</p>
                <p className="mt-4 text-xs font-semibold text-green-600 bg-green-50 inline-block px-3 py-1 rounded-full w-fit">
                  {step.note}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FITUR */}
      <section id="fitur" className="py-24 border-t border-slate-100">
        <div className="w-[min(1100px,92%)] mx-auto">
          <div className="grid lg:grid-cols-[1fr_1.5fr] gap-12 lg:gap-16 items-start">
            <div>
              <p className="text-sm font-semibold text-green-600 mb-3">Fitur</p>
              <h2 className="text-[clamp(1.75rem,3.5vw,2.5rem)] font-black leading-tight mb-5">
                Semua yang kamu butuhkan. Tidak ada yang tidak perlu.
              </h2>
              <p className="text-slate-500 leading-relaxed mb-8">
                Didesain untuk seller yang tidak mau pusing dengan teknologi.
                Setup sekali, langsung bisa dipakai.
              </p>
              <Link
                href="/daftar"
                className="inline-flex items-center gap-2 bg-green-600 text-white font-bold px-6 py-3 rounded-full hover:bg-green-700 transition-colors"
              >
                Coba gratis sekarang
              </Link>
            </div>

            <div className="grid sm:grid-cols-2 gap-3">
              {[
                { icon: "🏪", title: "Halaman toko yang rapi", desc: "Nama toko, deskripsi, dan semua produk tampil bersih di satu halaman." },
                { icon: "🔗", title: "Satu link untuk semua", desc: "Bagikan ke mana saja — WA, IG, TikTok, atau DM." },
                { icon: "💬", title: "Tombol WA per produk", desc: "Setiap produk punya tombol chat WA yang langsung terhubung ke HP kamu." },
                { icon: "📱", title: "Tampil rapi di HP", desc: "Didesain khusus untuk layar HP karena pembeli pasti buka dari HP." },
                { icon: "⚡", title: "Setup dalam 5 menit", desc: "Tidak perlu domain, hosting, atau bantuan siapa pun." },
                { icon: "✏️", title: "Update kapan saja", desc: "Tambah produk, ubah harga, atau hapus — semua bisa dari HP." },
              ].map((f) => (
                <div key={f.title} className="border border-slate-100 rounded-2xl p-5 hover:border-slate-200 transition-colors">
                  <div className="text-2xl mb-3">{f.icon}</div>
                  <h3 className="font-bold text-slate-900 text-sm mb-1">{f.title}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONI */}
      <section id="testimoni" className="py-24 border-t border-slate-100">
        <div className="w-[min(1100px,92%)] mx-auto">
          <div className="text-center max-w-[480px] mx-auto mb-16">
            <p className="text-sm font-semibold text-green-600 mb-3">Testimoni</p>
            <h2 className="text-[clamp(1.75rem,3.5vw,2.5rem)] font-black leading-tight">
              Sudah dipakai seller di seluruh Indonesia
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                initial: "R",
                name: "Rani Oktavia",
                role: "Seller fashion · Instagram",
                color: "bg-rose-500",
                quote: "Dulu tiap ada yang tanya, aku harus kirim foto produk satu-satu lagi. Sekarang tinggal kirim link, mereka lihat sendiri, terus chat kalau mau order. Hemat waktu banget.",
              },
              {
                initial: "A",
                name: "Andi Pratama",
                role: "UMKM kuliner rumahan · WhatsApp",
                color: "bg-amber-500",
                quote: "Dulu pembeli sering bingung ada menu apa dan harganya berapa. Sekarang tinggal kasih link, semua sudah ada. Respons pembeli jadi lebih cepat dan jelas.",
              },
              {
                initial: "F",
                name: "Fajar Nugroho",
                role: "Reseller skincare · TikTok",
                color: "bg-violet-500",
                quote: "Setup-nya cepat banget. Langsung aku pasang di bio TikTok. Sekarang yang masuk chat kebanyakan sudah tahu mau beli apa, jadi closing-nya lebih gampang.",
              },
            ].map((t) => (
              <div key={t.name} className="border border-slate-100 rounded-2xl p-6 flex flex-col">
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: 5 }).map((_, i) => <StarIcon key={i} />)}
                </div>
                <blockquote className="text-sm text-slate-600 leading-relaxed flex-1 mb-5">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <div className="flex items-center gap-3">
                  <div className={`w-9 h-9 rounded-full ${t.color} flex items-center justify-center text-white font-black text-sm flex-shrink-0`}>
                    {t.initial}
                  </div>
                  <div>
                    <p className="font-semibold text-sm text-slate-900">{t.name}</p>
                    <p className="text-xs text-slate-400">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-24 border-t border-slate-100">
        <div className="w-[min(1100px,92%)] mx-auto grid lg:grid-cols-[1fr_1.6fr] gap-12 lg:gap-16">
          <div>
            <p className="text-sm font-semibold text-green-600 mb-3">FAQ</p>
            <h2 className="text-[clamp(1.75rem,3.5vw,2.5rem)] font-black leading-tight mb-4">
              Yang sering ditanyakan
            </h2>
            <p className="text-slate-500 text-sm leading-relaxed">
              Masih ada yang kurang jelas? Hubungi kami lewat WhatsApp, kami balas cepat.
            </p>
          </div>

          <div className="space-y-2">
            {[
              {
                q: "Apakah saya harus bisa coding atau teknis?",
                a: "Tidak perlu sama sekali. KirimLink dirancang untuk seller yang tidak mau pusing dengan teknologi. Tidak ada coding, tidak ada domain, tidak ada setup rumit.",
              },
              {
                q: "Saya tidak punya website. Apakah bisa langsung pakai?",
                a: "Justru ini paling cocok untuk yang belum punya website. Kamu langsung dapat link halaman toko yang siap dibagikan ke pembeli.",
              },
              {
                q: "Kalau pembeli mau order, bagaimana caranya?",
                a: "Pembeli buka link tokomu, lihat produk dan harga, lalu klik tombol WhatsApp untuk langsung chat kamu. Prosesnya tetap seperti biasa — cuma jauh lebih rapi.",
              },
              {
                q: "Apakah KirimLink menggantikan WhatsApp saya?",
                a: "Tidak. KirimLink adalah halaman katalog yang bisa dilihat pembeli sebelum mereka chat kamu. WhatsApp tetap dipakai untuk closing seperti biasa.",
              },
              {
                q: "Berapa lama proses setup awalnya?",
                a: "Rata-rata 5 menit. Isi nama toko, nomor WA, tambahkan produk, dan link toko kamu sudah siap dibagikan.",
              },
            ].map((item) => (
              <details
                key={item.q}
                className="group border border-slate-200 rounded-xl overflow-hidden open:border-slate-300 transition-colors"
              >
                <summary className="flex justify-between items-center px-5 py-4 font-semibold text-sm cursor-pointer list-none text-slate-800 select-none hover:text-slate-900">
                  <span>{item.q}</span>
                  <span className="ml-4 flex-shrink-0 text-slate-400 group-open:text-green-600 group-open:rotate-45 transition-all text-xl leading-none">
                    +
                  </span>
                </summary>
                <p className="px-5 pb-5 text-sm text-slate-500 leading-relaxed border-t border-slate-100 pt-3">
                  {item.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-24 bg-slate-950 border-t border-slate-100">
        <div className="w-[min(680px,92%)] mx-auto text-center">
          <h2 className="text-[clamp(1.75rem,4vw,3rem)] font-black text-white leading-tight mb-5">
            Jualan lebih rapi.<br />
            <span className="text-green-400">Mulai hari ini.</span>
          </h2>
          <p className="text-slate-400 text-base leading-relaxed mb-8 max-w-[400px] mx-auto">
            Buat halaman katalog tokomu dalam 5 menit. Gratis, tidak perlu
            website, tidak perlu kartu kredit.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3">
            <Link
              href="/daftar"
              className="inline-flex items-center justify-center gap-2 bg-green-600 text-white font-bold px-8 py-4 rounded-full hover:bg-green-700 transition-colors"
            >
              Buat katalog gratis →
            </Link>
            <Link
              href="/toko-contoh"
              className="inline-flex items-center justify-center gap-2 text-slate-300 font-semibold px-8 py-4 rounded-full border border-white/15 hover:bg-white/5 transition-colors"
            >
              Lihat contoh toko
            </Link>
          </div>
          <p className="mt-5 text-xs text-slate-600">
            Setup 5 menit · Gratis · Tanpa kartu kredit
          </p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-slate-900 border-t border-white/[0.06] py-10">
        <div className="w-[min(1100px,92%)] mx-auto flex flex-col sm:flex-row flex-wrap items-center justify-between gap-5 text-sm text-slate-500">
          <Logo size="sm" />
          <div className="flex flex-wrap justify-center gap-5">
            {[
              { label: "Cara Kerja", href: "#cara-kerja" },
              { label: "Fitur", href: "#fitur" },
              { label: "FAQ", href: "#faq" },
              { label: "Masuk", href: "/masuk" },
            ].map(({ label, href }) => (
              <Link key={label} href={href} className="hover:text-slate-200 transition-colors">
                {label}
              </Link>
            ))}
          </div>
          <p className="text-slate-600 text-xs">© 2026 KirimLink.id · Untuk Seller Indonesia</p>
        </div>
      </footer>

    </div>
  );
}
