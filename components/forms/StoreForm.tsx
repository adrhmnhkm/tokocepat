"use client";

import { useActionState, useState, useEffect } from "react";
import { upsertStore, type StoreActionState } from "@/actions/store";
import { generateSlug } from "@/lib/utils";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";
import Button from "@/components/ui/Button";
import { toast } from "sonner";
import type { Store } from "@prisma/client";

type Props = { store?: Store | null };

type SlugStatus = "idle" | "checking" | "available" | "taken";

export default function StoreForm({ store }: Props) {
  const [state, action, pending] = useActionState<StoreActionState, FormData>(
    upsertStore,
    null
  );

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

  // Toast on success
  useEffect(() => {
    if (state && "success" in state) {
      toast.success(state.success);
    }
  }, [state]);

  const displayWA = store?.whatsapp?.startsWith("62")
    ? "0" + store.whatsapp.slice(2)
    : (store?.whatsapp ?? "");

  const origin =
    typeof window !== "undefined" ? window.location.origin : "http://localhost:3000";

  return (
    <form action={action} className="space-y-5">
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
        <p className="text-xs text-slate-400">
          Link toko:{" "}
          <span className="font-mono text-slate-600">
            {origin}/toko/{slug || "slug-toko"}
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
