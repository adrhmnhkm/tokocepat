# MVP Task Breakdown — SaaS Toko Online Seller Indonesia

---

## Ringkasan MVP

Platform ini memungkinkan seller Indonesia membuat halaman toko mini secara online dalam hitungan menit. User daftar, buat toko, isi profil toko (nama, deskripsi, nomor WA), tambahkan produk beserta foto dan harga, lalu dapat link publik unik yang bisa dibagikan ke calon pembeli. Buyer membuka halaman toko, melihat daftar produk, dan menekan tombol "Pesan via WhatsApp" yang langsung membuka chat WA dengan pesan order otomatis. MVP ini tidak memiliki payment gateway, custom domain, atau fitur kompleks lainnya — fokus murni pada validasi alur jualan seller ke buyer.

---

## Fitur Prioritas MVP

| # | Fitur | Prioritas |
|---|-------|-----------|
| 1 | Daftar & login (email + password) | P0 |
| 2 | Buat toko (nama, deskripsi, slug, nomor WA) | P0 |
| 3 | Edit profil toko | P0 |
| 4 | Tambah produk (nama, harga, foto, deskripsi) | P0 |
| 5 | Edit & hapus produk | P0 |
| 6 | Halaman toko publik (`/toko/[slug]`) | P0 |
| 7 | Tombol "Pesan via WhatsApp" per produk | P0 |
| 8 | Upload gambar produk (Cloudinary) | P1 |
| 9 | Dashboard seller sederhana | P1 |
| 10 | Proteksi route (hanya pemilik toko bisa edit) | P0 |

---

## Halaman yang Harus Dibuat

| Route | Nama Halaman | Akses |
|-------|-------------|-------|
| `/` | Landing Page (sudah ada) | Public |
| `/daftar` | Register | Public (guest only) |
| `/masuk` | Login | Public (guest only) |
| `/dashboard` | Dashboard Seller | Authenticated |
| `/dashboard/toko` | Setup/Edit Toko | Authenticated |
| `/dashboard/produk` | Daftar Produk | Authenticated |
| `/dashboard/produk/tambah` | Tambah Produk | Authenticated |
| `/dashboard/produk/[id]/edit` | Edit Produk | Authenticated (owner) |
| `/toko/[slug]` | Halaman Toko Publik | Public |

---

## Breakdown Per Halaman

### `/daftar` — Register

- **Tujuan:** User buat akun baru
- **Akses:** Guest only (redirect ke /dashboard jika sudah login)
- **Komponen utama:** Form (nama, email, password, konfirmasi password), tombol submit, link ke /masuk
- **Action:** Submit form → hash password → simpan user → redirect /dashboard
- **Validasi:**
  - Nama: required, min 2 karakter
  - Email: required, format valid, unik
  - Password: required, min 8 karakter
  - Konfirmasi password: harus sama
- **States:** loading (tombol disabled + spinner), error inline per field, error server (email sudah ada)

---

### `/masuk` — Login

- **Tujuan:** User login ke akun
- **Akses:** Guest only
- **Komponen utama:** Form (email, password), tombol submit, link ke /daftar
- **Action:** Submit → verifikasi → set session → redirect /dashboard
- **Validasi:** Email required & valid, password required
- **States:** loading, error "Email atau password salah" (jangan pisahkan pesannya)

---

### `/dashboard` — Dashboard Seller

- **Tujuan:** Halaman utama setelah login, ringkasan status toko
- **Akses:** Authenticated
- **Komponen utama:**
  - Sidebar/navbar dashboard
  - Card status toko (sudah buat toko / belum)
  - Card jumlah produk
  - Link cepat ke halaman toko publik
  - Tombol tambah produk
- **Action:** Navigasi ke fitur utama
- **States:** Jika belum buat toko → tampilkan CTA "Buat Toko Sekarang" dengan banner prominent

---

### `/dashboard/toko` — Setup & Edit Toko

- **Tujuan:** Seller isi atau update profil toko
- **Akses:** Authenticated
- **Komponen utama:**
  - Form: nama toko, slug (auto-generate dari nama, bisa diedit), deskripsi singkat, nomor WhatsApp
  - Preview link: `tokocepat.id/toko/[slug]`
  - Tombol simpan
