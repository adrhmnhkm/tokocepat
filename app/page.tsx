import Link from "next/link";
import MobileNav from "@/components/landing/MobileNav";
import Logo from "@/components/ui/Logo";

/* ─────────────────────────────────────────────
   REUSABLE PRIMITIVES
───────────────────────────────────────────── */

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="inline-block text-[11px] font-bold uppercase tracking-[0.12em] text-green-600 mb-3">
      {children}
    </p>
  );
}

function StarIcon() {
  return (
    <svg className="w-3.5 h-3.5 text-amber-400 fill-current" viewBox="0 0 20 20">
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  );
}

function WAIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={`fill-current ${className}`}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.089.534 4.055 1.47 5.765L0 24l6.432-1.434A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.007-1.371l-.36-.214-3.724.83.888-3.623-.233-.373A9.818 9.818 0 1112 21.818z" />
    </svg>
  );
}

/* ─────────────────────────────────────────────
   STOREFRONT MOCKUP (hero visual)
───────────────────────────────────────────── */

function StorefrontMockup() {
  const products = [
    { emoji: "👗", name: "Dress Linen", price: "Rp 145.000", color: "bg-amber-50" },
    { emoji: "👜", name: "Tas Anyam", price: "Rp 89.000", color: "bg-rose-50" },
    { emoji: "🧣", name: "Hijab Voal", price: "Rp 42.000", color: "bg-violet-50" },
    { emoji: "💍", name: "Cincin Silver", price: "Rp 38.000", color: "bg-sky-50" },
  ];

  return (
    /* Phone shell */
    <div className="relative mx-auto w-[260px] sm:w-[290px]">
      {/* Glow behind phone */}
      <div
        className="absolute inset-0 -z-10 blur-3xl opacity-30 rounded-full scale-75"
        style={{ background: "radial-gradient(circle, #16a34a 0%, transparent 70%)" }}
      />

      <div
        className="w-full rounded-[36px] overflow-hidden shadow-[0_32px_80px_rgba(0,0,0,0.22),0_8px_24px_rgba(0,0,0,0.12)]"
        style={{ background: "#0f172a" }}
      >
        {/* Status bar */}
        <div className="flex items-center justify-between px-6 pt-3 pb-1">
          <span className="text-[10px] font-semibold text-white/60">9:41</span>
          <div className="w-16 h-4 rounded-full bg-black" />
          <div className="flex gap-1 items-center">
            <div className="w-3 h-2 rounded-sm bg-white/60" />
            <div className="w-1 h-2 rounded-sm bg-white/60" />
          </div>
        </div>

        {/* Browser chrome */}
        <div className="mx-3 mb-2 flex items-center gap-1.5 bg-white/10 rounded-xl px-3 py-1.5">
          <div className="w-1.5 h-1.5 rounded-full bg-green-400 flex-shrink-0" />
          <span className="text-[10px] text-white/50 font-mono truncate">kirimlink.id/toko-rani</span>
        </div>

        {/* Page content */}
        <div className="bg-[#FFFBF5] rounded-t-3xl mx-1 pt-4 pb-2 px-3 min-h-[380px]">
          {/* Store header */}
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

          {/* Product grid */}
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

          {/* WA CTA */}
          <div
            className="flex items-center justify-center gap-1.5 py-2.5 rounded-2xl text-white font-bold text-[11px]"
            style={{ background: "#25d366", boxShadow: "0 4px 14px rgba(37,211,102,0.35)" }}
          >
            <WAIcon className="w-3.5 h-3.5" />
            Chat penjual di WhatsApp
          </div>
        </div>
      </div>

      {/* Notification bubble — "1 pesan masuk" */}
      <div
        className="absolute -bottom-4 -left-6 bg-white rounded-2xl px-3 py-2 shadow-[0_8px_24px_rgba(0,0,0,0.12)] flex items-center gap-2 border border-slate-100"
      >
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

/* ─────────────────────────────────────────────
   LANDING PAGE
───────────────────────────────────────────── */

export default function LandingPage() {
  return (
    <div className="bg-white text-slate-900 font-sans antialiased">

      {/* ══════════════════════════════════════════
          NAVBAR
      ══════════════════════════════════════════ */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200/80">
        <div className="w-[min(1100px,92%)] mx-auto flex items-center justify-between h-16">
          <Logo size="md" />
          <ul className="hidden lg:flex items-center gap-6 list-none">
            {[
              { href: "#masalah", label: "Masalah" },
              { href: "#solusi", label: "Solusi" },
              { href: "#cara-kerja", label: "Cara Kerja" },
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
            <Link href="/masuk" className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors px-3 py-2">
              Masuk
            </Link>
            <Link
              href="/daftar"
              className="bg-slate-900 text-white text-sm font-semibold px-5 py-2.5 rounded-full hover:bg-slate-700 transition-colors"
            >
              Buat katalog gratis
            </Link>
          </div>
          <MobileNav />
        </div>
      </nav>

      {/* ══════════════════════════════════════════
          1. HERO
      ══════════════════════════════════════════ */}
      <header className="pt-16 pb-20 sm:pt-20 sm:pb-28 overflow-x-hidden relative bg-white">
        {/* Subtle background texture */}
        <div
          className="absolute inset-0 opacity-[0.035] pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, #16a34a 1px, transparent 0)",
            backgroundSize: "32px 32px",
          }}
        />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] opacity-10 pointer-events-none rounded-full blur-3xl -translate-y-1/4 translate-x-1/4"
          style={{ background: "radial-gradient(circle, #16a34a, transparent 70%)" }}
        />

        <div className="w-[min(1100px,92%)] mx-auto">
          <div className="grid lg:grid-cols-[1fr_auto] gap-12 lg:gap-16 items-center">
            {/* Left — Copy */}
            <div className="max-w-[560px]">
              <div className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 bg-slate-100 px-3 py-1.5 rounded-full mb-6 border border-slate-200">
                <span className="flex gap-1 items-center">
                  <span>📱</span>
                  <span>WA</span>
                </span>
                <span className="w-px h-3 bg-slate-300" />
                <span className="flex gap-1 items-center">
                  <span>📸</span>
                  <span>Instagram</span>
                </span>
                <span className="w-px h-3 bg-slate-300" />
                <span className="flex gap-1 items-center">
                  <span>🎵</span>
                  <span>TikTok</span>
                </span>
              </div>

              <h1 className="text-[clamp(2.2rem,5.5vw,3.6rem)] font-black leading-[1.05] tracking-tight text-slate-900 mb-5">
                Satu link.<br />
                <span className="text-green-600">Semua produkmu.</span><br />
                Langsung chat WA.
              </h1>

              <p className="text-base sm:text-lg text-slate-500 leading-relaxed mb-8 max-w-[480px]">
                Tidak perlu lagi kirim foto satu-satu ke setiap pembeli. Cukup bagikan satu
                link, mereka lihat sendiri. Kalau mau order, tinggal chat WA seperti biasa.
              </p>

              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  href="/daftar"
                  className="inline-flex items-center justify-center gap-2 bg-green-600 text-white font-bold px-6 py-3.5 rounded-full shadow-[0_4px_20px_rgba(22,163,74,0.35)] hover:bg-green-700 hover:shadow-[0_6px_24px_rgba(22,163,74,0.40)] transition-all"
                >
                  Buat katalog gratis
                  <span className="text-green-200">→</span>
                </Link>
                <Link
                  href="/toko-contoh"
                  className="inline-flex items-center justify-center gap-2 text-slate-700 font-semibold px-6 py-3.5 rounded-full border border-slate-200 hover:border-slate-400 hover:bg-slate-50 transition-all"
                >
                  Lihat contoh toko
                </Link>
              </div>

              <p className="mt-5 text-xs text-slate-400">
                Mulai sekarang gratis ! · Setup 5 menit
              </p>
            </div>

            {/* Right — Mockup */}
            <div className="flex justify-center lg:justify-end pt-8 lg:pt-0 pb-10">
              <StorefrontMockup />
            </div>
          </div>
        </div>
      </header>

      {/* ══════════════════════════════════════════
          2. SOCIAL PROOF STRIP
      ══════════════════════════════════════════ */}
      <div className="bg-slate-950 py-5 border-y border-slate-800">
        <div className="w-[min(1100px,92%)] mx-auto">
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10">
            {[
              { value: "500+", label: "seller sudah bergabung" },
              { value: "5 menit", label: "rata-rata setup awal" },
              { value: "Gratis", label: "tanpa kartu kredit" },
              { value: "Tampil rapi", label: "di HP pembeli manapun" },
            ].map(({ value, label }) => (
              <div key={value} className="flex items-center gap-2 text-sm">
                <span className="font-black text-white">{value}</span>
                <span className="text-slate-500">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════
          3. PROBLEM
      ══════════════════════════════════════════ */}
      <section id="masalah" className="py-20 sm:py-28 bg-slate-950">
        <div className="w-[min(1100px,92%)] mx-auto">
          <div className="max-w-[620px] mb-12">
            <SectionLabel>Kenapa Jualan di WA Itu Melelahkan</SectionLabel>
            <h2 className="text-[clamp(1.75rem,3.5vw,2.5rem)] font-black text-white leading-tight mb-4">
              Kamu rajin jualan setiap hari.<br />
              Tapi waktumu habis buat hal-hal yang seharusnya lebih simpel.
            </h2>
            <p className="text-slate-400 text-base leading-relaxed">
              Bukan karena produkmu kurang bagus. Tapi cara jualannya masih makan banyak
              waktu untuk hal yang seharusnya tidak perlu dilakukan berulang kali.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-3">
            {[
              {
                icon: "📤",
                title: "Kirim katalog yang sama terus-menerus",
                desc: "Tiap ada pembeli baru, kamu kirim ulang foto, harga, dan info produk dari awal. Setiap hari.",
              },
              {
                icon: "🔁",
                title: "Jawab pertanyaan yang sama berkali-kali",
                desc: "\"Ada apa aja?\" \"Berapa harganya?\" \"Warna apa?\" — dijawab setiap hari, ke orang yang berbeda.",
              },
              {
                icon: "💬",
                title: "Chat WA penuh, tapi yang serius beli sedikit",
                desc: "Banyak yang tanya tapi belum siap beli, dan mereka memakan semua perhatianmu yang bisa dipakai untuk closing.",
              },
              {
                icon: "🤷",
                title: "Pembeli bingung mau lihat produk di mana",
                desc: "Tidak ada halaman yang bisa mereka buka sendiri. Semua harus tanya dulu, baru dapat info. Proses yang melelahkan untuk dua pihak.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="group flex gap-4 bg-white/[0.04] border border-white/[0.07] rounded-2xl p-6 hover:bg-white/[0.07] hover:border-white/[0.12] transition-all"
              >
                <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center text-xl flex-shrink-0">
                  {item.icon}
                </div>
                <div>
                  <h3 className="font-bold text-slate-100 mb-1.5 text-sm sm:text-base">{item.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          4. BEFORE vs AFTER
      ══════════════════════════════════════════ */}
      <section className="py-20 sm:py-28 bg-white">
        <div className="w-[min(1100px,92%)] mx-auto">
          <div className="text-center max-w-[500px] mx-auto mb-12">
            <SectionLabel>Sebelum &amp; Sesudah</SectionLabel>
            <h2 className="text-[clamp(1.75rem,3.5vw,2.5rem)] font-black leading-tight">
              Perbedaannya terasa<br />dari hari pertama
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 gap-4 max-w-3xl mx-auto">
            {/* Before */}
            <div className="rounded-2xl border border-red-100 bg-red-50/50 p-6">
              <div className="flex items-center gap-2 mb-5">
                <div className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center text-sm">✗</div>
                <span className="font-bold text-red-700 text-sm">Sebelum KirimLink</span>
              </div>
              <ul className="space-y-3">
                {[
                  "Kirim foto produk satu-satu tiap ada pembeli baru",
                  'Jawab "Ada apa aja?" berkali-kali setiap hari',
                  "Chat WA penuh tanya-tanya, tapi belum tentu beli",
                  "Tidak ada tempat buat pembeli lihat produk sendiri",
                  "Promosi ramai, tapi closing tetap terasa lambat",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-red-700">
                    <span className="mt-0.5 text-red-400 flex-shrink-0">—</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* After */}
            <div className="rounded-2xl border border-green-200 bg-green-50/70 p-6">
              <div className="flex items-center gap-2 mb-5">
                <div className="w-6 h-6 rounded-full bg-green-200 flex items-center justify-center text-sm">✓</div>
                <span className="font-bold text-green-700 text-sm">Sesudah KirimLink</span>
              </div>
              <ul className="space-y-3">
                {[
                  "Kirim satu link — pembeli lihat semua produk sendiri",
                  "Pembeli datang ke chat sudah tahu mau beli apa",
                  "Tanya-tanya berkurang, chat lebih fokus ke closing",
                  "Katalog selalu tersedia 24/7 tanpa kamu harus online",
                  "Toko terlihat lebih profesional tanpa harus bikin website",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-green-800">
                    <span className="mt-0.5 text-green-500 flex-shrink-0">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          5. SOLUTION — "SATU LINK" CONCEPT
      ══════════════════════════════════════════ */}
      <section id="solusi" className="py-20 sm:py-28 bg-slate-50">
        <div className="w-[min(1100px,92%)] mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left — copy */}
            <div>
              <SectionLabel>Solusi</SectionLabel>
              <h2 className="text-[clamp(1.75rem,3.5vw,2.5rem)] font-black leading-tight mb-5">
                Satu link untuk semua produkmu.<br />
                <span className="text-green-600">Pembeli lihat dulu, baru chat.</span>
              </h2>
              <p className="text-slate-600 leading-relaxed mb-8">
                KirimLink memberimu halaman toko sederhana dengan semua produkmu di
                satu tempat. Bagikan link-nya ke siapa pun, di mana pun — pembeli bisa
                buka, lihat, dan chat WA langsung dari halaman itu.
              </p>

              <div className="space-y-4">
                {[
                  { icon: "🔗", title: "Satu link, semua produk terlihat", desc: "Tidak perlu kirim foto berulang. Cukup bagikan satu link, semua produk sudah ada di sana." },
                  { icon: "👁️", title: "Pembeli lihat sendiri, kapan saja", desc: "Halaman tokomu bisa dibuka 24 jam. Pembeli lihat dulu sebelum chat — artinya mereka lebih siap beli." },
                  { icon: "💬", title: "Order tetap lewat WhatsApp", desc: "KirimLink tidak menggantikan WA. Tombol chat tersedia di tiap produk, langsung terhubung ke HP kamu." },
                ].map((item) => (
                  <div key={item.title} className="flex gap-3.5">
                    <div className="w-9 h-9 rounded-xl bg-green-100 flex items-center justify-center text-lg flex-shrink-0">
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 text-sm mb-0.5">{item.title}</h3>
                      <p className="text-sm text-slate-500 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — flow diagram */}
            <div className="flex flex-col gap-3 max-w-sm mx-auto lg:mx-0 w-full">
              {[
                { step: "1", label: "Kamu kirim link ke pembeli", sub: "Lewat WA, bio IG, TikTok, atau story", color: "bg-slate-900", text: "text-white" },
                { step: "2", label: "Pembeli buka dan lihat katalog", sub: "Semua produk, harga, dan deskripsi jelas", color: "bg-green-50", text: "text-slate-900", border: "border border-green-200" },
                { step: "3", label: "Pembeli klik tombol WhatsApp", sub: "Chat langsung ke kamu, sudah tahu mau beli apa", color: "bg-[#25d366]", text: "text-white" },
              ].map((item, i) => (
                <div key={item.step}>
                  <div className={`${item.color} ${item.border ?? ""} ${item.text} rounded-2xl p-5 flex items-center gap-4`}>
                    <div
                      className={`w-9 h-9 rounded-full flex items-center justify-center font-black text-sm flex-shrink-0 ${
                        item.color === "bg-slate-900"
                          ? "bg-white text-slate-900"
                          : item.color === "bg-[#25d366]"
                          ? "bg-white/20 text-white"
                          : "bg-green-200 text-green-800"
                      }`}
                    >
                      {item.step}
                    </div>
                    <div>
                      <p className="font-bold text-sm">{item.label}</p>
                      <p className={`text-xs mt-0.5 ${item.color === "bg-white" || item.color === "bg-green-50" ? "text-slate-400" : "opacity-70"}`}>
                        {item.sub}
                      </p>
                    </div>
                  </div>
                  {i < 2 && (
                    <div className="flex justify-center py-1 text-slate-300 text-lg">↓</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          6. WHY KIRIMLINK (vs alternatives)
      ══════════════════════════════════════════ */}
      <section className="py-20 sm:py-28 bg-white">
        <div className="w-[min(1100px,92%)] mx-auto">
          <div className="text-center max-w-[540px] mx-auto mb-12">
            <SectionLabel>Kenapa KirimLink</SectionLabel>
            <h2 className="text-[clamp(1.75rem,3.5vw,2.5rem)] font-black leading-tight">
              Bukan yang pertama mencoba.<br />
              Tapi yang paling pas untuk seller.
            </h2>
          </div>

          {/* Hint geser — hanya muncul di mobile */}
          <p className="sm:hidden text-xs text-slate-400 mb-2 text-right">
            Geser untuk lihat semua →
          </p>

          <div className="overflow-x-auto rounded-xl border border-slate-100">
            <table className="w-full min-w-[560px] border-collapse">
              <thead>
                <tr className="border-b border-slate-100">
                  <th className="text-left pb-4 pt-2 pl-2 text-sm text-slate-400 font-medium w-[190px]">
                    <span className="sr-only">Fitur</span>
                  </th>
                  <th className="text-center pb-4 pt-2 text-xs text-slate-400 font-semibold px-4">Bikin<br />Website</th>
                  <th className="text-center pb-4 pt-2 text-xs text-slate-400 font-semibold px-4">Linktree</th>
                  <th className="text-center pb-4 pt-2 text-xs text-slate-400 font-semibold px-4">Kirim PDF<br />Katalog</th>
                  <th className="pb-3 pt-2 px-4">
                    <div className="bg-green-600 text-white text-xs font-bold px-3 py-1.5 rounded-lg text-center">
                      KirimLink ✓
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {[
                  { label: "Tidak perlu coding",       values: [false, true,  true,  true]  },
                  { label: "Tampil produk + harga",    values: [true,  false, true,  true]  },
                  { label: "Tombol WA per produk",     values: [false, false, false, true]  },
                  { label: "Bisa diupdate kapan saja", values: [true,  true,  false, true]  },
                  { label: "Setup dalam 5 menit",      values: [false, true,  false, true]  },
                  { label: "Khusus untuk seller WA",   values: [false, false, false, true]  },
                ].map((row) => (
                  <tr key={row.label} className="hover:bg-slate-50/60 transition-colors">
                    <td className="py-3.5 pl-2 pr-4 text-sm text-slate-700 font-medium">{row.label}</td>
                    {row.values.map((val, i) => (
                      <td key={i} className="text-center py-3.5 px-4">
                        {i === 3 ? (
                          <div className={`w-6 h-6 mx-auto rounded-full flex items-center justify-center text-xs font-black ${val ? "bg-green-100 text-green-700" : "bg-slate-100 text-slate-400"}`}>
                            {val ? "✓" : "—"}
                          </div>
                        ) : (
                          <span className={`font-bold ${val ? "text-green-500" : "text-slate-300"}`}>
                            {val ? "✓" : "×"}
                          </span>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          7. HOW IT WORKS
      ══════════════════════════════════════════ */}
      <section id="cara-kerja" className="py-20 sm:py-28 bg-slate-950">
        <div className="w-[min(1100px,92%)] mx-auto">
          <div className="text-center max-w-[500px] mx-auto mb-12">
            <SectionLabel>Cara Kerja</SectionLabel>
            <h2 className="text-[clamp(1.75rem,3.5vw,2.5rem)] font-black text-white leading-tight">
              3 langkah,<br />langsung bisa jualan hari ini
            </h2>
          </div>

          <div className="grid sm:grid-cols-3 gap-0 sm:gap-8 relative">
            {/* Connector line — desktop only */}
            <div className="hidden sm:block absolute top-7 left-[calc(33.3%+1rem)] right-[calc(33.3%+1rem)] h-px bg-white/10" />

            {[
              {
                n: "01",
                title: "Buat toko dan tambah produk",
                desc: "Isi nama toko, nomor WA, foto produk, harga, dan deskripsi singkat. Tidak ada form rumit.",
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
            ].map((step, i) => (
              <div key={step.n} className={`relative flex flex-col sm:block py-6 sm:py-0 ${i > 0 ? "border-t border-white/[0.06] sm:border-t-0" : ""}`}>
                <div className="w-14 h-14 rounded-2xl bg-white/[0.06] border border-white/10 flex items-center justify-center font-black text-xl text-white mb-5 flex-shrink-0">
                  {step.n}
                </div>
                <div>
                  <h3 className="font-bold text-white mb-2">{step.title}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">{step.desc}</p>
                  <p className="mt-3 text-xs font-semibold text-green-500 bg-green-500/10 inline-block px-2.5 py-1 rounded-full">
                    {step.note}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/daftar"
              className="inline-flex items-center gap-2 bg-green-600 text-white font-bold px-7 py-3.5 rounded-full shadow-[0_4px_20px_rgba(22,163,74,0.4)] hover:bg-green-700 transition-colors"
            >
              Mulai sekarang — gratis
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          8. USE CASES
      ══════════════════════════════════════════ */}
      <section className="py-20 sm:py-28 bg-white">
        <div className="w-[min(1100px,92%)] mx-auto">
          <div className="text-center max-w-[500px] mx-auto mb-10">
            <SectionLabel>Cocok untuk Siapa</SectionLabel>
            <h2 className="text-[clamp(1.75rem,3.5vw,2.5rem)] font-black leading-tight">
              Dari seller fashion sampai<br />UMKM kuliner rumahan
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-3">
            {[
              { icon: "👗", label: "Seller Fashion", desc: "Baju, tas, hijab, aksesoris" },
              { icon: "🍱", label: "Kuliner & F&B", desc: "Katering, snack, hampers, frozen food" },
              { icon: "📦", label: "Reseller & Dropshipper", desc: "Jual tanpa perlu stok sendiri" },
              { icon: "🏠", label: "UMKM Rumahan", desc: "Produk buatan tangan & produk lokal" },
              { icon: "📸", label: "Seller Instagram", desc: "Link di bio IG langsung ke katalog" },
              { icon: "🎵", label: "Seller TikTok", desc: "Dari konten langsung ke order WA" },
            ].map((uc) => (
              <div
                key={uc.label}
                className="group bg-slate-50 hover:bg-green-50 border border-slate-100 hover:border-green-200 rounded-2xl p-5 transition-all"
              >
                <div className="text-3xl mb-3">{uc.icon}</div>
                <h3 className="font-bold text-slate-900 text-sm mb-1">{uc.label}</h3>
                <p className="text-xs text-slate-500">{uc.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          9. FEATURES
      ══════════════════════════════════════════ */}
      <section className="py-20 sm:py-28 bg-slate-50">
        <div className="w-[min(1100px,92%)] mx-auto">
          <div className="grid lg:grid-cols-[1fr_1.4fr] gap-12 lg:gap-16 items-start">
            <div>
              <SectionLabel>Fitur</SectionLabel>
              <h2 className="text-[clamp(1.75rem,3.5vw,2.5rem)] font-black leading-tight mb-5">
                Semua yang kamu butuhkan.<br />Tidak ada yang tidak perlu.
              </h2>
              <p className="text-slate-600 leading-relaxed mb-8">
                Didesain khusus untuk seller yang tidak mau pusing dengan
                teknologi. Setup sekali, langsung bisa dipakai.
              </p>
              <Link
                href="/daftar"
                className="inline-flex items-center gap-2 bg-green-600 text-white font-bold px-6 py-3 rounded-full hover:bg-green-700 transition-colors shadow-[0_4px_16px_rgba(22,163,74,0.3)]"
              >
                Coba gratis sekarang
              </Link>
            </div>

            <div className="grid sm:grid-cols-2 gap-3">
              {[
                { icon: "🏪", title: "Halaman toko yang rapi", desc: "Nama toko, deskripsi, dan semua produk tampil bersih." },
                { icon: "🔗", title: "Satu link untuk semua", desc: "Bagikan ke mana saja — WA, IG, TikTok, atau DM." },
                { icon: "💬", title: "Tombol WA langsung", desc: "Setiap produk punya tombol chat WA yang bisa diklik pembeli." },
                { icon: "📱", title: "Tampil rapi di HP", desc: "Didesain khusus untuk layar HP karena pembeli kamu pasti buka dari HP." },
                { icon: "⚡", title: "Setup dalam 5 menit", desc: "Tidak perlu domain, hosting, atau bantuan siapa pun." },
                { icon: "✏️", title: "Mudah diupdate kapan saja", desc: "Tambah produk, ubah harga, atau hapus — semua bisa dari HP." },
              ].map((f) => (
                <div key={f.title} className="bg-white border border-slate-100 rounded-2xl p-5 hover:shadow-md transition-shadow">
                  <div className="text-2xl mb-3">{f.icon}</div>
                  <h3 className="font-bold text-slate-900 text-sm mb-1">{f.title}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          10. RESULTS / OUTCOMES
      ══════════════════════════════════════════ */}
      <section className="py-20 sm:py-28 bg-white">
        <div className="w-[min(1100px,92%)] mx-auto">
          <div className="text-center max-w-[480px] mx-auto mb-12">
            <SectionLabel>Hasil yang Dirasakan</SectionLabel>
            <h2 className="text-[clamp(1.75rem,3.5vw,2.5rem)] font-black leading-tight">
              Bukan janji.<br />Ini yang terjadi setelah pakai.
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { metric: "Tanya berkurang", detail: "Pembeli yang masuk chat sudah lebih tahu mau beli apa." },
              { metric: "Chat lebih singkat", detail: "Tidak perlu jelaskan produk dari awal tiap ada pembeli baru." },
              { metric: "Closing lebih rapi", detail: "Proses dari lihat produk sampai deal jadi lebih mulus." },
              { metric: "Toko terasa profesional", detail: "Pembeli langsung percaya karena ada katalog yang jelas." },
              { metric: "Waktu balas berkurang", detail: "Kamu tidak lagi jawab pertanyaan yang sama berulang-ulang." },
              { metric: "Promosi jadi lebih simpel", detail: "Kirim satu link ke banyak grup atau story — semua info produk sudah lengkap di sana." },
            ].map((r) => (
              <div key={r.metric} className="bg-slate-50 border border-slate-100 rounded-2xl p-6">
                <p className="font-black text-slate-900 text-lg mb-1.5">{r.metric}</p>
                <p className="text-sm text-slate-500 leading-relaxed">{r.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          11. TESTIMONIALS
      ══════════════════════════════════════════ */}
      <section id="testimoni" className="py-20 sm:py-28 bg-slate-950">
        <div className="w-[min(1100px,92%)] mx-auto">
          <div className="text-center max-w-[480px] mx-auto mb-12">
            <SectionLabel>Kata Mereka</SectionLabel>
            <h2 className="text-[clamp(1.75rem,3.5vw,2.5rem)] font-black text-white leading-tight">
              Sudah dipakai seller<br />di seluruh Indonesia
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                initial: "R",
                name: "Rani Oktavia",
                role: "Seller fashion · Instagram",
                color: "bg-rose-500",
                quote:
                  "Dulu tiap ada yang tanya, aku harus kirim foto produk satu-satu lagi. Sekarang tinggal kirim link, mereka lihat sendiri, terus chat kalau mau order. Hemat waktu banget dan chat-nya lebih fokus.",
              },
              {
                initial: "A",
                name: "Andi Pratama",
                role: "UMKM kuliner rumahan · WhatsApp",
                color: "bg-amber-500",
                quote:
                  "Saya jualan camilan rumahan, dulu pembeli sering bingung ada menu apa dan harganya berapa. Sekarang tinggal kasih link, semua sudah ada. Respons pembeli jadi lebih cepat dan jelas.",
              },
              {
                initial: "F",
                name: "Fajar Nugroho",
                role: "Reseller produk skincare · TikTok",
                color: "bg-violet-500",
                quote:
                  "Setup-nya cepat banget. Langsung aku pasang di bio TikTok. Sekarang yang masuk chat kebanyakan sudah tahu mau beli apa, jadi closing-nya lebih gampang dan nggak banyak buang waktu.",
              },
            ].map((t) => (
              <div key={t.name} className="bg-white/[0.05] border border-white/[0.08] rounded-2xl p-6 flex flex-col">
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: 5 }).map((_, i) => <StarIcon key={i} />)}
                </div>
                <blockquote className="text-sm text-slate-300 leading-relaxed flex-1 mb-5">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <div className="flex items-center gap-3">
                  <div className={`w-9 h-9 rounded-full ${t.color} flex items-center justify-center text-white font-black text-sm flex-shrink-0`}>
                    {t.initial}
                  </div>
                  <div>
                    <p className="font-semibold text-sm text-white">{t.name}</p>
                    <p className="text-xs text-slate-500">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          12. FAQ
      ══════════════════════════════════════════ */}
      <section id="faq" className="py-20 sm:py-28 bg-white">
        <div className="w-[min(1100px,92%)] mx-auto grid lg:grid-cols-[1fr_1.6fr] gap-12 lg:gap-16">
          <div>
            <SectionLabel>FAQ</SectionLabel>
            <h2 className="text-[clamp(1.75rem,3.5vw,2.5rem)] font-black leading-tight mb-4">
              Yang sering<br />ditanyakan
            </h2>
            <p className="text-slate-500 text-sm leading-relaxed">
              Ada yang masih bingung? Langsung tanya ke kami lewat WhatsApp, kami balas cepat.
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
                a: "Justru ini paling cocok untuk yang belum punya website. Kamu langsung dapat link halaman toko yang siap dibagikan ke pembeli, tanpa harus beli domain atau bayar developer.",
              },
              {
                q: "Kalau pembeli mau order, bagaimana caranya?",
                a: "Pembeli buka link tokomu, lihat produk dan harga, lalu klik tombol WhatsApp untuk langsung chat kamu. Prosesnya tetap sama seperti biasa — cuma jauh lebih rapi.",
              },
              {
                q: "Bisa dipakai untuk seller Instagram dan TikTok?",
                a: "Bisa. Pasang link di bio IG atau TikTok, atau kirim langsung ke calon pembeli lewat DM. Link-nya langsung rapi saat dibuka dari HP.",
              },
              {
                q: "Apakah KirimLink menggantikan WhatsApp saya?",
                a: "Tidak. KirimLink adalah halaman katalog yang bisa dilihat pembeli sebelum mereka chat kamu. WhatsApp tetap dipakai untuk closing dan komunikasi seperti biasa.",
              },
              {
                q: "Berapa lama proses setup awalnya?",
                a: "Rata-rata 5 menit. Isi nama toko, nomor WA, tambahkan produk, dan link toko kamu sudah siap dibagikan ke pembeli.",
              },
            ].map((item) => (
              <details
                key={item.q}
                className="group bg-slate-50 border border-slate-200 rounded-xl overflow-hidden open:border-slate-300 transition-colors"
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

      {/* ══════════════════════════════════════════
          13. FINAL CTA
      ══════════════════════════════════════════ */}
      <section className="py-20 sm:py-28 bg-slate-950">
        <div className="w-[min(780px,92%)] mx-auto text-center">
          <p className="text-5xl mb-6">🛍️</p>
          <h2 className="text-[clamp(1.75rem,4vw,3rem)] font-black text-white leading-tight mb-5">
            Jualan lebih rapi.<br />
            Chat lebih efisien.<br />
            <span className="text-green-400">Mulai hari ini.</span>
          </h2>
          <p className="text-slate-400 text-base sm:text-lg leading-relaxed mb-8 max-w-[440px] mx-auto">
            Buat halaman katalog tokomu dalam 5 menit. Gratis untuk mulai,
            tidak perlu punya website, tidak perlu kartu kredit.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3">
            <Link
              href="/daftar"
              className="inline-flex items-center justify-center gap-2 bg-green-600 text-white font-bold px-8 py-4 rounded-full text-base shadow-[0_4px_24px_rgba(22,163,74,0.40)] hover:bg-green-700 hover:shadow-[0_6px_28px_rgba(22,163,74,0.45)] transition-all"
            >
              Buat katalog gratis
              <span className="text-green-200">→</span>
            </Link>
            <Link
              href="/toko-contoh"
              className="inline-flex items-center justify-center gap-2 text-slate-300 font-semibold px-8 py-4 rounded-full border border-white/15 hover:bg-white/5 hover:border-white/25 transition-all text-base"
            >
              Lihat contoh toko
            </Link>
          </div>
          <p className="mt-5 text-xs text-slate-600">
            Setup 5 menit · Gratis untuk mulai · Tanpa kartu kredit
          </p>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          FOOTER
      ══════════════════════════════════════════ */}
      <footer className="bg-slate-900 border-t border-white/[0.06] py-10">
        <div className="w-[min(1100px,92%)] mx-auto flex flex-col sm:flex-row flex-wrap items-center justify-between gap-5 text-sm text-slate-500">
          <Logo size="sm" />
          <div className="flex flex-wrap justify-center gap-5">
            {[
              { label: "Fitur", href: "#solusi" },
              { label: "Cara Kerja", href: "#cara-kerja" },
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
