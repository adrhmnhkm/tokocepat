import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const store = await prisma.store.findFirst();
  if (!store) {
    console.log("❌ Belum ada toko. Buat toko dulu di /dashboard/toko.");
    return;
  }

  const products = [
    { name: "Kaos Polos Premium", price: 75000, description: "Bahan cotton combed 30s, adem dan nyaman dipakai seharian. Tersedia semua ukuran S-XXL." },
    { name: "Celana Jogger Casual", price: 120000, description: "Bahan fleece tebal, cocok untuk santai di rumah atau olahraga ringan." },
    { name: "Tote Bag Kanvas", price: 55000, description: "Bahan kanvas tebal, kuat menampung belanja harian. Tersedia 3 warna." },
    { name: "Hijab Segi Empat Voal", price: 45000, description: "Bahan voal premium, anti kusut, jatuhnya cantik. Pilihan warna lengkap." },
    { name: "Sandal Rumah Anti Slip", price: 35000, description: "Sol karet tebal, anti slip, nyaman untuk dipakai di dalam dan luar ruangan." },
    { name: "Tumbler Stainless 500ml", price: 85000, description: "Bisa menahan panas hingga 6 jam dan dingin hingga 12 jam. Bebas BPA." },
    { name: "Dompet Lipat Kulit Sintetis", price: 65000, description: "Muat 8 slot kartu, uang kertas, dan STNK. Bahan kulit sintetis premium." },
    { name: "Kacamata Hitam UV400", price: 50000, description: "Lensa polarized UV400, cocok untuk aktivitas outdoor. Frame ringan dan kuat." },
    { name: "Ikat Pinggang Kulit", price: 40000, description: "Ukuran universal bisa dipotong sesuai lingkar pinggang. Buckle anti karat." },
    { name: "Tas Ransel Laptop 14 inch", price: 185000, description: "Kompartemen laptop 14 inch, slot botol minum, bahan waterproof, tersedia warna hitam dan abu." },
  ];

  await prisma.product.deleteMany({ where: { storeId: store.id } });

  await prisma.product.createMany({
    data: products.map((p) => ({ ...p, storeId: store.id })),
  });

  console.log(`✅ 10 produk berhasil ditambahkan ke toko "${store.name}"`);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
