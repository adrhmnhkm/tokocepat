"use client";

import { useActionState, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { registerUser } from "@/actions/auth";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { track } from "@/lib/analytics";

export default function DaftarPage() {
  const [state, action, pending] = useActionState(registerUser, null);
  const [countdown, setCountdown] = useState(3);
  const router = useRouter();

  const isSuccess = state && "success" in state && !!state.success;

  // Auto-redirect ke /masuk setelah register sukses
  useEffect(() => {
    if (!isSuccess) return;
    track("register_success");
    const interval = setInterval(() => {
      setCountdown((c) => {
        if (c <= 1) {
          clearInterval(interval);
          router.push("/masuk");
        }
        return c - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isSuccess, router]);

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="w-full max-w-sm text-center">
          <div className="w-12 h-12 rounded-full bg-green-100 grid place-items-center mx-auto mb-4">
            <svg className="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-xl font-bold text-slate-900 mb-2">
            Akun berhasil dibuat
          </h1>
          <p className="text-slate-500 text-sm mb-6 leading-relaxed">
            {state.success} Kamu akan diarahkan dalam{" "}
            <span className="font-semibold text-slate-700">{countdown}</span> detik.
          </p>
          <Link
            href="/masuk"
            className="inline-flex items-center gap-2 bg-green-600 text-white text-sm font-semibold px-5 py-3 rounded-lg hover:bg-green-700 transition-colors"
          >
            Masuk Sekarang →
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-base font-semibold text-slate-900"
          >
            <span className="w-2 h-2 rounded-full bg-green-600" />
            KirimLink
          </Link>
          <h1 className="mt-4 text-xl font-bold text-slate-900">
            Buat akun gratis
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Sudah punya akun?{" "}
            <Link
              href="/masuk"
              className="text-green-600 font-medium hover:underline"
            >
              Masuk di sini
            </Link>
          </p>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-6">
          {state && "error" in state && state.error && (
            <div className="mb-5 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600">
              {state.error}
            </div>
          )}

          <form
            action={(formData) => {
              track("register_attempt");
              action(formData);
            }}
            className="space-y-4"
          >
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

        <p className="text-center mt-5 text-xs text-slate-400">
          Dengan mendaftar, kamu setuju dengan{" "}
          <Link href="#" className="underline hover:text-slate-600">
            Syarat & Ketentuan
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