- **Action:** Submit form → validasi slug unik → upsert data toko → tampilkan success toast
- **Validasi:**
  - Nama toko: required, min 3 karakter
  - Slug: required, hanya huruf kecil/angka/strip, unik, min 3 karakter
  - Nomor WA: required, format Indonesia (08xx / 628xx), strip non-angka saat simpan
  - Deskripsi: optional, max 200 karakter
- **States:** Auto-generate slug saat user ketik nama toko, cek ketersediaan slug real-time (debounced), loading saat submit

---

### `/dashboard/produk` — Daftar Produk

- **Tujuan:** Seller kelola semua produk
- **Akses:** Authenticated
- **Komponen utama:**
  - Tabel/grid daftar produk (foto thumbnail, nama, harga, status, aksi)
  - Tombol "Tambah Produk"
  - Tombol edit dan hapus per produk
- **Action:** Navigasi ke tambah/edit, hapus produk (dengan konfirmasi)
- **States:**
  - Empty: ilustrasi + "Belum ada produk. Tambahkan produk pertamamu."
  - Loading skeleton
  - Konfirmasi hapus: modal/dialog kecil

---

### `/dashboard/produk/tambah` — Tambah Produk

- **Tujuan:** Seller tambah produk baru
- **Akses:** Authenticated
- **Komponen utama:**
  - Form: nama produk, harga, deskripsi, upload foto
  - Preview foto sebelum upload
  - Tombol simpan
- **Action:** Upload foto ke Cloudinary → dapat URL → submit form + URL foto → simpan ke DB
- **Validasi:**
  - Nama: required, min 3 karakter
  - Harga: required, angka positif
  - Deskripsi: optional, max 500 karakter
  - Foto: optional untuk MVP, tapi recommended (max 2MB, format jpg/png/webp)
- **States:** Progress upload foto, loading submit, error upload

---

### `/dashboard/produk/[id]/edit` — Edit Produk

- **Tujuan:** Seller ubah detail produk yang sudah ada
- **Akses:** Authenticated + harus owner produk tersebut
- **Komponen utama:** Sama dengan tambah produk, form pre-filled
- **Action:** Sama dengan tambah, tapi PATCH/update
- **Validasi:** Sama dengan tambah produk
- **States:** Loading data awal, error jika produk tidak ditemukan atau bukan miliknya (redirect 404)

---

### `/toko/[slug]` — Halaman Toko Publik

- **Tujuan:** Halaman yang dibagikan ke buyer, tampilkan toko dan produk
- **Akses:** Public (siapapun bisa akses tanpa login)
- **Komponen utama:**
  - Header toko: nama, deskripsi, avatar/logo (inisial nama toko)
  - Grid produk: foto, nama, harga, tombol "Pesan via WhatsApp"
  - Footer sederhana
- **Action:** Klik tombol "Pesan via WhatsApp" → buka `wa.me/[nomor]?text=[pesan otomatis]`
- **States:**
  - Slug tidak ditemukan → halaman 404 custom
  - Toko belum ada produk → "Toko ini belum menambahkan produk"
  - Loading: skeleton cards

---

## Breakdown Per Fitur

### Auth (Email + Password)

Gunakan **NextAuth v5** dengan **Credentials provider**.

```
lib/auth.ts          → konfigurasi NextAuth
app/api/auth/[...nextauth]/route.ts
app/(auth)/masuk/page.tsx
app/(auth)/daftar/page.tsx
actions/auth.ts      → register server action
middleware.ts        → proteksi route /dashboard/*
```

- Hash password pakai `bcryptjs`
- Session strategy: `jwt` (lebih simpel, tidak butuh tabel Session di DB)
- Redirect setelah login: `/dashboard`
- Redirect setelah register: `/dashboard` (auto login setelah daftar)
- `middleware.ts`: protect semua `/dashboard/*`, redirect `/masuk` jika belum auth

---

### Create & Edit Toko

```
actions/store.ts     → createStore(), updateStore(), getStoreByUser()
app/dashboard/toko/page.tsx
components/forms/StoreForm.tsx
```

- Satu user = satu toko (cek di server action sebelum create)
- Slug: auto-generate dari nama toko (lowercase, spasi → strip), user bisa override
- Validasi slug unik: query DB sebelum simpan
- Gunakan `upsert` Prisma supaya create dan update pakai logika yang sama

