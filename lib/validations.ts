import { z } from "zod";
import { isReservedSlug } from "@/lib/reserved-slugs";

export const registerSchema = z
  .object({
    name: z.string().min(2, "Nama minimal 2 karakter"),
    email: z.string().email("Format email tidak valid"),
    password: z.string().min(8, "Password minimal 8 karakter"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Konfirmasi password tidak cocok",
    path: ["confirmPassword"],
  });

export const loginSchema = z.object({
  email: z.string().email("Format email tidak valid"),
  password: z.string().min(1, "Password wajib diisi"),
});

export const storeSchema = z.object({
  name: z.string().min(3, "Nama toko minimal 3 karakter"),
  slug: z
    .string()
    .min(3, "Slug minimal 3 karakter")
    .max(50, "Slug maksimal 50 karakter")
    .regex(/^[a-z0-9-]+$/, "Slug hanya boleh huruf kecil, angka, dan strip")
    .refine((s) => !isReservedSlug(s), "Slug ini tidak bisa digunakan. Pilih nama lain."),
  description: z.string().max(200, "Deskripsi maksimal 200 karakter").optional(),
  logoUrl: z.string().url("URL logo tidak valid").optional().or(z.literal("")),
  whatsapp: z
    .string()
    .min(9, "Nomor WhatsApp tidak valid")
    .regex(/^[0-9+\-\s]+$/, "Nomor WhatsApp tidak valid"),
});

export const productSchema = z.object({
  name: z.string().min(3, "Nama produk minimal 3 karakter"),
  description: z.string().max(500, "Deskripsi maksimal 500 karakter").optional(),
  price: z.coerce
    .number()
    .positive("Harga harus lebih dari 0")
    .int("Harga harus angka bulat"),
  imageUrl: z.string().url("URL gambar tidak valid").optional().or(z.literal("")),
});

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type StoreInput = z.infer<typeof storeSchema>;
export type ProductInput = z.infer<typeof productSchema>;
