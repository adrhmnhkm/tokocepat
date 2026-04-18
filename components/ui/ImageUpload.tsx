"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Spinner from "./Spinner";

type Props = {
  value?: string;
  onChange: (url: string) => void;
};

export default function ImageUpload({ value, onChange }: Props) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      setError("Ukuran file maksimal 2MB.");
      return;
    }

    setError("");
    setUploading(true);

    const fd = new FormData();
    fd.append("file", file);

    try {
      const res = await fetch("/api/upload", { method: "POST", body: fd });
      const data = await res.json();
      if (data.url) {
        onChange(data.url);
      } else {
        setError(data.error ?? "Upload gagal.");
      }
    } catch {
      setError("Koneksi gagal. Coba lagi.");
    } finally {
      setUploading(false);
      // reset input so same file can be re-selected
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  return (
    <div className="space-y-1.5">
      <label className="block text-sm font-semibold text-slate-700">
        Foto Produk
        <span className="ml-1 text-slate-400 font-normal">(opsional)</span>
      </label>

      {value ? (
        <div className="relative w-full h-44 rounded-xl overflow-hidden border border-slate-200 group">
          <Image src={value} alt="Preview produk" fill className="object-cover" />
          <button
            type="button"
            onClick={() => onChange("")}
            className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2.5 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
          >
            Hapus foto
          </button>
        </div>
      ) : (
        <div
          onClick={() => !uploading && inputRef.current?.click()}
          className="w-full h-36 border-2 border-dashed border-slate-300 rounded-xl flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-green-400 hover:bg-green-50 transition-colors select-none"
        >
          {uploading ? (
            <>
              <Spinner size="md" className="text-green-600" />
              <span className="text-sm text-slate-500">Mengupload foto...</span>
            </>
          ) : (
            <>
              <span className="text-3xl">📷</span>
              <span className="text-sm text-slate-600 font-medium">
                Klik untuk upload foto
              </span>
              <span className="text-xs text-slate-400">JPG, PNG, WEBP · Maks 2MB</span>
            </>
          )}
        </div>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        onChange={handleFile}
        className="hidden"
      />

      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}
