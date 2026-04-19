"use server";

import { prisma } from "@/lib/prisma";
import { signIn } from "@/lib/auth";
import { loginSchema, registerSchema } from "@/lib/validations";
import bcrypt from "bcryptjs";
import { AuthError } from "next-auth";

export type ActionState = {
  error?: string;
  success?: string;
} | null;

export async function registerUser(
  _prev: ActionState,
  formData: FormData
): Promise<ActionState> {
  const raw = Object.fromEntries(formData);
  const result = registerSchema.safeParse(raw);

  if (!result.success) {
    return { error: result.error.errors[0].message };
  }

  const { name, email, password } = result.data;

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    return { error: "Email sudah digunakan. Silakan login." };
  }

  const hashed = await bcrypt.hash(password, 12);

  await prisma.user.create({
    data: { name, email, password: hashed },
  });

  return { success: "Akun berhasil dibuat. Silakan masuk." };
}

export async function loginUser(
  _prev: ActionState,
  formData: FormData
): Promise<ActionState> {
  const raw = Object.fromEntries(formData);
  const result = loginSchema.safeParse(raw);

  if (!result.success) {
    return { error: result.error.errors[0].message };
  }

  const { email, password } = result.data;

  // Pre-check store so we can redirect directly — skips the dashboard → onboarding double redirect
  const user = await prisma.user.findUnique({ where: { email } });
  const hasStore = user
    ? !!(await prisma.store.findUnique({ where: { userId: user.id } }))
    : false;
  const redirectTo = hasStore ? "/dashboard" : "/onboarding";

  try {
    await signIn("credentials", { email, password, redirectTo });
  } catch (error) {
    if (error instanceof AuthError) {
      return { error: "Email atau password salah." };
    }
    throw error;
  }

  return null;
}
