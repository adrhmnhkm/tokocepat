"use client";

import { useActionState } from "react";
import Link from "next/link";
import { loginUser } from "@/actions/auth";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import Logo from "@/components/ui/Logo";

export default function MasukPage() {
  const [state, action, pending] = useActionState(loginUser, null);

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      {/* Subtle overlay saat redirecting — mencegah double submit */}
      {pending && (
        <div className="fixed inset-0 z-50 bg-white/60 backdrop-blur-[2px] animate-fade-in" />
      )}
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-6 animate-enter">
          <div className="flex justify-center mb-1">
            <Logo size="md" />
          </div>
          <h1 className="mt-4 text-xl font-bold text-slate-900">
            Masuk ke akun kamu
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Belum punya akun?{" "}
            <Link
              href="/daftar"
              className="text-green-600 font-medium hover:underline"
            >
              Daftar sekarang
            </Link>
          </p>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-6 animate-enter-delayed">
          {state?.error && (
            <div className="mb-5 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600">
              {state.error}
            </div>
          )}

          <form action={action} className="space-y-4">
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
              placeholder="••••••••"
              autoComplete="current-password"
              required
            />
            <Button
              type="submit"
              loading={pending}
              className="w-full mt-2"
              size="lg"
            >
              {pending ? "Memproses..." : "Masuk"}
            </Button>
          </form>
        </div>

        <p className="text-center mt-5 text-xs text-slate-400">
          Dengan masuk, kamu setuju dengan{" "}
          <Link href="#" className="underline hover:text-slate-600">
            Syarat & Ketentuan
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
