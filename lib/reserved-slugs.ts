/**
 * Slug yang tidak boleh dipakai sebagai URL toko.
 * Tambahkan route baru di sini jika ada halaman statis baru.
 */
export const RESERVED_SLUGS = new Set([
  // Auth
  "masuk",
  "daftar",
  "logout",
  // App
  "dashboard",
  "onboarding",
  "toko",
  "produk",
  // System
  "api",
  "admin",
  "404",
  "500",
  // Landing / informational
  "pricing",
  "tentang",
  "about",
  "kontak",
  "contact",
  "blog",
  "help",
  "bantuan",
  "privacy",
  "terms",
  "kebijakan",
  // Common squatted slugs
  "www",
  "mail",
  "support",
  "info",
  "app",
]);

export function isReservedSlug(slug: string): boolean {
  return RESERVED_SLUGS.has(slug.toLowerCase());
}
