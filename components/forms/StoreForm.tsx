"use client";

import { useActionState, useState, useEffect } from "react";
import { upsertStore, type StoreActionState } from "@/actions/store";
import { generateSlug } from "@/lib/utils";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";
import Button from "@/components/ui/Button";
import { toast } from "sonner";
import Link from "next/link";
import { track } from "@/lib/analytics";
import type { Store } from "@prisma/client";

type Props = { store?: Store | null };

type SlugStatus = "idle" | "checking" | "available" | "taken";

export default function StoreForm({ store }: Props) {
  const isNew = !store;
  const [state, action, pending] = useActionState<StoreActionState, FormData>(
    upsertStore,
    null
  );
  const [justCreated, setJustCreated] = useState(false);
  const [createdSlug, setCreatedSlug] = useState("");

  const [name, setName] = useState(store?.name ?? "");
  const [slug, setSlug] = useState(store?.slug ?? "");
  const [slugStatus, setSlugStatus] = useState<SlugStatus>("idle");

  // Auto-generate slug dari nama (hanya untuk toko baru)
  useEffect(() => {
    if (store) return;
    setSlug(generateSlug(name));
  }, [name, store]);

  // Debounced slug availability check
  useEffect(() => {
    if (!slug || slug.length < 3) {
      setSlugStatus("idle");
      return;
    }

    setSlugStatus("checking");
    const t = setTimeout(async () => {
      try {
        const params = new URLSearchParams({ slug, storeId: store?.id ?? "" });
        const res = await fetch(`/api/check-slug?${params}`);
        const data = await res.json();
        setSlugStatus(data.available ? "available" : "taken");
      } catch {
        setSlugStatus("idle");
      }
    }, 500);

    return () => clearTimeout(t);
  }, [slug, store?.id]);

  // Toast on success + panel celebratory untuk toko baru
  useEffect(() => {
    if (state && "success" in state) {
      toast.success(state.success);
      if (isNew) {
        track("create_store_success");
        setCreatedSlug(slug);
        setJustCreated(true);
      }
    }
  }, [state, isNew, slug]);

  const displayWA = store?.whatsapp?.startsWith("62")
    ? "0" + store.whatsapp.slice(2)
    : (store?.whatsapp ?? "");

  const origin =
    typeof window !== "undefined" ? window.location.origin : "http://localhost:3000";

  if (justCreated) {
    return (
      <div className="text-center py-4 space-y-5">
        <div className="text-6xl">🎉</div>
        <div>
          <h2 className="text-xl font-extrabold text-slate-900 mb-1">
            Toko berhasil dibuat!
          </h2>
          <p className="text-slate-500 text-sm">
            Sekarang tambahkan produk agar pembeli bisa langsung order.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/dashboard/produk/tambah"
            className="inline-flex items-center justify-center gap-2 bg-green-600 text-white font-semibold px-6 py-2.5 rounded-full shadow-[0_4px_12px_rgba(22,163,74,0.3)] hover:bg-green-700 transition-colors"
          >
            + Tambah Produk Pertama
          </Link>
          <Link
            href={`/${createdSlug}`}
            target="_blank"
            className="inline-flex items-center justify-center gap-2 bg-white text-slate-700 font-semibold px-6 py-2.5 rounded-full border border-slate-200 hover:border-slate-400 transition-colors"
          >
            Lihat Toko ↗
          </Link>
        </div>
        <button
          onClick={() => setJustCreated(false)}
          className="text-xs text-slate-400 hover:text-slate-600 underline"
        >
          Edit toko lagi
        </button>
      </div>
    );
  }

  return (
    <form
      action={(formData) => {
        track("create_store_attempt");
        action(formData);
      }}
      className="space-y-5"
    >
      {state && "error" in state && (
        <div className="p-3.5 bg-red-50 border border-red-200 rounded-xl text-sm text-red-600">
          {state.error}
        </div>
      )}

      <Input
        name="name"
        label="Nama Toko"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Contoh: Toko Rani Fashion"
        required
      />

      {/* Slug field dengan status check */}
      <div className="space-y-1.5">
        <label className="block text-sm font-semibold text-slate-700">
          Slug URL Toko <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <input
            name="slug"
            value={slug}
            onChange={(e) =>
              setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ""))
            }
            placeholder="toko-rani-fashion"
            required
            className="w-full px-4 py-2.5 pr-28 text-sm rounded-xl border border-slate-200 hover:border-slate-300 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-colors"
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold">
            {slugStatus === "checking" && (
              <span className="text-slate-400">Mengecek...</span>
            )}
            {slugStatus === "available" && (
              <span className="text-green-600">✓ Tersedia</span>
            )}
            {slugStatus === "taken" && (
              <span className="text-red-500">✗ Sudah dipakai</span>
            )}
          </div>
        </div>
        <p className="text-xs text-slate-400 break-all">
          Link toko:{" "}
          <span className="font-mono text-slate-600">
            {origin}/{slug || "slug-toko"}
          </span>
        </p>
      </div>

      <Textarea
        name="description"
        label="Deskripsi Toko"
        defaultValue={store?.description ?? ""}
        placeholder="Ceritakan sedikit tentang tokomu..."
        rows={3}
        maxLength={200}
        hint="Maks 200 karakter"
      />

      <Input
        name="whatsapp"
        label="Nomor WhatsApp"
        type="tel"
        defaultValue={displayWA}
        placeholder="08xxxxxxxxxx"
        required
        hint="Nomor ini yang akan dihubungi pembeli"
      />

      <Button type="submit" loading={pending} size="lg" className="w-full">
        {pending
          ? "Menyimpan..."
          : store
          ? "Simpan Perubahan"
          : "Buat Toko Sekarang"}
      </Button>
    </form>
  );
}