---

### CRUD Produk

```
actions/product.ts   → createProduct(), updateProduct(), deleteProduct(), getProductsByStore()
app/dashboard/produk/page.tsx
app/dashboard/produk/tambah/page.tsx
app/dashboard/produk/[id]/edit/page.tsx
components/forms/ProductForm.tsx
components/ProductCard.tsx  (reusable untuk dashboard dan halaman publik)
```

- Sebelum edit/hapus: verifikasi `product.storeId === session.user.storeId` di server action
- Hapus produk: soft delete atau hard delete (MVP: hard delete lebih simpel)
- Foto: simpan URL Cloudinary di field `imageUrl` (string nullable)

---

### Upload Gambar Produk

```
app/api/upload/route.ts  → endpoint upload ke Cloudinary
lib/cloudinary.ts        → konfigurasi cloudinary SDK
components/ImageUpload.tsx → komponen upload dengan preview
```

Flow upload:
1. User pilih file di client
2. POST ke `/api/upload` dengan FormData
3. Server upload ke Cloudinary, return `secure_url`
4. Client simpan URL ke state form
5. Saat submit produk, URL ikut tersimpan ke DB

Alternatif lebih simpel: pakai **Cloudinary Upload Widget** (unsigned upload preset) — tidak perlu endpoint backend, URL langsung dari client. Rekomendasi untuk MVP.

---

### Halaman Toko Publik

```
app/toko/[slug]/page.tsx   → Server Component, fetch toko + produk
components/StorePage.tsx
components/ProductGrid.tsx
components/WhatsAppButton.tsx
```

- Gunakan **Server Component** untuk SEO dan performa
- `generateMetadata()` untuk meta title/description dinamis per toko
- Jika slug tidak ada: `notFound()` dari next/navigation

---

### Tombol Order WhatsApp

Format pesan WA otomatis:
```
Halo, saya tertarik dengan produk:

*[Nama Produk]*
Harga: Rp [harga terformat]

Apakah masih tersedia?
```

URL format:
```
https://wa.me/62[nomor_tanpa_0]?text=[encodeURIComponent(pesan)]
```

```tsx
// components/WhatsAppButton.tsx
function buildWAUrl(phone: string, productName: string, price: number) {
  const nomor = phone.replace(/^0/, '62').replace(/\D/g, '')
  const pesan = `Halo, saya tertarik dengan produk:\n\n*${productName}*\nHarga: Rp ${price.toLocaleString('id-ID')}\n\nApakah masih tersedia?`
  return `https://wa.me/${nomor}?text=${encodeURIComponent(pesan)}`
}
```

---

## Daftar Route Lengkap

### App Routes (Pages)
```
/                              → Landing page (sudah ada)
/masuk                         → Login
/daftar                        → Register
/dashboard                     → Dashboard utama
/dashboard/toko                → Setup/edit toko
/dashboard/produk              → Daftar produk
/dashboard/produk/tambah       → Tambah produk
/dashboard/produk/[id]/edit    → Edit produk
/toko/[slug]                   → Halaman toko publik
/404                           → Not found custom
```

### API Routes
```
POST /api/auth/[...nextauth]   → NextAuth handler
GET  /api/auth/[...nextauth]   → NextAuth handler
POST /api/upload               → Upload gambar ke Cloudinary
```

### Server Actions (di /actions/)
```
auth.ts       → registerUser()
store.ts      → createStore(), updateStore(), getMyStore(), checkSlugAvailable()
product.ts    → createProduct(), updateProduct(), deleteProduct(), getMyProducts()
```

---

## Schema Database

### User
```prisma
model User {
  id        String   @id @default(cuid())
  name      String
  email     String   @unique
  password  String
  createdAt DateTime @default(now())
  store     Store?
}
```

### Store
```prisma
model Store {
  id          String    @id @default(cuid())
  name        String
  slug        String    @unique
  description String?
  whatsapp    String
  userId      String    @unique
  user        User      @relation(fields: [userId], references: [id], onDelete: Cascade)
  products    Product[]
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt
}
```

### Product
```prisma
model Product {
  id          String   @id @default(cuid())
  name        String
  description String?
  price       Int
  imageUrl    String?
  storeId     String
  store       Store    @relation(fields: [storeId], references: [id], onDelete: Cascade)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}
