"use client";

import { useState, useEffect } from "react";
import { buildStoreShareUrl } from "@/lib/whatsapp";

type Props = {
  slug: string;
  storeName: string;
  layout?: "stack" | "row";
};

export default function ShareActions({ slug, storeName, layout = "stack" }: Props) {
  const [copied, setCopied] = useState(false);
  const [storeUrl, setStoreUrl] = useState(`https://kirimlink.id/${slug}`);

  useEffect(() => {
    setStoreUrl(`${window.location.origin}/${slug}`);
  }, [slug]);

  const waUrl = buildStoreShareUrl(storeName, storeUrl);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(storeUrl);
    } catch {
      const el = document.createElement("textarea");
      el.value = storeUrl;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  }

  const isRow = layout === "row";

  return (
    <div className={isRow ? "flex gap-3" : "space-y-3"}>
      {/* Primary — Kirim ke WhatsApp */}
      <a
        href={waUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={`inline-flex items-center justify-center gap-2 bg-[#25d366] hover:bg-[#20bc5a] active:bg-[#1da851] text-white text-sm font-semibold rounded-lg transition-colors min-h-[48px] ${
          isRow ? "flex-1 px-4" : "w-full px-5 py-3"
        }`}
      >
        {/* WhatsApp icon */}
        <svg viewBox="0 0 24 24" className="w-4 h-4 flex-shrink-0 fill-current">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
          <path d="M12 0C5.373 0 0 5.373 0 12c0 2.089.534 4.055 1.47 5.765L0 24l6.432-1.434A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.007-1.371l-.36-.214-3.724.83.888-3.623-.233-.373A9.818 9.818 0 1112 21.818z" />
        </svg>
        Kirim ke WhatsApp
      </a>

      {/* Secondary — Salin link */}
      <button
        onClick={handleCopy}
        className={`inline-flex items-center justify-center gap-2 border text-sm font-semibold rounded-lg transition-colors min-h-[48px] ${
          isRow ? "flex-1 px-4" : "w-full px-5 py-3"
        } ${
          copied
            ? "border-green-200 bg-green-50 text-green-700"
            : "border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50"
        }`}
      >
        {copied ? (
          <>
            <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            Link tersalin!
          </>
        ) : (
          <>
            <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
            Salin link toko
          </>
        )}
      </button>
    </div>
  );
}
