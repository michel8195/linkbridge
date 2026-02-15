"use server";

import { db } from "@/lib/db";
import { auth } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import type { Platform, ContentFormat } from "@prisma/client";

export async function curateProduct(data: {
  meliId: string;
  title: string;
  description?: string;
  price: number;
  currency: string;
  imageUrl?: string;
  categoryId?: string;
  categoryName?: string;
  permalink: string;
  niche: string[];
  commissionRate: number;
  country: string;
}) {
  const session = await auth();
  if (!session?.user?.id || session.user.role !== "ADMIN") {
    return { error: "No autorizado" };
  }

  const product = await db.product.upsert({
    where: { meliId: data.meliId },
    update: {
      title: data.title,
      description: data.description,
      price: data.price,
      currency: data.currency,
      imageUrl: data.imageUrl,
      categoryId: data.categoryId,
      categoryName: data.categoryName,
      permalink: data.permalink,
      niche: data.niche,
      commissionRate: data.commissionRate,
      country: data.country,
    },
    create: data,
  });

  revalidatePath("/admin/productos");
  return { data: product };
}

export async function toggleProductActive(productId: string) {
  const session = await auth();
  if (!session?.user?.id || session.user.role !== "ADMIN") {
    return { error: "No autorizado" };
  }

  const product = await db.product.findUnique({ where: { id: productId } });
  if (!product) return { error: "Producto no encontrado" };

  await db.product.update({
    where: { id: productId },
    data: { isActive: !product.isActive },
  });

  revalidatePath("/admin/productos");
  return { success: true };
}

export async function createContentTemplate(data: {
  title: string;
  description?: string;
  content: string;
  platform: Platform;
  format: ContentFormat;
  niche: string[];
}) {
  const session = await auth();
  if (!session?.user?.id || session.user.role !== "ADMIN") {
    return { error: "No autorizado" };
  }

  const template = await db.contentTemplate.create({ data });

  revalidatePath("/admin/plantillas");
  return { data: template };
}

export async function getPlatformStats() {
  const [
    totalUsers,
    totalInfluencers,
    totalSellers,
    totalProducts,
    totalCampaigns,
    totalClicks,
  ] = await Promise.all([
    db.user.count(),
    db.user.count({ where: { role: "INFLUENCER" } }),
    db.user.count({ where: { role: "SELLER" } }),
    db.product.count({ where: { isActive: true } }),
    db.campaign.count({ where: { status: "ACTIVE" } }),
    db.click.count(),
  ]);

  return {
    totalUsers,
    totalInfluencers,
    totalSellers,
    totalProducts,
    totalCampaigns,
    totalClicks,
  };
}
