"use client";

import { useActionState } from "react";
import Link from "next/link";
import { registerUser } from "@/actions/auth";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

export default function DaftarPage() {
  const [state, action, pending] = useActionState(registerUser, null);

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xl font-bold text-slate-900"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-green-600" />
            TokoCepat
          </Link>
          <h1 className="mt-5 text-2xl font-extrabold text-slate-900">
            Buat akun gratis
          </h1>
          <p className="mt-1.5 text-sm text-slate-500">
            Sudah punya akun?{" "}
            <Link
              href="/masuk"
              className="text-green-600 font-semibold hover:underline"
            >
              Masuk di sini
            </Link>
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-7">
          {state?.error && (
            <div className="mb-5 p-3.5 bg-red-50 border border-red-200 rounded-xl text-sm text-red-600">
              {state.error}
            </div>
          )}

          <form action={action} className="space-y-4">
            <Input
              name="name"
              label="Nama lengkap"
              type="text"
              placeholder="Contoh: Rani Seller"
              autoComplete="name"
              required
            />
            <Input
              name="email"
              label="Email"
              type="email"
              placeholder="nama@email.com"
              autoComplete="email"
              required
            />
            <Input
              name="password"
              label="Password"
              type="password"
              placeholder="Minimal 8 karakter"
              autoComplete="new-password"
              required
              hint="Minimal 8 karakter"
            />
            <Input
              name="confirmPassword"
              label="Konfirmasi password"
              type="password"
              placeholder="Ulangi password"
              autoComplete="new-password"
              required
            />
            <Button
              type="submit"
              loading={pending}
              className="w-full mt-2"
              size="lg"
            >
              {pending ? "Membuat akun..." : "Daftar Sekarang"}
            </Button>
          </form>
        </div>

        <p className="text-center mt-6 text-xs text-slate-400">
          Dengan mendaftar, kamu setuju dengan{" "}
          <Link href="#" className="underline hover:text-slate-600">
            Syarat & Ketentuan
          </Link>{" "}
          kami.
        </p>
      </div>
    </div>
  );
}
