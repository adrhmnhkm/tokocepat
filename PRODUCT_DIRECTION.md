# TokoCepat — Product Direction

> Dokumen ini disimpulkan dari struktur codebase yang ada (schema, pages, actions, landing copy).
> Update sesuai temuan dari user nyata.

---

## Target User

**Primer:** UMKM kecil dan individual seller Indonesia yang:
- Berjualan via WhatsApp/Instagram tapi belum punya toko online sendiri
- Tidak punya kemampuan teknis untuk buat website
- Ingin terlihat lebih profesional tanpa biaya besar
- Sudah punya produk, tinggal perlu "etalase digital"

**Sekunder:** Reseller, dropshipper, pedagang pasar yang mulai ingin go-online.

---

## Masalah Utama yang Diselesaikan

1. **Toko online itu ribet dan mahal** — WordPress, Shopify, bahkan Tokopedia terasa berat untuk yang baru mulai
2. **Link produk berantakan** — Seller kirim foto satu per satu via WA, tidak ada katalog yang rapi
3. **Tidak ada cara mudah untuk "langsung order"** — Pembeli harus DM dulu, tidak ada tombol yang jelas

---

## Value Proposition Inti

> **"Buat toko online dalam 5 menit, langsung terima order via WhatsApp."**

- Gratis, tanpa keahlian teknis
- Link toko yang bisa dibagikan (`tokocepat.web.id/toko/nama-toko`)
- Tombol WhatsApp langsung di setiap produk
- Tidak perlu payment gateway — order masuk via WA, deal di sana

---

## Flow Utama User (Landing → Punya Toko)

```
1. Buka landing page (tokocepat.web.id)
2. Klik "Buat Toko Gratis"
3. Daftar akun (nama, email, password)
   → Auto-redirect ke halaman masuk
4. Login
   → Masuk dashboard
5. Dashboard: CTA "Buat Toko Sekarang"
   → Isi nama toko, slug URL, deskripsi, nomor WA
6. Toko berhasil dibuat
   → Panel sukses → CTA "Tambah Produk Pertama"
7. Tambah produk (nama, harga, foto, deskripsi)
8. Bagikan link toko ke pelanggan
```

---

## Fitur yang Masuk "Core" (Harus Stabil)

| Fitur | Status |
|-------|--------|
| Register & Login | ✅ Done |
| Buat & edit toko | ✅ Done |
| Tambah / edit / hapus produk | ✅ Done |
| Upload foto produk (Cloudinary) | ⚠️ Kode siap, env belum diisi |
| Halaman toko publik (`/toko/[slug]`) | ✅ Done |
| Tombol WhatsApp di halaman toko | ✅ Done |
| Dashboard dengan stats dasar | ✅ Done |

---

## Fitur yang Sebaiknya Ditunda (Post-MVP)

| Fitur | Alasan Ditunda |
|-------|----------------|
| Manajemen order | Kompleks, belum ada demand terbukti |
| Multiple stores per user | Schema sudah `Store?` (satu toko per user) — cukup untuk sekarang |
| Payment gateway | Integrasi berat, WA-first sudah cukup untuk MVP |
| Kategori produk | Belum urgent jika produk masih sedikit |
| SEO/sitemap otomatis | Nice-to-have, bukan blocker aktivasi |
| Custom domain | Infrastruktur tambahan, prioritas rendah |
| Analytics toko untuk seller | Bisa ditambah setelah ada user aktif |
| Email transaksional (welcome, order notif) | Butuh email service, tunda dulu |

---

## Risiko & Asumsi

- **Asumsi:** User nyaman deal via WhatsApp — valid untuk pasar Indonesia
- **Risiko:** Tanpa foto produk (Cloudinary belum aktif), toko terlihat kurang menarik → prioritaskan setup Cloudinary segera
- **Asumsi:** Satu toko per user sudah cukup untuk fase awal

---

## Metrik Aktivasi (Yang Ingin Dicapai)

Seorang user dianggap "aktif" jika sudah:
1. Register ✓
2. Login ✓
3. Buat toko ✓
4. Tambah minimal 1 produk ✓
5. Bagikan link toko (tidak bisa ditracking langsung)

Target awal: **10 user yang sampai langkah 4** sebelum iterasi fitur besar berikutnya.
