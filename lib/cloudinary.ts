import { v2 as cloudinary } from "cloudinary";

// Mendukung dua format konfigurasi:
// 1. CLOUDINARY_URL=cloudinary://<api_key>:<api_secret>@<cloud_name>  (SDK baca otomatis)
// 2. CLOUDINARY_CLOUD_NAME + CLOUDINARY_API_KEY + CLOUDINARY_API_SECRET (terpisah)
//
// Jika CLOUDINARY_URL di-set, SDK sudah handle sendiri tanpa perlu cloudinary.config().
// Fallback ke var terpisah jika CLOUDINARY_URL tidak ada.
if (!process.env.CLOUDINARY_URL) {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
}

export default cloudinary;
