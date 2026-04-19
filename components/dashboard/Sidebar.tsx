"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/dashboard/toko", label: "Toko Saya" },
  { href: "/dashboard/produk", label: "Produk" },
];

type Props = {
  user: { name?: string | null; email?: string | null };
};

export default function Sidebar({ user }: Props) {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-slate-900 min-h-screen flex flex-col flex-shrink-0">
      {/* Logo */}
      <div className="px-6 py-5 border-b border-slate-800">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-lg font-bold text-white"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-green-500" />
          TokoCepat
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-0.5">
        {navItems.map((item) => {
          const isActive =
            item.href === "/dashboard"
              ? pathname === "/dashboard"
              : pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm transition-colors",
                isActive
                  ? "bg-white/[0.08] text-white font-medium"
                  : "text-slate-400 hover:text-slate-100 hover:bg-white/[0.04] font-normal"
              )}
            >
              {isActive && (
                <span className="w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
              )}
              {!isActive && (
                <span className="w-1 h-1 rounded-full bg-transparent flex-shrink-0" />
              )}
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* User info */}
      <div className="px-3 py-4 border-t border-slate-800">
        <div className="flex items-center gap-3 mb-3 px-1">
          <div className="w-8 h-8 rounded-lg bg-slate-700 grid place-items-center text-white text-xs font-semibold flex-shrink-0">
            {user.name?.[0]?.toUpperCase() ?? "U"}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-slate-200 truncate">
              {user.name}
            </p>
            <p className="text-xs text-slate-500 truncate">{user.email}</p>
          </div>
        </div>
        <button
          onClick={() => signOut({ callbackUrl: "/masuk" })}
          className="w-full text-left text-xs text-slate-500 hover:text-slate-300 transition-colors px-1 py-1.5"
        >
          Keluar
        </button>
      </div>
    </aside>
  );
}
