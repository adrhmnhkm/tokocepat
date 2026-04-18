import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { formatRupiah } from "@/lib/utils";
import Image from "next/image";
import type { Metadata } from "next";
import WhatsAppButton from "@/components/store/WhatsAppButton";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const store = await prisma.store.findUnique({ where: { slug } });
  if (!store) return { title: "Toko tidak ditemukan" };
  return {
    title: `${store.name} — TokoCepat`,
    description: store.description ?? `Belanja di ${store.name} lewat WhatsApp.`,
  };
}

export default async function StorePage({ params }: Props) {
  const { slug } = await params;

  const store = await prisma.store.findUnique({
    where: { slug },
    include: { products: { orderBy: { createdAt: "desc" } } },
  });

  if (!store) notFound();

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header toko */}
      <div className="bg-white border-b border-slate-200 px-4 py-6 text-center">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-green-500 to-green-400 grid place-items-center text-3xl mx-auto mb-3">
          🛍️
        </div>
        <h1 className="text-xl font-extrabold text-slate-900">{store.name}</h1>
        {store.description && (
          <p className="text-sm text-slate-500 mt-1 max-w-xs mx-auto">{store.description}</p>
        )}
      </div>

      {/* Produk */}
      <div className="w-[min(680px,100%)] mx-auto px-4 py-6">
        {store.products.length === 0 ? (
          <div className="text-center py-16 text-slate-400">
            <div className="text-5xl mb-3">📦</div>
            <p className="font-medium">Toko ini belum menambahkan produk.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {store.products.map((p) => (
              <div
                key={p.id}
                className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm flex flex-col"
              >
                {/* Foto */}
                <div className="relative w-full aspect-square bg-slate-100">
                  {p.imageUrl ? (
                    <Image src={p.imageUrl} alt={p.name} fill className="object-cover" />
                  ) : (
                    <div className="w-full h-full grid place-items-center text-4xl">📦</div>
                  )}
                </div>

                {/* Info */}
                <div className="p-3 flex flex-col gap-2 flex-1">
                  <div>
                    <h2 className="font-bold text-slate-900 text-sm leading-tight line-clamp-2">
                      {p.name}
                    </h2>
                    {p.description && (
                      <p className="text-xs text-slate-400 mt-1 line-clamp-2">{p.description}</p>
                    )}
                  </div>
                  <p className="text-green-600 font-extrabold text-sm">{formatRupiah(p.price)}</p>
                  <div className="mt-auto">
                    <WhatsAppButton
                      phone={store.whatsapp}
                      productName={p.name}
                      price={p.price}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <p className="text-center text-xs text-slate-300 pb-8">
        Dibuat dengan <span className="font-semibold">TokoCepat</span>
      </p>
    </div>
  );
}
