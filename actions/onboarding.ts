"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { generateSlug } from "@/lib/utils";
import { redirect } from "next/navigation";
import { z } from "zod";

const schema = z.object({
  name: z
    .string()
    .min(2, "Nama toko minimal 2 karakter")
    .max(50, "Nama toko maksimal 50 karakter"),
});

export type OnboardingState = { error: string } | null;

export async function createOnboardingStore(
  _prev: OnboardingState,
  formData: FormData
): Promise<OnboardingState> {
  const session = await auth();
  if (!session?.user?.id) return { error: "Sesi tidak valid. Silakan login ulang." };

  const result = schema.safeParse({ name: formData.get("name") });
  if (!result.success) return { error: result.error.errors[0].message };

  const { name } = result.data;

  // Jika sudah punya toko, langsung ke dashboard
  const existing = await prisma.store.findUnique({
    where: { userId: session.user.id },
  });
  if (existing) redirect("/dashboard");

  // Generate slug unik — tambah suffix jika bentrok
  let slug = generateSlug(name);
  if (!slug) slug = "toko";
  let attempt = 0;
  while (await prisma.store.findUnique({ where: { slug } })) {
    attempt++;
    slug = `${generateSlug(name)}-${attempt}`;
  }

  await prisma.store.create({
    data: {
      name,
      slug,
      whatsapp: "",   // diisi nanti di pengaturan toko
      userId: session.user.id,
    },
  });

  redirect("/onboarding/success");
}