```

> Catatan: `price` pakai `Int` dalam satuan Rupiah (bukan desimal). Lebih simpel dan cukup untuk MVP.

---

## Relasi Tabel

```
User ──(1:1)──> Store ──(1:N)──> Product
```

- Satu user punya satu toko
- Satu toko punya banyak produk
- Hapus user → hapus toko → hapus semua produk (cascade)

---

## API & Server Actions Lengkap

### actions/auth.ts
```ts
registerUser(data: { name, email, password })
// → validasi → cek email unik → hash password → create User → return {ok, error}
```

### actions/store.ts
```ts
createStore(data: { name, slug, description, whatsapp })
// → cek user belum punya toko → cek slug unik → create Store

updateStore(data: { name, slug, description, whatsapp })
// → ambil storeId dari session → cek slug unik (exclude diri sendiri) → update

getMyStore()
// → ambil store milik user yang sedang login

checkSlugAvailable(slug: string, excludeStoreId?: string)
// → return boolean, untuk validasi real-time di form
```

### actions/product.ts
```ts
createProduct(data: { name, description, price, imageUrl })
// → ambil storeId dari session → create Product

updateProduct(id: string, data: { name, description, price, imageUrl })
// → verifikasi ownership → update

deleteProduct(id: string)
// → verifikasi ownership → delete

getMyProducts()
// → ambil produk milik toko user yang login

