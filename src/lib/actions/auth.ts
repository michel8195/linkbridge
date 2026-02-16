"use server";

import { signIn, signOut } from "@/lib/auth";
import { db } from "@/lib/db";
import bcrypt from "bcryptjs";
import { registerSchema, type RegisterInput } from "@/lib/validations/auth";
import { AuthError } from "next-auth";

export async function registerUser(data: RegisterInput) {
  const validated = registerSchema.safeParse(data);
  if (!validated.success) {
    return { error: "Datos invalidos" };
  }

  const { name, email, password } = validated.data;

  const existingUser = await db.user.findUnique({ where: { email } });
  if (existingUser) {
    return { error: "El email ya esta registrado" };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await db.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  return { success: true };
}

export async function loginWithCredentials(email: string, password: string) {
  try {
    await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    return { success: true };
  } catch (error) {
    if (error instanceof AuthError) {
      return { error: "Credenciales invalidas" };
    }
    throw error;
  }
}

export async function loginWithGoogle() {
  await signIn("google", { redirectTo: "/onboarding" });
}

export async function logout() {
  await signOut({ redirectTo: "/login" });
}

export async function completeOnboarding(
  userId: string,
  role: "INFLUENCER" | "SELLER",
  data: Record<string, unknown>
) {
  if (!userId) {
    return { error: "Usuario no identificado" };
  }

  try {
  if (role === "INFLUENCER") {
    const { bio, niche, country, city, socialLinks } = data as {
      bio: string;
      niche: string[];
      country: string;
      city?: string;
      socialLinks: {
        platform: string;
        url: string;
        username: string;
        followers: number;
      }[];
    };

    const totalReach = socialLinks.reduce(
      (sum, link) => sum + link.followers,
      0
    );

    await db.$transaction([
      db.user.update({
        where: { id: userId },
        data: { role: "INFLUENCER", onboarding: "COMPLETED" },
      }),
      db.influencerProfile.create({
        data: {
          userId,
          bio,
          niche,
          country,
          city,
          totalReach,
          socialLinks: {
            create: socialLinks.map((link) => ({
              platform: link.platform as "INSTAGRAM" | "TIKTOK" | "YOUTUBE" | "TWITTER" | "FACEBOOK",
              url: link.url,
              username: link.username,
              followers: link.followers,
            })),
          },
        },
      }),
    ]);
  } else {
    const { companyName, website, industry, country, description, meliSellerId } =
      data as {
        companyName: string;
        website?: string;
        industry: string;
        country: string;
        description: string;
        meliSellerId?: string;
      };

    await db.$transaction([
      db.user.update({
        where: { id: userId },
        data: { role: "SELLER", onboarding: "COMPLETED" },
      }),
      db.sellerProfile.create({
        data: {
          userId,
          companyName,
          website: website || null,
          industry,
          country,
          description,
          meliSellerId: meliSellerId || null,
        },
      }),
    ]);
  }

  return { success: true };
  } catch (error) {
    console.error("Error completing onboarding:", error);
    return { error: "Error al guardar el perfil. Intenta de nuevo." };
  }
}
