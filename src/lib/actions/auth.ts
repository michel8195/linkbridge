"use server";

import { signIn, signOut } from "@/lib/auth";
import { db } from "@/lib/db";
import bcrypt from "bcryptjs";
import { registerSchema, type RegisterInput } from "@/lib/validations/auth";
import { AuthError } from "next-auth";
import { logger } from "@/lib/logger";

export async function registerUser(data: RegisterInput) {
  const validated = registerSchema.safeParse(data);
  if (!validated.success) {
    logger.warn("Registration validation failed", "auth", {
      errors: validated.error.flatten().fieldErrors,
    });
    return { error: "Datos invalidos" };
  }

  const { name, email, password } = validated.data;

  try {
    const existingUser = await db.user.findUnique({ where: { email } });
    if (existingUser) {
      logger.info("Registration attempt with existing email", "auth", {
        email,
      });
      return { error: "El email ya esta registrado" };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await db.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    logger.info("User registered successfully", "auth", {
      userId: user.id,
      email,
    });
    return { success: true };
  } catch (error) {
    logger.error("Registration failed", "auth", { email }, error);
    return { error: "Error al crear la cuenta. Intenta de nuevo." };
  }
}

export async function loginWithCredentials(email: string, password: string) {
  try {
    await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    logger.info("User logged in", "auth", { email });
    return { success: true };
  } catch (error) {
    if (error instanceof AuthError) {
      logger.warn("Login failed - invalid credentials", "auth", { email });
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
    logger.warn("Onboarding attempted without userId", "auth");
    return { error: "Usuario no identificado" };
  }

  try {
    // Verify user exists and hasn't already completed onboarding
    const user = await db.user.findUnique({ where: { id: userId } });
    if (!user) {
      logger.error("Onboarding for non-existent user", "auth", { userId });
      return { error: "Usuario no encontrado" };
    }

    if (user.onboarding === "COMPLETED") {
      logger.warn("Onboarding already completed", "auth", { userId });
      return { success: true };
    }

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
                platform: link.platform as
                  | "INSTAGRAM"
                  | "TIKTOK"
                  | "YOUTUBE"
                  | "TWITTER"
                  | "FACEBOOK",
                url: link.url,
                username: link.username,
                followers: link.followers,
              })),
            },
          },
        }),
      ]);

      logger.info("Influencer onboarding completed", "auth", {
        userId,
        niche,
        totalReach,
      });
    } else {
      const {
        companyName,
        website,
        industry,
        country,
        description,
        meliSellerId,
      } = data as {
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

      logger.info("Seller onboarding completed", "auth", {
        userId,
        companyName,
      });
    }

    return { success: true };
  } catch (error) {
    logger.error("Onboarding failed", "auth", { userId, role }, error);
    return { error: "Error al guardar el perfil. Intenta de nuevo." };
  }
}
