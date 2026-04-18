"use server";

import { prisma } from "@/lib/prisma";
import { signIn } from "@/lib/auth";
import { loginSchema, registerSchema } from "@/lib/validations";
import bcrypt from "bcryptjs";
import { AuthError } from "next-auth";

export type ActionState = { error: string } | null;

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
  await prisma.user.create({ data: { name, email, password: hashed } });

  try {
    await signIn("credentials", { email, password, redirectTo: "/dashboard" });
  } catch (error) {
    if (error instanceof AuthError) {
      return { error: "Akun berhasil dibuat. Silakan masuk." };
    }
    throw error;
  }

  return null;
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

  try {
    await signIn("credentials", {
      email: result.data.email,
      password: result.data.password,
      redirectTo: "/dashboard",
    });
  } catch (error) {
    if (error instanceof AuthError) {
      return { error: "Email atau password salah." };
    }
    throw error;
  }

  return null;
}
