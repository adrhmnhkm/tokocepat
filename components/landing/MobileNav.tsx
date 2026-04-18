"use client";

import { useState } from "react";
import Link from "next/link";

export default function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        aria-label="Toggle menu"
        className="flex flex-col gap-[5px] p-1 lg:hidden"
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
        <div className="absolute top-16 left-0 right-0 bg-white border-b border-slate-200 px-6 py-4 flex flex-col gap-4 lg:hidden z-50 shadow-md">
          <Link
            href="#problem"
            onClick={() => setOpen(false)}
            className="text-sm font-medium text-slate-600 hover:text-slate-900"
          >
            Masalah
          </Link>
          <Link
            href="#solution"
            onClick={() => setOpen(false)}
            className="text-sm font-medium text-slate-600 hover:text-slate-900"
          >
            Fitur
          </Link>
          <Link
            href="#steps"
            onClick={() => setOpen(false)}
            className="text-sm font-medium text-slate-600 hover:text-slate-900"
          >
            Cara Kerja
          </Link>
          <Link
            href="#faq"
            onClick={() => setOpen(false)}
            className="text-sm font-medium text-slate-600 hover:text-slate-900"
          >
            FAQ
          </Link>
          <Link
            href="/daftar"
            onClick={() => setOpen(false)}
            className="bg-green-600 text-white text-sm font-semibold px-4 py-2.5 rounded-full text-center hover:bg-green-700 transition-colors"
          >
            Mulai Gratis
          </Link>
        </div>
      )}
    </>
  );
}
