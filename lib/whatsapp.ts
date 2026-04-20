export function buildStoreShareMessage(storeName: string, storeUrl: string): string {
  return `Halo kak, ini katalog produk *${storeName}* ya 🙏\nLangsung lihat & pesan di sini:\n${storeUrl}`;
}

export function buildStoreShareUrl(storeName: string, storeUrl: string): string {
  return `https://wa.me/?text=${encodeURIComponent(buildStoreShareMessage(storeName, storeUrl))}`;
}
