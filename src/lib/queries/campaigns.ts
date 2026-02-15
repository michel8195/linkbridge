import { db } from "@/lib/db";

export async function getActiveCampaigns() {
  return db.campaign.findMany({
    where: { status: "ACTIVE" },
    include: {
      seller: { include: { user: { select: { name: true } } } },
      products: { include: { product: true } },
      _count: { select: { participations: true } },
    },
    orderBy: { createdAt: "desc" },
  });
}

export async function getCampaignById(id: string) {
  return db.campaign.findUnique({
    where: { id },
    include: {
      seller: { include: { user: { select: { name: true } } } },
      products: { include: { product: true } },
      participations: {
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
              influencerProfile: {
                include: { socialLinks: true },
              },
            },
          },
        },
      },
    },
  });
}

export async function getSellerCampaigns(sellerId: string) {
  return db.campaign.findMany({
    where: { sellerId },
    include: {
      products: { include: { product: true } },
      _count: { select: { participations: true } },
    },
    orderBy: { createdAt: "desc" },
  });
}

export async function getUserParticipations(userId: string) {
  return db.campaignParticipation.findMany({
    where: { userId },
    include: {
      campaign: {
        include: {
          seller: { include: { user: { select: { name: true } } } },
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });
}
