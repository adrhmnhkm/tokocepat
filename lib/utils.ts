import { clsx, type ClassValue } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function formatRupiah(amount: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .substring(0, 50);
}

export function normalizeWhatsApp(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  if (digits.startsWith("0")) return "62" + digits.slice(1);
  if (digits.startsWith("62")) return digits;
  return "62" + digits;
}

export function buildWAUrl(phone: string, productName: string, price: number): string {
  const nomor = normalizeWhatsApp(phone);
  const pesan =
    `Halo, saya tertarik dengan produk:\n\n` +
    `*${productName}*\n` +
    `Harga: ${formatRupiah(price)}\n\n` +
    `Apakah masih tersedia?`;
  return `https://wa.me/${nomor}?text=${encodeURIComponent(pesan)}`;
}
