import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { formatRupiah } from "@/lib/utils";
import { isReservedSlug } from "@/lib/reserved-slugs";
import Image from "next/image";
import type { Metadata } from "next";
import WhatsAppButton from "@/components/store/WhatsAppButton";
import StickyWAButton from "@/components/store/StickyWAButton";
import StoreTracker from "@/components/store/StoreTracker";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  if (isReservedSlug(slug)) return { title: "Halaman tidak ditemukan" };
  const store = await prisma.store.findUnique({ where: { slug } });
  if (!store) return { title: "Toko tidak ditemukan" };
  return {
    title: `${store.name} — kirimlink.id`,
    description: store.description ?? `Belanja di ${store.name} lewat WhatsApp.`,
  };
}

export default async function StorePage({ params }: Props) {
  const { slug } = await params;

  if (isReservedSlug(slug)) notFound();

  const store = await prisma.store.findUnique({
    where: { slug },
    include: {
      products: {
        orderBy: [{ isFeatured: "desc" }, { createdAt: "desc" }],
      },
    },
  });

  if (!store) notFound();

  // Produk pertama adalah unggulan (isFeatured=true) atau terbaru jika tidak ada yang di-featured
  const [hero, ...rest] = store.products;

  return (
    <div
      className="min-h-screen pb-32"
      style={{ background: "linear-gradient(145deg, #FFF5E6 0%, #FFF0F8 50%, #F0FFF6 100%)" }}
    >
      <StoreTracker storeId={store.id} />
      {/* ===== HEADER ===== */}
      <div className="px-5 pt-10 pb-6 flex flex-col items-center text-center">
        {/* Logo bubble — clay effect */}
        <div
          className="w-[72px] h-[72px] rounded-[24px] flex items-center justify-center text-[2rem] mb-4 select-none overflow-hidden"
          style={{
            background: store.logoUrl
              ? "transparent"
              : "linear-gradient(135deg, #34d399 0%, #059669 100%)",
            boxShadow:
              "0 10px 30px rgba(16,185,129,0.35), 0 4px 10px rgba(0,0,0,0.10), inset 0 1px 0 rgba(255,255,255,0.35)",
          }}
        >
          {store.logoUrl ? (
            <Image
              src={store.logoUrl}
              alt={`Logo ${store.name}`}
              width={72}
              height={72}
              className="w-full h-full object-cover"
            />
          ) : (
            "🛍️"
          )}
        </div>

        <h1 className="text-2xl font-black text-slate-800 tracking-tight">{store.name}</h1>
        {store.description && (
          <p className="text-sm text-slate-500 mt-2 max-w-[270px] leading-relaxed">{store.description}</p>
        )}

        {/* Pill badge */}
        <div
          className="mt-3 flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold text-emerald-700"
          style={{
            background: "rgba(52,211,153,0.15)",
            boxShadow: "0 1px 4px rgba(52,211,153,0.20)",
          }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" />
          Toko aktif · Balas cepat
        </div>
      </div>

      {/* ===== CONTENT ===== */}
      <div className="w-[min(520px,100%)] mx-auto px-4">
        {store.products.length === 0 ? (
          /* Empty state */
          <div
            className="rounded-3xl p-12 text-center"
            style={{
              background: "#fff",
              boxShadow: "0 12px 40px rgba(0,0,0,0.08), 0 3px 10px rgba(0,0,0,0.05)",
            }}
          >
            <div className="text-5xl mb-3">📦</div>
            <p className="font-semibold text-slate-400">Toko ini belum menambahkan produk.</p>
          </div>
        ) : (
          <>
            {/* ===== HERO CARD (produk pertama / terlaris) ===== */}
            {hero && (
              <div
                className="rounded-[28px] overflow-hidden mb-5"
                style={{
                  background: "#ffffff",
                  boxShadow:
                    "0 20px 60px rgba(0,0,0,0.10), 0 6px 18px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.9)",
                }}
              >
                {/* Badge unggulan / terbaru */}
                <div className="px-5 pt-5 flex items-center gap-2">
                  <span
                    className="text-xs font-black text-white px-3 py-1 rounded-full"
                    style={{
                      background: hero.isFeatured
                        ? "linear-gradient(90deg, #f59e0b, #f97316)"
                        : "linear-gradient(90deg, #6366f1, #8b5cf6)",
                      boxShadow: hero.isFeatured
                        ? "0 3px 10px rgba(249,115,22,0.40)"
                        : "0 3px 10px rgba(139,92,246,0.35)",
                    }}
                  >
                    {hero.isFeatured ? "⭐ Produk Unggulan" : "✨ Terbaru"}
                  </span>
                </div>

                {/* Gambar produk hero */}
                <div className="px-5 pt-3">
                  <div
                    className="relative w-full overflow-hidden rounded-2xl"
                    style={{
                      aspectRatio: "4/3",
                      boxShadow: "0 8px 24px rgba(0,0,0,0.10), 0 2px 6px rgba(0,0,0,0.06)",
                    }}
                  >
                    {hero.imageUrl ? (
                      <Image
                        src={hero.imageUrl}
                        alt={hero.name}
                        fill
                        className="object-cover"
                        priority
                      />
                    ) : (
                      <div
                        className="w-full h-full flex items-center justify-center text-6xl"
                        style={{ background: "linear-gradient(135deg, #f1f5f9, #e2e8f0)" }}
                      >
                        📦
                      </div>
                    )}
                  </div>
                </div>

                {/* Info hero */}
                <div className="px-5 py-5">
                  <h2 className="text-xl font-black text-slate-800 leading-tight">{hero.name}</h2>
                  {hero.description && (
                    <p className="text-sm text-slate-400 mt-1.5 leading-relaxed line-clamp-3">
                      {hero.description}
                    </p>
                  )}
                  <p
                    className="text-2xl font-black mt-3"
                    style={{ color: "#059669" }}
                  >
                    {formatRupiah(hero.price)}
                  </p>
                  <div className="mt-4">
                    <WhatsAppButton
                      phone={store.whatsapp}
                      productName={hero.name}
                      price={hero.price}
                      storeId={store.id}
                      hero
                    />
                  </div>
                </div>
              </div>
            )}

            {/* ===== GRID PRODUK LAINNYA ===== */}
            {rest.length > 0 && (
              <>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 px-1">
                  Semua Produk
                </p>

                <div className="grid grid-cols-2 gap-3">
                  {rest.map((p) => (
                    <div
                      key={p.id}
                      className="overflow-hidden flex flex-col rounded-[22px] transition-transform duration-150 active:scale-[0.97]"
                      style={{
                        background: "#ffffff",
                        boxShadow:
                          "0 8px 24px rgba(0,0,0,0.08), 0 2px 6px rgba(0,0,0,0.05), inset 0 1px 0 rgba(255,255,255,0.9)",
                      }}
                    >
                      {/* Foto */}
                      <div className="relative w-full aspect-square overflow-hidden">
                        {p.imageUrl ? (
                          <Image src={p.imageUrl} alt={p.name} fill className="object-cover" />
                        ) : (
                          <div
                            className="w-full h-full flex items-center justify-center text-4xl"
                            style={{ background: "linear-gradient(135deg, #f1f5f9, #e2e8f0)" }}
                          >
                            📦
                          </div>
                        )}
                      </div>

                      {/* Info */}
                      <div className="p-3 flex flex-col gap-1.5 flex-1">
                        <h2 className="font-bold text-slate-800 text-sm leading-tight line-clamp-2">
                          {p.name}
                        </h2>
                        {p.description && (
                          <p className="text-xs text-slate-400 leading-relaxed line-clamp-2">
                            {p.description}
                          </p>
                        )}
                        <p className="font-extrabold text-sm" style={{ color: "#059669" }}>
                          {formatRupiah(p.price)}
                        </p>
                        <div className="mt-auto pt-1">
                          <WhatsAppButton
                            phone={store.whatsapp}
                            productName={p.name}
                            price={p.price}
                            storeId={store.id}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </>
        )}
      </div>

      {/* Footer */}
      <p className="text-center text-xs text-slate-300 mt-10 pb-2">
        Dibuat dengan <span className="font-semibold">kirimlink.id</span>
      </p>

      {/* ===== STICKY CTA ===== */}
      {store.whatsapp && (
        <StickyWAButton phone={store.whatsapp} storeName={store.name} storeId={store.id} />
      )}
    </div>
  );
}
