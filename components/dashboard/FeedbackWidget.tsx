"use client";

import { useState } from "react";
import { track } from "@/lib/analytics";

/**
 * Isi kontak feedback di sini.
 * Ganti nomor WA dan email sesuai milik kamu.
 *
 * WA_NUMBER: format internasional tanpa +, contoh: 6281234567890
 * FEEDBACK_EMAIL: alamat email tujuan feedback
 */
const WA_NUMBER = "6281287930672"; // TODO: ganti dengan nomor WA kamu
const FEEDBACK_EMAIL = "adrhmnhkm@gmail.com"; // TODO: ganti dengan email kamu

export default function FeedbackWidget() {
  const [open, setOpen] = useState(false);

  function handleOpen() {
    setOpen(true);
    track("feedback_opened");
  }

  function handleWA() {
    track("feedback_sent", { method: "whatsapp" });
    const msg = encodeURIComponent(
      "Halo! Saya ingin memberikan feedback tentang TokoCepat:\n\n"
    );
    window.open(`https://wa.me/${WA_NUMBER}?text=${msg}`, "_blank");
  }

  function handleEmail() {
    track("feedback_sent", { method: "email" });
    window.location.href = `mailto:${FEEDBACK_EMAIL}?subject=Feedback%20TokoCepat`;
  }

  return (
    <>
      {/* Trigger button */}
      <button
        onClick={handleOpen}
        className="fixed bottom-5 right-5 z-50 flex items-center gap-2 bg-slate-800 text-white text-sm font-medium px-4 py-2.5 rounded-full shadow-lg hover:bg-slate-700 transition-colors"
        aria-label="Kirim feedback"
      >
        <span>💬</span>
        <span className="hidden sm:inline">Feedback</span>
      </button>

      {/* Panel */}
      {open && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />

          {/* Modal */}
          <div className="fixed bottom-20 right-5 z-50 w-72 bg-white rounded-2xl shadow-2xl border border-slate-200 p-5">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="font-bold text-slate-900 text-sm">
                  Kirim Feedback
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Ceritakan pengalaman atau saranmu
                </p>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="text-slate-400 hover:text-slate-600 text-lg leading-none mt-0.5"
                aria-label="Tutup"
              >
                ×
              </button>
            </div>

            <div className="space-y-2">
              <button
                onClick={handleWA}
                className="w-full flex items-center gap-3 px-4 py-3 bg-green-50 border border-green-200 rounded-xl text-sm font-medium text-green-800 hover:bg-green-100 transition-colors text-left"
              >
                <span className="text-lg">💬</span>
                <div>
                  <div className="font-semibold">Via WhatsApp</div>
                  <div className="text-xs text-green-600 font-normal">
                    Respons paling cepat
                  </div>
                </div>
              </button>

              <button
                onClick={handleEmail}
                className="w-full flex items-center gap-3 px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-700 hover:bg-slate-100 transition-colors text-left"
              >
                <span className="text-lg">✉️</span>
                <div>
                  <div className="font-semibold">Via Email</div>
                  <div className="text-xs text-slate-500 font-normal">
                    {FEEDBACK_EMAIL}
                  </div>
                </div>
              </button>
            </div>

            <p className="text-xs text-slate-400 mt-3 text-center">
              Feedback kamu sangat membantu pengembangan TokoCepat 🙏
            </p>
          </div>
        </>
      )}
    </>
  );
}
