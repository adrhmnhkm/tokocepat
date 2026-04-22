"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const NAV_LINKS = [
  { href: "#masalah", label: "Masalah" },
  { href: "#solusi", label: "Solusi" },
  { href: "#cara-kerja", label: "Cara Kerja" },
  { href: "#testimoni", label: "Testimoni" },
  { href: "#faq", label: "FAQ" },
];

export default function MobileNav() {
  const [open, setOpen] = useState(false);

  // Lock body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      {/* Hamburger button */}
      <button
        onClick={() => setOpen(!open)}
        aria-label={open ? "Tutup menu" : "Buka menu"}
        aria-expanded={open}
        className="flex flex-col justify-center items-center gap-[5px] w-11 h-11 -mr-2 lg:hidden"
      >
        <span
          className={`block w-[22px] h-[2px] bg-slate-800 rounded transition-transform duration-200 origin-center ${
            open ? "rotate-45 translate-y-[7px]" : ""
          }`}
        />
        <span
          className={`block w-[22px] h-[2px] bg-slate-800 rounded transition-opacity duration-200 ${
            open ? "opacity-0" : ""
          }`}
        />
        <span
          className={`block w-[22px] h-[2px] bg-slate-800 rounded transition-transform duration-200 origin-center ${
            open ? "-rotate-45 -translate-y-[7px]" : ""
          }`}
        />
      </button>

      {open && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 top-16 z-40 bg-black/20 lg:hidden backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />

          {/* Menu panel */}
          <div className="absolute top-16 left-0 right-0 bg-white border-b border-slate-200 px-5 py-3 flex flex-col gap-1 lg:hidden z-50 shadow-xl">
            {NAV_LINKS.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className="flex items-center py-3 text-sm font-medium text-slate-600 hover:text-slate-900 border-b border-slate-100 last:border-0 transition-colors"
              >
                {label}
              </Link>
            ))}

            <div className="pt-3 pb-1 flex flex-col gap-2">
              <Link
                href="/daftar"
                onClick={() => setOpen(false)}
                className="block bg-slate-900 text-white text-sm font-semibold px-4 py-3 rounded-full text-center hover:bg-slate-700 transition-colors"
              >
                Buat katalog gratis
              </Link>
              <Link
                href="/masuk"
                onClick={() => setOpen(false)}
                className="block text-slate-600 text-sm font-medium px-4 py-2.5 rounded-full text-center hover:bg-slate-50 transition-colors border border-slate-200"
              >
                Masuk
              </Link>
            </div>
          </div>
        </>
      )}
    </>
  );
}
