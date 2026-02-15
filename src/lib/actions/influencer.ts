"use server";

import { db } from "@/lib/db";
import { auth } from "@/lib/auth";
import { nanoid } from "nanoid";
import { revalidatePath } from "next/cache";

export async function generateAffiliateLink(productId: string) {
  const session = await auth();
  if (!session?.user?.id) {
    return { error: "No autenticado" };
  }

  const existing = await db.affiliateLink.findUnique({
    where: {
      userId_productId: {
        userId: session.user.id,
        productId,
      },
    },
  });

  if (existing) {
    return { data: existing };
  }

  const product = await db.product.findUnique({ where: { id: productId } });
  if (!product) {
    return { error: "Producto no encontrado" };
  }

  const shortCode = `lb_${nanoid(8)}`;

  const link = await db.affiliateLink.create({
    data: {
      userId: session.user.id,
      productId,
      shortCode,
      meliUrl: product.permalink,
    },
  });

  revalidatePath("/influencer/links");
  return { data: link };
}

export async function applyToCampaign(campaignId: string, message?: string) {
  const session = await auth();
  if (!session?.user?.id) {
    return { error: "No autenticado" };
  }

  const existing = await db.campaignParticipation.findUnique({
    where: {
      campaignId_userId: {
        campaignId,
        userId: session.user.id,
      },
    },
  });

  if (existing) {
    return { error: "Ya te postulaste a esta campana" };
  }

  await db.campaignParticipation.create({
    data: {
      campaignId,
      userId: session.user.id,
      message,
    },
  });

  revalidatePath("/influencer/campanas");
  return { success: true };
}

export async function getUserAffiliateLinks() {
  const session = await auth();
  if (!session?.user?.id) return [];

  return db.affiliateLink.findMany({
    where: { userId: session.user.id },
    include: {
      product: true,
      _count: { select: { clicks: true } },
    },
    orderBy: { createdAt: "desc" },
  });
}
