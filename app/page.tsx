import Link from "next/link";
import MobileNav from "@/components/landing/MobileNav";
import Logo from "@/components/ui/Logo";

export default function LandingPage() {
  return (
    <div className="bg-slate-50 text-slate-900 font-sans antialiased">

      {/* ── NAVBAR ── */}
      <nav className="sticky top-0 z-50 bg-white/85 backdrop-blur-md border-b border-slate-200">
        <div className="w-[min(1100px,90%)] mx-auto flex items-center justify-between h-16">
          <Logo size="md" />
          <ul className="hidden lg:flex items-center gap-7 list-none">
            <li><Link href="#problem" className="text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors">Masalah</Link></li>
            <li><Link href="#solution" className="text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors">Fitur</Link></li>
            <li><Link href="#steps" className="text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors">Cara Kerja</Link></li>
            <li><Link href="#faq" className="text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors">FAQ</Link></li>
            <li>
              <Link href="/daftar" className="bg-green-600 text-white text-sm font-semibold px-4 py-2 rounded-full hover:bg-green-700 transition-colors">
                Mulai Gratis
              </Link>
            </li>
          </ul>
          <MobileNav />
        </div>
      </nav>

      {/* ── HERO ── */}
      <header className="pt-20 pb-16 bg-gradient-to-br from-green-50 via-slate-50 to-blue-50 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_60%_50%_at_70%_40%,rgba(22,163,74,0.08),transparent)]" />
        <div className="w-[min(1100px,90%)] mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-1.5 bg-green-50 text-green-700 text-xs font-medium tracking-wide px-3 py-1.5 rounded-full border border-green-200 mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 flex-shrink-0" />
              Khusus Seller Indonesia
            </div>
            <h1 className="text-[clamp(1.875rem,5vw,3rem)] font-extrabold leading-tight text-slate-900 mb-5">
              Jualan <span className="text-green-600">di WA</span>{" "}
              <span>tanpa kirim</span>{" "}
              katalog berulang
            </h1>
            <p className="text-slate-600 text-base sm:text-lg leading-relaxed mb-7 max-w-lg">
            Cukup isi produk, bagikan link, dan biarkan pembeli lihat sendiri tanpa chat bolak-balik
            </p>
            <div className="flex flex-col xs:flex-row flex-wrap gap-3">
              <Link
                href="/daftar"
                className="bg-green-600 text-white font-semibold px-6 py-3.5 rounded-full shadow-[0_4px_16px_rgba(22,163,74,0.3)] hover:bg-green-700 hover:-translate-y-px transition-all text-center"
              >
                Mulai Gratis Sekarang →
              </Link>
              <Link
                href="#solution"
                className="bg-white text-slate-800 font-semibold px-6 py-3.5 rounded-full border border-slate-200 hover:border-slate-400 hover:-translate-y-px transition-all text-center"
              >
                Lihat Fitur
              </Link>
            </div>
          </div>

          {/* Browser Mockup */}
          <div className="bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden max-w-sm mx-auto w-full">
            <div className="bg-slate-100 px-4 py-2.5 flex items-center gap-1.5 border-b border-slate-200">
              <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
              <span className="w-2.5 h-2.5 rounded-full bg-green-400" />
              <div className="flex-1 bg-slate-200 rounded ml-2 h-5 flex items-center px-2.5 text-[11px] text-slate-400">
                kirimlink.id/toko-rani
              </div>
            </div>
            <div className="p-5">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-green-500 to-green-400 grid place-items-center text-xl">
                  🛍️
                </div>
                <div>
                  <div className="font-bold text-sm">Toko Rani Official</div>
                  <div className="text-xs text-slate-400">Fashion · Aksesoris · Hijab</div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2.5">
                {[
                  { emoji: "👗", name: "Dress Casual", price: "Rp 120.000", bg: "bg-yellow-50" },
                  { emoji: "👜", name: "Tas Mini", price: "Rp 85.000", bg: "bg-pink-50" },
                  { emoji: "🧣", name: "Hijab Segi", price: "Rp 45.000", bg: "bg-violet-50" },
                  { emoji: "💍", name: "Cincin Silver", price: "Rp 35.000", bg: "bg-blue-50" },
                ].map((p) => (
                  <div key={p.name} className="border border-slate-100 rounded-xl overflow-hidden bg-slate-50">
                    <div className={`h-20 grid place-items-center text-3xl ${p.bg}`}>{p.emoji}</div>
                    <div className="p-2">
                      <div className="text-[11px] font-semibold truncate">{p.name}</div>
                      <div className="text-[11px] text-green-600 font-bold">{p.price}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-3.5 flex items-center justify-center gap-2 bg-[#25d366] text-white rounded-xl py-2.5 text-xs font-bold">
                💬 Chat via WhatsApp
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* ── SOCIAL PROOF BAR ── */}
      <div className="bg-slate-900 py-5">
        <div className="w-[min(1100px,90%)] mx-auto flex flex-wrap justify-center gap-8">
          {[
            { value: "500+", label: "seller sudah bergabung" },
            { value: "5 menit", label: "rata-rata waktu setup" },
            { value: "Gratis", label: "untuk mulai, tanpa kartu kredit" },
            { value: "Mobile-first", label: "untuk buyer Indonesia" },
          ].map((s) => (
            <div key={s.value} className="flex items-center gap-2 text-slate-400 text-sm">
              <strong className="text-slate-100 font-bold">{s.value}</strong>
              {s.label}
            </div>
          ))}
        </div>
      </div>

      {/* ── PROBLEM ── */}
      <section id="problem" className="py-20 bg-slate-950">
        <div className="w-[min(1100px,90%)] mx-auto">
          <span className="text-xs font-semibold uppercase tracking-wide text-red-400">Masalah yang Sering Terjadi</span>
          <h2 className="text-[clamp(1.5rem,3.5vw,2.1rem)] font-extrabold text-slate-100 mt-2 mb-3">
            Kamu bukan kurang produk.<br />Alur jualannya yang bikin repot.
          </h2>
          <p className="text-slate-400 mb-10 max-w-xl leading-relaxed">
            Banyak seller sudah rajin promosi tiap hari, tapi order tetap lambat
            masuk karena prosesnya masih manual dan berantakan.
          </p>
          <div className="grid sm:grid-cols-2 gap-3">
            {[
              { icon: "📤", title: "Kirim katalog yang sama berulang-ulang", desc: "Tiap ada calon pembeli baru, kamu harus kirim foto, harga, dan info produk dari awal lagi. Capek dan buang waktu." },
              { icon: "🌐", title: "Belum punya tempat lihat produk", desc: "Pembeli harus tanya dulu baru tahu produk apa yang ada. Tidak ada tempat yang bisa dibuka sendiri." },
              { icon: "💬", title: "Chat WA penuh pertanyaan yang sama", desc: "\"Ada apa aja?\" \"Berapa harganya?\" — pertanyaan yang sama dijawab berkali-kali setiap hari." },
              { icon: "🤯", title: "Bingung mulai jualan online", desc: "Bikin website terasa rumit, banyak istilah teknis yang tidak dimengerti. Akhirnya tidak jadi mulai." },
            ].map((item) => (
              <div
                key={item.title}
                className="flex gap-4 items-start bg-slate-900 border border-slate-800 rounded-xl p-5 hover:border-slate-700 transition-colors"
              >
                <div className="w-9 h-9 rounded-lg bg-red-500/10 grid place-items-center text-base flex-shrink-0">
                  {item.icon}
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-slate-100 mb-1">{item.title}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SOLUTION / FEATURES ── */}
      <section id="solution" className="py-20 bg-gradient-to-br from-green-50 via-white to-white">
        <div className="w-[min(1100px,90%)] mx-auto">
          <span className="text-xs font-semibold uppercase tracking-wide text-green-600">Solusi & Fitur Utama</span>
          <h2 className="text-[clamp(1.5rem,3.5vw,2.1rem)] font-extrabold mt-2 mb-3">
            Semua yang kamu butuhkan<br />untuk mulai jualan online
          </h2>
          <p className="text-slate-600 mb-10 max-w-xl leading-relaxed">
            Tidak perlu belajar teknis. Cukup isi produk, bagikan link, dan mulai
            terima order hari ini.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { icon: "🏪", title: "Halaman toko yang rapi", desc: "Buat halaman produk simpel tanpa coding. Isi nama toko, foto, harga, dan deskripsi — selesai." },
              { icon: "🔗", title: "Satu link untuk semua", desc: "Bagikan ke grup WA, bio IG, TikTok, atau langsung ke calon pembeli. Satu link, semua produk terlihat." },
              { icon: "💬", title: "Pembeli chat langsung via WhatsApp", desc: "Setelah lihat produk, pembeli bisa langsung chat kamu. Tidak perlu tanya-tanya dulu baru tahu produknya." },
              { icon: "📦", title: "Produk tampil lengkap dan jelas", desc: "Foto, nama, harga, dan deskripsi tampil rapi. Pembeli bisa lihat sendiri sebelum memutuskan order." },
              { icon: "📱", title: "Nyaman dibuka dari HP", desc: "Tampilan didesain untuk mobile karena sebagian besar pembeli Indonesia browsing dari HP." },
              { icon: "⚡", title: "Setup dalam 5 menit", desc: "Tidak perlu domain, tidak perlu coding, tidak perlu bantuan teknis. Daftar, isi produk, bagikan link." },
            ].map((f) => (
              <div key={f.title} className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200">
                <div className="w-10 h-10 bg-green-50 rounded-lg grid place-items-center text-xl mb-4">
                  {f.icon}
                </div>
                <h3 className="font-semibold text-slate-900 mb-1.5">{f.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── STEPS ── */}
      <section id="steps" className="py-20 bg-white">
        <div className="w-[min(1100px,90%)] mx-auto">
          <span className="text-xs font-semibold uppercase tracking-wide text-green-600">Cara Kerja</span>
          <h2 className="text-[clamp(1.5rem,3.5vw,2.1rem)] font-extrabold mt-2 mb-3">
            3 langkah, langsung bisa jualan
          </h2>
          <p className="text-slate-500 mb-10 max-w-xl">
            Prosesnya dibuat sesimpel mungkin supaya siapa pun bisa mulai tanpa
            bantuan teknis.
          </p>
          <div className="grid lg:grid-cols-3 gap-0 lg:divide-x divide-slate-200">
            {[
              { n: 1, title: "Buat toko dan isi produk", desc: "Masukkan nama toko, foto produk, harga, dan deskripsi singkat. Selesai dalam hitungan menit." },
              { n: 2, title: "Kirim linknya ke pembeli", desc: "Bagikan ke grup WA, bio IG/TikTok, atau langsung ke calon pembeli yang tanya produkmu." },
              { n: 3, title: "Pembeli lihat, lalu chat WA", desc: "Pembeli buka link, lihat semua produk sendiri, lalu langsung chat kamu di WhatsApp untuk order." },
            ].map((s, i) => (
              <div key={s.n} className={`flex gap-5 items-start p-7 ${i > 0 ? "border-t lg:border-t-0 border-slate-200" : ""}`}>
                <div className="w-10 h-10 rounded-full bg-green-600 text-white grid place-items-center font-extrabold text-base flex-shrink-0">
                  {s.n}
                </div>
                <div>
                  <h3 className="font-bold mb-1.5">{s.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-10">
            <Link
              href="/daftar"
              className="bg-green-600 text-white font-semibold px-6 py-3 rounded-full shadow-[0_4px_16px_rgba(22,163,74,0.3)] hover:bg-green-700 transition-colors"
            >
              Mulai 3 Langkah Ini →
            </Link>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section id="testimoni" className="py-20 bg-slate-50">
        <div className="w-[min(1100px,90%)] mx-auto">
          <span className="text-xs font-semibold uppercase tracking-wide text-green-600">Dari Seller Kami</span>
          <h2 className="text-[clamp(1.5rem,3.5vw,2.1rem)] font-extrabold mt-2 mb-3">
            Sudah dipakai seller di seluruh Indonesia
          </h2>
          <p className="text-slate-600 mb-10 max-w-xl leading-relaxed">
            Mereka yang dulu jualan manual, sekarang bisa terima order lebih rapi
            dan cepat.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                initial: "R", name: "Rani Oktavia", role: "Seller Fashion, Instagram",
                quote: "Dulu tiap ada yang tanya, aku harus kirim foto produk satu-satu lagi. Sekarang tinggal kirim link, mereka lihat sendiri, terus chat langsung kalau mau order. Jauh lebih hemat waktu.",
              },
              {
                initial: "A", name: "Andi Pratama", role: "UMKM Kuliner Rumahan",
                quote: "Saya jualan camilan rumahan lewat WA. Dulu pembeli sering bingung ada menu apa aja dan berapa harganya. Sekarang ada halaman yang bisa mereka buka sendiri. Lebih enak buat dua-duanya.",
              },
              {
                initial: "F", name: "Fajar Nugroho", role: "Reseller & Dropshipper",
                quote: "Setup-nya cepat banget, nggak ribet sama sekali. Langsung aku pasang di bio TikTok dan kirim ke grup. Sekarang orang bisa lihat produk dulu sebelum nanya, jadi chat-nya lebih fokus ke yang serius beli.",
              },
            ].map((t) => (
              <div key={t.name} className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200">
                <div className="flex gap-0.5 mb-3">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <svg key={i} className="w-3.5 h-3.5 text-amber-400 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <blockquote className="text-sm text-slate-600 leading-relaxed mb-5">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-slate-900 grid place-items-center text-white font-semibold text-xs flex-shrink-0">
                    {t.initial}
                  </div>
                  <div>
                    <div className="font-semibold text-sm text-slate-900">{t.name}</div>
                    <div className="text-xs text-slate-400">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section id="cta" className="py-20 bg-slate-950">
        <div className="w-[min(1100px,90%)] mx-auto">
          <div className="bg-green-800 rounded-2xl p-8 sm:p-12 lg:p-14 text-center shadow-[0_8px_40px_rgba(22,163,74,0.2)]">
            <h2 className="text-[clamp(1.3rem,4vw,2.2rem)] font-extrabold text-white mb-3">
              Siap jualan lebih rapi dan lebih cepat closing?
            </h2>
            <p className="text-green-200 text-base mb-7 max-w-md mx-auto">
              Bikin halaman jualanmu dalam 5 menit. Gratis untuk mulai, tidak
              perlu kartu kredit.
            </p>
            <div className="flex flex-col sm:flex-row justify-center flex-wrap gap-3">
              <Link
                href="/daftar"
                className="bg-white text-green-800 font-bold px-7 py-3.5 rounded-full hover:bg-green-50 transition-colors"
              >
                Mulai Gratis Sekarang →
              </Link>
              <Link
                href="/masuk"
                className="bg-white/10 text-white font-semibold px-7 py-3.5 rounded-full border border-white/25 hover:bg-white/20 transition-colors"
              >
                Sudah punya akun? Masuk
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section id="faq" className="py-20 bg-slate-50">
        <div className="w-[min(1100px,90%)] mx-auto">
          <span className="text-xs font-semibold uppercase tracking-wide text-green-600">FAQ</span>
          <h2 className="text-[clamp(1.5rem,3.5vw,2.1rem)] font-extrabold mt-2 mb-10">
            Pertanyaan yang sering ditanya
          </h2>
          <div className="flex flex-col gap-2 max-w-2xl">
            {[
              { q: "Apakah saya harus paham coding atau teknis?", a: "Tidak perlu sama sekali. Dibuat khusus untuk seller non-teknis. Tidak ada coding, tidak ada domain, tidak ada setting rumit." },
              { q: "Saya belum punya website, apakah bisa langsung pakai?", a: "Justru ini paling cocok untuk yang belum punya website. Kamu langsung dapat link halaman toko yang siap dibagikan." },
              { q: "Kalau pembeli mau order, bagaimana caranya?", a: "Pembeli buka link tokomu, lihat produk dan harga, lalu klik tombol WhatsApp untuk langsung chat kamu. Proses closing tetap lewat WA seperti biasa." },
              { q: "Bisa dipakai untuk seller Instagram dan TikTok?", a: "Bisa. Pasang link di bio IG atau TikTok, atau kirim langsung ke calon pembeli lewat DM atau story." },
              { q: "Apakah kirimlink.id menggantikan WhatsApp saya?", a: "Tidak. kirimlink.id adalah halaman produk yang bisa dilihat pembeli sebelum mereka chat kamu di WA. WhatsApp tetap dipakai untuk closing." },
              { q: "Berapa lama proses setup awalnya?", a: "Rata-rata 5 menit. Isi nama toko, tambahkan produk, dan link toko kamu sudah siap dibagikan." },
            ].map((item) => (
              <details key={item.q} className="group bg-white border border-slate-200 rounded-xl overflow-hidden open:border-slate-300 transition-colors">
                <summary className="flex justify-between items-center px-5 py-4 font-semibold text-sm cursor-pointer list-none text-slate-800 select-none">
                  {item.q}
                  <span className="text-slate-400 group-open:text-green-600 text-lg leading-none group-open:rotate-45 transition-all ml-4 flex-shrink-0">+</span>
                </summary>
                <p className="px-5 pb-4 text-sm text-slate-500 leading-relaxed border-t border-slate-100 pt-3">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-slate-900 py-10 text-slate-400 text-sm">
        <div className="w-[min(1100px,90%)] mx-auto flex flex-col sm:flex-row flex-wrap justify-between items-center gap-4">
          <Logo size="sm" />
          <div className="flex flex-wrap justify-center gap-4 sm:gap-5">
            {["Fitur", "Harga", "Kontak", "Privasi"].map((l) => (
              <Link key={l} href="#" className="hover:text-slate-200 transition-colors py-1">{l}</Link>
            ))}
          </div>
          <div className="text-center sm:text-right">© 2026 KirimLink.id. Untuk Seller Indonesia.</div>
        </div>
      </footer>
    </div>
  );
}
