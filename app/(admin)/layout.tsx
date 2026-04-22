import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { signOut } from "@/lib/auth";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  const adminEmail = process.env.ADMIN_EMAIL;

  if (!session?.user?.email || session.user.email !== adminEmail) {
    redirect("/masuk");
  }

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <nav className="bg-slate-900 text-white px-6 py-3 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-6">
          <span className="font-black text-sm tracking-tight">
            KirimLink <span className="text-green-400">Admin</span>
          </span>
          <div className="flex items-center gap-4 text-sm">
            {[
              { href: "/admin", label: "Overview" },
              { href: "/admin/users", label: "Users" },
              { href: "/admin/stores", label: "Toko" },
            ].map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="text-slate-400 hover:text-white transition-colors"
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-3 text-xs text-slate-400">
          <span>{session.user.email}</span>
          <form action={async () => { "use server"; await signOut({ redirectTo: "/masuk" }); }}>
            <button type="submit" className="hover:text-white transition-colors">
              Keluar
            </button>
          </form>
        </div>
      </nav>
      <main className="max-w-6xl mx-auto px-6 py-8">{children}</main>
    </div>
  );
}