getStoreWithProducts(slug: string)
// → public, tidak butuh auth → return store + products atau null
```

### api/upload/route.ts
```ts
POST /api/upload
// → terima file → upload ke Cloudinary → return { url }
```

---

## Urutan Pengerjaan Paling Efisien

Urutan ini meminimalkan blocker antar task:

```
1. Setup project (Next.js, Tailwind, Prisma, DB)
2. Schema Prisma + migrasi awal
3. Konfigurasi NextAuth (Credentials)
4. Halaman /daftar + /masuk + server action registerUser
5. Middleware proteksi /dashboard/*
6. Layout dashboard (sidebar/navbar)
7. Halaman /dashboard/toko + server action store
8. Halaman /dashboard/produk (list) + server actions produk
9. Halaman /dashboard/produk/tambah + edit
10. Konfigurasi Cloudinary + komponen ImageUpload
11. Halaman publik /toko/[slug]
12. Komponen WhatsAppButton
13. Halaman 404 custom
14. QA manual end-to-end
15. Deploy ke Vercel
```

---

## Sprint Plan

### Sprint 1 — Foundation & Auth (Hari 1–2)

**Target: User bisa daftar, login, dan masuk dashboard**

- [ ] Init project Next.js + TypeScript + Tailwind
- [ ] Install & konfigurasi Prisma + koneksi PostgreSQL
- [ ] Buat schema User, Store, Product + jalankan migrasi
- [ ] Install & konfigurasi NextAuth v5 (Credentials)
- [ ] Server action: `registerUser()`
- [ ] Halaman `/daftar` dengan form + validasi
- [ ] Halaman `/masuk` dengan form + validasi
- [ ] `middleware.ts` untuk proteksi `/dashboard/*`
- [ ] Layout dashboard (sidebar navigasi, user info)
- [ ] Halaman `/dashboard` (placeholder, tampilkan nama user)

**Definisi selesai Sprint 1:**
User bisa daftar → login → masuk dashboard → logout. Route `/dashboard` tidak bisa diakses tanpa login.

---

### Sprint 2 — Core Flow: Toko & Produk (Hari 3–5)

**Target: Seller bisa buat toko dan kelola produk**

- [ ] Server action: `createStore()`, `updateStore()`, `getMyStore()`, `checkSlugAvailable()`
- [ ] Halaman `/dashboard/toko` dengan form + auto-slug + cek unik
- [ ] Dashboard update: tampilkan status toko + link ke halaman publik
- [ ] Server action: `createProduct()`, `updateProduct()`, `deleteProduct()`, `getMyProducts()`
- [ ] Halaman `/dashboard/produk` dengan daftar + tombol hapus (+ konfirmasi)
- [ ] Halaman `/dashboard/produk/tambah`
- [ ] Halaman `/dashboard/produk/[id]/edit`
- [ ] Komponen `ProductForm.tsx` (reusable untuk tambah & edit)
- [ ] Konfigurasi Cloudinary + `ImageUpload.tsx`
- [ ] API route `/api/upload`

**Definisi selesai Sprint 2:**
Seller bisa buat toko dengan slug unik, tambah/edit/hapus produk, dan upload foto produk.

---

### Sprint 3 — Halaman Publik & Go Live (Hari 6–7)

**Target: Buyer bisa melihat toko dan order via WhatsApp**

- [ ] Server action: `getStoreWithProducts(slug)`
- [ ] Halaman `/toko/[slug]` (Server Component, SEO-ready)
- [ ] Komponen `StorePage.tsx`, `ProductGrid.tsx`
- [ ] Komponen `WhatsAppButton.tsx` dengan pesan otomatis
- [ ] Halaman 404 custom
- [ ] Format harga rupiah di semua tempat
- [ ] QA manual checklist (lihat bagian QA)
- [ ] Setup environment variables di Vercel
- [ ] Deploy & smoke test production

**Definisi selesai Sprint 3:**
Link toko bisa dibuka tanpa login, produk tampil, tombol WA berfungsi dan membuka chat dengan pesan yang benar. Aplikasi live di Vercel.

---

## Definisi "Selesai" Per Fitur

| Fitur | Kriteria Selesai |
|-------|-----------------|
| Register | User bisa daftar, data tersimpan di DB, langsung login |
| Login | User bisa login, session aktif, redirect ke dashboard |
| Logout | Session dihapus, redirect ke /masuk |
| Buat toko | Toko tersimpan, slug unik, bisa akses `/toko/[slug]` |
| Edit toko | Perubahan tersimpan, slug update tidak konflik |
| Tambah produk | Produk muncul di dashboard dan halaman publik |
| Edit produk | Data produk terupdate di semua tempat |
| Hapus produk | Produk hilang dari dashboard dan halaman publik |
| Upload foto | Foto tampil di halaman produk (dashboard & publik) |
| Halaman publik | Toko & produk tampil tanpa login, SEO title ada |
| Tombol WA | Klik membuka WA dengan pesan otomatis yang benar |
| Proteksi route | /dashboard/* redirect ke login jika tidak auth |
| Ownership check | User tidak bisa edit/hapus produk milik toko lain |

---

## Folder Structure

```
/store
├── app/
│   ├── (auth)/
│   │   ├── masuk/
│   │   │   └── page.tsx
│   │   └── daftar/
│   │       └── page.tsx
│   ├── (dashboard)/
│   │   ├── layout.tsx          ← layout sidebar dashboard
│   │   ├── dashboard/
│   │   │   └── page.tsx
│   │   ├── dashboard/toko/
│   │   │   └── page.tsx
│   │   └── dashboard/produk/
│   │       ├── page.tsx
│   │       ├── tambah/
│   │       │   └── page.tsx
│   │       └── [id]/
│   │           └── edit/
│   │               └── page.tsx
│   ├── toko/
│   │   └── [slug]/
│   │       └── page.tsx        ← halaman publik
│   ├── api/
│   │   ├── auth/
│   │   │   └── [...nextauth]/
│   │   │       └── route.ts
│   │   └── upload/
│   │       └── route.ts
│   ├── layout.tsx              ← root layout
│   ├── page.tsx                ← landing page (index.html → pindahkan ke sini)
│   └── not-found.tsx
│
├── actions/
│   ├── auth.ts
│   ├── store.ts
│   └── product.ts
│
├── components/
│   ├── forms/
│   │   ├── StoreForm.tsx
│   │   ├── ProductForm.tsx
│   │   └── AuthForm.tsx
│   ├── dashboard/
│   │   ├── Sidebar.tsx
│   │   ├── DashboardHeader.tsx
│   │   └── StatsCard.tsx
│   ├── store/
│   │   ├── StorePage.tsx
│   │   ├── ProductGrid.tsx
│   │   └── WhatsAppButton.tsx
│   └── ui/
│       ├── Button.tsx
│       ├── Input.tsx
│       ├── Label.tsx
│       ├── Textarea.tsx
│       ├── Card.tsx
│       ├── Toast.tsx
│       ├── ConfirmDialog.tsx
│       ├── ImageUpload.tsx
│       └── Spinner.tsx
│
├── lib/
│   ├── auth.ts                 ← NextAuth config
│   ├── prisma.ts               ← Prisma client singleton
│   ├── cloudinary.ts           ← Cloudinary config
│   ├── utils.ts                ← helper umum (format harga, generate slug, dll)
│   └── validations.ts          ← Zod schemas
│
├── prisma/
│   └── schema.prisma
│
├── middleware.ts
├── .env.local
├── next.config.ts
├── tailwind.config.ts
└── package.json
```

---

## Komponen Reusable yang Harus Dibuat dari Awal

Buat ini di Sprint 1 agar tidak refactor nanti:

| Komponen | Lokasi | Kegunaan |
|----------|--------|----------|
| `Button.tsx` | `ui/` | Tombol dengan variant (primary, outline, danger) + loading state |
| `Input.tsx` | `ui/` | Input dengan label, error message, helper text |
| `Textarea.tsx` | `ui/` | Textarea dengan karakter counter |
| `Card.tsx` | `ui/` | Wrapper card dengan border dan shadow |
| `Toast.tsx` | `ui/` | Notifikasi sukses/error (pakai react-hot-toast atau sonner) |
| `ConfirmDialog.tsx` | `ui/` | Modal konfirmasi hapus |
| `ImageUpload.tsx` | `ui/` | Upload + preview + progress |
| `Spinner.tsx` | `ui/` | Loading indicator |
| `WhatsAppButton.tsx` | `store/` | Tombol WA dengan URL builder |
| `ProductCard.tsx` | `store/` | Card produk (reusable di dashboard & halaman publik) |
| `Sidebar.tsx` | `dashboard/` | Navigasi dashboard |

---

## Checklist QA Manual Sebelum Deploy

### Auth
- [ ] Daftar dengan email baru → berhasil masuk dashboard
- [ ] Daftar dengan email yang sudah ada → tampil error
- [ ] Daftar dengan password < 8 karakter → tampil error
- [ ] Login dengan kredensial benar → berhasil
- [ ] Login dengan password salah → tampil error
- [ ] Akses `/dashboard` tanpa login → redirect ke `/masuk`
- [ ] Logout → session hapus, redirect ke `/masuk`

### Toko
- [ ] Buat toko dengan data lengkap → tersimpan
- [ ] Buat toko dengan slug yang sudah ada → tampil error
- [ ] Auto-generate slug dari nama toko berfungsi
- [ ] Edit toko → perubahan tersimpan
- [ ] Link preview slug update realtime saat mengetik

### Produk
- [ ] Tambah produk tanpa foto → berhasil
- [ ] Tambah produk dengan foto → foto tampil
- [ ] Upload foto > 2MB → tampil error
- [ ] Edit produk → data terupdate
- [ ] Hapus produk → konfirmasi muncul → produk hilang
- [ ] Produk muncul di halaman publik setelah ditambah

### Halaman Publik
- [ ] `/toko/[slug]` bisa diakses tanpa login
- [ ] Produk tampil dengan benar (nama, harga, foto)
- [ ] Harga format Rupiah (Rp 100.000, bukan 100000)
- [ ] Klik "Pesan via WhatsApp" → buka WA dengan pesan yang benar
- [ ] Pesan WA berisi nama produk dan harga yang benar
- [ ] Slug tidak ada → halaman 404 tampil
- [ ] Toko tanpa produk → pesan "belum ada produk" tampil

### Security
- [ ] User A tidak bisa akses `/dashboard/produk/[id]/edit` milik User B
- [ ] Server action verifikasi ownership sebelum update/delete
- [ ] Password tidak tersimpan plain text (cek di DB)

### Mobile
- [ ] Halaman publik toko nyaman di layar HP 375px
- [ ] Tombol WA mudah diklik di mobile
- [ ] Form di dashboard bisa diisi dari HP

---

## Hal yang Sengaja Ditunda Setelah MVP

Jangan bangun ini sekarang:

| Fitur | Alasan Ditunda |
|-------|---------------|
| Payment gateway (Midtrans/Xendit) | Belum ada validasi user mau bayar via platform |
| Custom domain | Infrastruktur kompleks, belum prioritas |
| Analytics toko (views, klik) | Belum ada user yang butuhkan ini di awal |
| Multi-produk order (keranjang) | Belum perlu, WA per produk sudah cukup |
| Subdomain per toko | DNS setup kompleks, tunda setelah ada user |
| Notifikasi order | Belum ada sistem order, WA sudah handle ini |
| Manajemen stok | Belum ada validasi kebutuhan ini |
| Foto multiple per produk | Satu foto sudah cukup untuk MVP |
| Kategori produk | Terlalu dini, belum terbukti dibutuhkan |
| Import produk bulk | Edge case, bukan prioritas validasi |
| Page builder / tema toko | Kompleksitas tinggi, bukan differentiator MVP |

---

## Risiko Teknis

| Risiko | Level | Mitigasi |
|--------|-------|----------|
| Slug conflict saat dua user submit bersamaan | Rendah | Prisma constraint `@unique` sudah handle |
| Upload foto gagal di tengah proses | Sedang | Upload foto dulu → dapat URL → baru submit form. Jika upload gagal, form tidak submit |
| NextAuth session expire tiba-tiba | Rendah | Set `maxAge` session 30 hari, tambahkan error handling di middleware |
| Nomor WA format tidak konsisten | Sedang | Normalisasi nomor WA saat simpan ke DB (`lib/utils.ts`), strip karakter non-angka, ganti prefix 0 → 62 |
| Gambar Cloudinary tidak bisa diakses | Rendah | Simpan `secure_url`, gunakan HTTPS. Jika gambar error, tampilkan placeholder |
| Database connection limit di Vercel | Sedang | Gunakan Prisma dengan connection pooling atau PgBouncer (Supabase sudah include ini) |
| Cold start Vercel terlalu lambat | Rendah | Server Component sudah cukup cepat untuk MVP, optimasi nanti |

---

## Versi Paling Kecil yang Bisa Live dalam 5–7 Hari

Jika harus pilih bare minimum untuk live:

**Hari 1:** Setup project, schema DB, auth (register + login)
**Hari 2:** Dashboard layout, buat/edit toko
**Hari 3:** CRUD produk (tanpa foto dulu)
**Hari 4:** Halaman toko publik + tombol WA
**Hari 5:** Upload foto produk (Cloudinary)
**Hari 6:** QA manual + bug fix
**Hari 7:** Deploy Vercel + smoke test production

**Jika mepet waktu, korbankan urutan ini:**
1. Upload foto → pakai URL eksternal dulu (user isi URL foto sendiri)
2. Validasi real-time slug → cek hanya saat submit
3. Animasi/transisi halaman → skip

**Hasil minimum yang tetap bisa divalidasi ke user:**
Seller daftar → buat toko → tambah produk → dapat link → bagikan → buyer buka link → klik WA → chat masuk.

---

## Environment Variables yang Dibutuhkan

```env
# .env.local
DATABASE_URL="postgresql://..."
NEXTAUTH_SECRET="random-string-min-32-chars"
NEXTAUTH_URL="http://localhost:3000"

# Cloudinary
CLOUDINARY_CLOUD_NAME="..."
CLOUDINARY_API_KEY="..."
CLOUDINARY_API_SECRET="..."
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="..."
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET="..." # untuk unsigned upload
```

---

## Dependensi yang Perlu Diinstall

```bash
# Core
npx create-next-app@latest store --typescript --tailwind --app --src-dir no

# Auth
npm install next-auth@beta bcryptjs
npm install -D @types/bcryptjs

# Database
npm install prisma @prisma/client
npx prisma init

# Validation
npm install zod

# Upload
npm install cloudinary

# UI Utilities
npm install sonner          # toast notifications
npm install clsx            # conditional classnames

# Form (opsional, bisa pakai native)
npm install react-hook-form @hookform/resolvers
```

---

*Dokumen ini adalah execution plan untuk MVP. Setelah user nyata mulai pakai, evaluasi ulang prioritas berdasarkan feedback sebelum build fitur selanjutnya.*
