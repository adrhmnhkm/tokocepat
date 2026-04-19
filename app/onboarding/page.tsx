"use client";

import { useActionState } from "react";
import Link from "next/link";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import {
  createOnboardingStore,
  type OnboardingState,
} from "@/actions/onboarding";

export default function OnboardingPage() {
  const [state, action, pending] = useActionState<OnboardingState, FormData>(
    createOnboardingStore,
    null
  );


  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Top bar */}
      <header className="px-6 py-5 border-b border-slate-100">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-900 hover:text-slate-700 transition-colors"
        >
          <span className="w-2 h-2 rounded-full bg-green-600 flex-shrink-0" />
          TokoCepat
        </Link>
      </header>

      {/* Main content */}
      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-[400px]">
          {/* Step indicator — subtle */}
          <p className="text-xs font-medium text-slate-400 uppercase tracking-wide mb-8 animate-fade-in">
            Langkah 1 dari 1
          </p>

          <div className="mb-8 animate-enter">
            <h1 className="text-2xl font-bold text-slate-900 leading-snug mb-2">
              Bikin toko kamu dalam 1 menit
            </h1>
            <p className="text-sm text-slate-500 leading-relaxed">
              Kamu akan dapat link yang bisa langsung kamu share ke pembeli —
              tanpa kirim foto satu-satu.
            </p>
          </div>

          <form action={action} className="space-y-5 animate-enter-delayed">
            {state?.error && (
              <div className="bg-red-50 border border-red-100 text-red-600 text-sm px-4 py-3 rounded-lg">
                {state.error}
              </div>
            )}

            <Input
              name="name"
              autoFocus
              label="Nama toko"
              placeholder="Contoh: Toko Baju Rani"
              required
              autoComplete="off"
              maxLength={50}
            />

            <Button
              type="submit"
              size="lg"
              loading={pending}
              className="w-full rounded-lg min-h-[48px]"
            >
              {pending ? "Membuat toko..." : "Buat toko sekarang"}
            </Button>
          </form>

          <p className="mt-6 text-xs text-slate-400 text-center">
            Kamu bisa mengatur logo, deskripsi, dan nomor WhatsApp toko
            setelah ini.
          </p>
        </div>
      </main>
    </div>
  );
}
