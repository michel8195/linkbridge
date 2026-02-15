import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  // Create admin user
  const adminPassword = await bcrypt.hash("admin123", 10);
  const admin = await prisma.user.upsert({
    where: { email: "admin@linkbridge.lat" },
    update: {},
    create: {
      name: "Admin LinkBridge",
      email: "admin@linkbridge.lat",
      password: adminPassword,
      role: "ADMIN",
      onboarding: "COMPLETED",
    },
  });
  console.log("Admin user created:", admin.email);

  // Create influencer user
  const influencerPassword = await bcrypt.hash("influencer123", 10);
  const influencer = await prisma.user.upsert({
    where: { email: "maria@email.com" },
    update: {},
    create: {
      name: "Maria Garcia",
      email: "maria@email.com",
      password: influencerPassword,
      role: "INFLUENCER",
      onboarding: "COMPLETED",
    },
  });

  await prisma.influencerProfile.upsert({
    where: { userId: influencer.id },
    update: {},
    create: {
      userId: influencer.id,
      bio: "Content creator apasionada por la tecnologia y la moda.",
      niche: ["Tecnologia", "Moda"],
      country: "AR",
      city: "Buenos Aires",
      totalReach: 25000,
      socialLinks: {
        create: [
          {
            platform: "INSTAGRAM",
            url: "https://instagram.com/mariagarcia",
            username: "@mariagarcia",
            followers: 20000,
          },
          {
            platform: "TIKTOK",
            url: "https://tiktok.com/@mariagarcia",
            username: "@mariagarcia",
            followers: 5000,
          },
        ],
      },
    },
  });
  console.log("Influencer user created:", influencer.email);

  // Create seller user
  const sellerPassword = await bcrypt.hash("seller123", 10);
  const seller = await prisma.user.upsert({
    where: { email: "info@techstore.com.ar" },
    update: {},
    create: {
      name: "TechStore AR",
      email: "info@techstore.com.ar",
      password: sellerPassword,
      role: "SELLER",
      onboarding: "COMPLETED",
    },
  });

  const sellerProfile = await prisma.sellerProfile.upsert({
    where: { userId: seller.id },
    update: {},
    create: {
      userId: seller.id,
      companyName: "TechStore AR",
      website: "https://techstore.com.ar",
      industry: "Tecnologia",
      country: "AR",
      description: "Tienda online de tecnologia y gadgets.",
      meliSellerId: "123456789",
    },
  });
  console.log("Seller user created:", seller.email);

  // Create products
  const products = await Promise.all([
    prisma.product.upsert({
      where: { meliId: "MLA123456" },
      update: {},
      create: {
        meliId: "MLA123456",
        title: "Auriculares Bluetooth TWS con Cancelacion de Ruido Activa",
        description: "Auriculares inalambricos de alta calidad.",
        price: 15999,
        currency: "ARS",
        permalink: "https://www.mercadolibre.com.ar/auriculares",
        niche: ["Tecnologia"],
        commissionRate: 8,
        country: "AR",
      },
    }),
    prisma.product.upsert({
      where: { meliId: "MLA234567" },
      update: {},
      create: {
        meliId: "MLA234567",
        title: "Smartwatch Deportivo Resistente al Agua IP68",
        description: "Reloj inteligente con funciones deportivas.",
        price: 22500,
        currency: "ARS",
        permalink: "https://www.mercadolibre.com.ar/smartwatch",
        niche: ["Tecnologia", "Deportes"],
        commissionRate: 10,
        country: "AR",
      },
    }),
    prisma.product.upsert({
      where: { meliId: "MLA345678" },
      update: {},
      create: {
        meliId: "MLA345678",
        title: "Teclado Mecanico RGB Gaming 60%",
        description: "Teclado mecanico compacto para gaming.",
        price: 28900,
        currency: "ARS",
        permalink: "https://www.mercadolibre.com.ar/teclado",
        niche: ["Tecnologia", "Gaming"],
        commissionRate: 7,
        country: "AR",
      },
    }),
  ]);
  console.log(`${products.length} products created`);

  // Create a campaign
  const campaign = await prisma.campaign.upsert({
    where: { id: "seed-campaign-1" },
    update: {},
    create: {
      id: "seed-campaign-1",
      sellerId: sellerProfile.id,
      title: "Tech Summer 2025",
      description: "Promociona los mejores gadgets de verano.",
      budget: 500000,
      commissionRate: 12,
      status: "ACTIVE",
      startDate: new Date("2025-01-01"),
      endDate: new Date("2025-03-31"),
      targetNiches: ["Tecnologia", "Gaming"],
      targetCountries: ["AR"],
      targetPlatforms: ["INSTAGRAM", "TIKTOK"],
      products: {
        create: products.map((p) => ({ productId: p.id })),
      },
    },
  });
  console.log("Campaign created:", campaign.title);

  // Create content templates
  await prisma.contentTemplate.createMany({
    skipDuplicates: true,
    data: [
      {
        title: "Review de producto - Story",
        content:
          "Estuve probando [PRODUCTO] y tengo que contarles...\n\n[BENEFICIO 1]\n[BENEFICIO 2]\n\nPrecio: [PRECIO]\nLink en bio",
        platform: "INSTAGRAM",
        format: "STORY",
        niche: ["Tecnologia"],
      },
      {
        title: "Unboxing Reel",
        content:
          "UNBOXING TIME!\n\nLes muestro lo que me llego de MercadoLibre\n\n[PRODUCTO] - [PRECIO]\n\nLink en mi bio",
        platform: "INSTAGRAM",
        format: "REEL",
        niche: ["Tecnologia", "Moda"],
      },
      {
        title: "Video review TikTok",
        content:
          "POV: Encontraste el mejor [CATEGORIA] en MercadoLibre\n\n[PRODUCTO]\n[PRECIO]\n\nVeredicto: [CALIFICACION]/10",
        platform: "TIKTOK",
        format: "VIDEO",
        niche: ["Tecnologia", "Gaming"],
      },
    ],
  });
  console.log("Content templates created");

  console.log("Seed completed successfully!");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
