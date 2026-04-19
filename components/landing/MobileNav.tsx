"use client";

import { useState } from "react";
import Link from "next/link";

export default function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Hamburger — min 44×44px tap target */}
      <button
        onClick={() => setOpen(!open)}
        aria-label={open ? "Tutup menu" : "Buka menu"}
        aria-expanded={open}
        className="flex flex-col justify-center items-center gap-[5px] w-11 h-11 -mr-2 lg:hidden"
      >
        <span
          className={`block w-[22px] h-[2px] bg-slate-800 rounded transition-transform duration-300 ${
            open ? "rotate-45 translate-y-[7px]" : ""
          }`}
        />
        <span
          className={`block w-[22px] h-[2px] bg-slate-800 rounded transition-opacity duration-300 ${
            open ? "opacity-0" : ""
          }`}
        />
        <span
          className={`block w-[22px] h-[2px] bg-slate-800 rounded transition-transform duration-300 ${
            open ? "-rotate-45 -translate-y-[7px]" : ""
          }`}
        />
      </button>

      {open && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 top-16 z-40 bg-black/10 lg:hidden"
            onClick={() => setOpen(false)}
          />
          {/* Dropdown panel */}
          <div className="absolute top-16 left-0 right-0 bg-white border-b border-slate-200 px-5 py-3 flex flex-col gap-1 lg:hidden z-50 shadow-lg">
            {[
              { href: "#problem", label: "Masalah" },
              { href: "#solution", label: "Fitur" },
              { href: "#steps", label: "Cara Kerja" },
              { href: "#faq", label: "FAQ" },
            ].map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className="flex items-center py-3 text-sm font-medium text-slate-600 hover:text-slate-900 border-b border-slate-100 last:border-0"
              >
                {label}
              </Link>
            ))}
            <div className="pt-2 pb-1">
              <Link
                href="/daftar"
                onClick={() => setOpen(false)}
                className="block bg-green-600 text-white text-sm font-semibold px-4 py-3 rounded-full text-center hover:bg-green-700 transition-colors"
              >
                Mulai Gratis →
              </Link>
            </div>
          </div>
        </>
      )}
    </>
  );
}
