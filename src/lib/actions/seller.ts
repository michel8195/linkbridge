"use server";

import { db } from "@/lib/db";
import { auth } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import type { CampaignStatus, Platform } from "@prisma/client";

interface CreateCampaignInput {
  title: string;
  description?: string;
  budget: number;
  commissionRate: number;
  startDate?: string;
  endDate?: string;
  targetNiches: string[];
  targetCountries: string[];
  targetPlatforms: string[];
  minFollowers: number;
  maxFollowers: number;
  productIds: string[];
}

export async function createCampaign(data: CreateCampaignInput) {
  const session = await auth();
  if (!session?.user?.id) {
    return { error: "No autenticado" };
  }

  const sellerProfile = await db.sellerProfile.findUnique({
    where: { userId: session.user.id },
  });

  if (!sellerProfile) {
    return { error: "Perfil de vendedor no encontrado" };
  }

  const campaign = await db.campaign.create({
    data: {
      sellerId: sellerProfile.id,
      title: data.title,
      description: data.description,
      budget: data.budget,
      commissionRate: data.commissionRate,
      startDate: data.startDate ? new Date(data.startDate) : null,
      endDate: data.endDate ? new Date(data.endDate) : null,
      targetNiches: data.targetNiches,
      targetCountries: data.targetCountries,
      targetPlatforms: data.targetPlatforms as Platform[],
      minFollowers: data.minFollowers,
      maxFollowers: data.maxFollowers,
      products: {
        create: data.productIds.map((productId) => ({
          productId,
        })),
      },
    },
  });

  revalidatePath("/vendedor/campanas");
  return { data: campaign };
}

export async function updateCampaignStatus(
  campaignId: string,
  status: CampaignStatus
) {
  const session = await auth();
  if (!session?.user?.id) {
    return { error: "No autenticado" };
  }

  await db.campaign.update({
    where: { id: campaignId },
    data: { status },
  });

  revalidatePath("/vendedor/campanas");
  return { success: true };
}

export async function updateParticipationStatus(
  participationId: string,
  status: "APPROVED" | "REJECTED"
) {
  const session = await auth();
  if (!session?.user?.id) {
    return { error: "No autenticado" };
  }

  await db.campaignParticipation.update({
    where: { id: participationId },
    data: { status },
  });

  revalidatePath("/vendedor/campanas");
  return { success: true };
}
