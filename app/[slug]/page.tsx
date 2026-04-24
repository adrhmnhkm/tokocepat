import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { formatRupiah } from "@/lib/utils";
import { isReservedSlug } from "@/lib/reserved-slugs";
import Image from "next/image";
import type { Metadata } from "next";
import WhatsAppButton from "@/components/store/WhatsAppButton";
import StickyWAButton from "@/components/store/StickyWAButton";
import StoreTracker from "@/components/store/StoreTracker";
import Link from "next/link";

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

  const [hero, ...rest] = store.products;

  return (
    <div className="min-h-screen bg-white pb-32">
      <StoreTracker storeId={store.id} />

      {/* HEADER */}
      <div className="px-5 pt-12 pb-8 flex flex-col items-center text-center border-b border-slate-100">
        {/* Logo */}
        <div className="w-16 h-16 rounded-full overflow-hidden border border-slate-200 mb-4 flex-shrink-0">
          {store.logoUrl ? (
            <Image
              src={store.logoUrl}
              alt={`Logo ${store.name}`}
              width={64}
              height={64}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-slate-100 flex items-center justify-center text-2xl">
              🛍️
            </div>
          )}
        </div>

        <h1 className="text-xl font-bold text-slate-900">{store.name}</h1>
        {store.description && (
          <p className="text-sm text-slate-500 mt-1.5 max-w-[280px] leading-relaxed">
            {store.description}
          </p>
        )}
      </div>

      {/* CONTENT */}
      <div className="w-[min(520px,100%)] mx-auto px-4 pt-6">
        {store.products.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-4xl mb-3">📦</p>
            <p className="text-sm text-slate-400">Belum ada produk di toko ini.</p>
          </div>
        ) : (
          <>
            {/* HERO PRODUCT */}
            {hero && (
              <div className="border border-slate-200 rounded-2xl overflow-hidden mb-6">
                {hero.isFeatured && (
                  <div className="px-4 pt-3">
                    <span className="text-[11px] font-semibold text-amber-600 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-full">
                      Produk Unggulan
                    </span>
                  </div>
                )}

                <div className="px-4 pt-3">
                  <div className="relative w-full overflow-hidden rounded-xl" style={{ aspectRatio: "4/3" }}>
                    {hero.imageUrl ? (
                      <Image
                        src={hero.imageUrl}
                        alt={hero.name}
                        fill
                        className="object-cover"
                        priority
                      />
                    ) : (
                      <div className="w-full h-full bg-slate-50 flex items-center justify-center text-5xl">
                        📦
                      </div>
                    )}
                  </div>
                </div>

                <div className="px-4 py-4">
                  <h2 className="text-lg font-bold text-slate-900 leading-snug">{hero.name}</h2>
                  {hero.description && (
                    <p className="text-sm text-slate-500 mt-1 leading-relaxed line-clamp-3">
                      {hero.description}
                    </p>
                  )}
                  <p className="text-xl font-bold text-green-600 mt-2">
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

            {/* PRODUCT GRID */}
            {rest.length > 0 && (
              <>
                {hero && (
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-3">
                    Produk Lainnya
                  </p>
                )}
                <div className="grid grid-cols-2 gap-3">
                  {(hero ? rest : store.products).map((p) => (
                    <div
                      key={p.id}
                      className="border border-slate-200 rounded-xl overflow-hidden flex flex-col"
                    >
                      <div className="relative w-full aspect-square overflow-hidden bg-slate-50">
                        {p.imageUrl ? (
                          <Image src={p.imageUrl} alt={p.name} fill className="object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-3xl">
                            📦
                          </div>
                        )}
                      </div>

                      <div className="p-3 flex flex-col gap-1 flex-1">
                        <h2 className="font-semibold text-slate-900 text-sm leading-snug line-clamp-2">
                          {p.name}
                        </h2>
                        {p.description && (
                          <p className="text-xs text-slate-400 leading-relaxed line-clamp-2">
                            {p.description}
                          </p>
                        )}
                        <p className="font-bold text-sm text-green-600 mt-0.5">
                          {formatRupiah(p.price)}
                        </p>
                        <div className="mt-auto pt-2">
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

      {/* FOOTER */}
      <div className="text-center mt-12 pb-2">
        <Link
          href="/"
          className="text-xs text-slate-400 hover:text-slate-600 transition-colors"
        >
          Buat toko gratis di <span className="font-semibold">kirimlink.id</span>
        </Link>
      </div>

      {/* STICKY WA */}
      {store.whatsapp && (
        <StickyWAButton phone={store.whatsapp} storeName={store.name} storeId={store.id} />
      )}
    </div>
  );
}
