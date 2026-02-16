import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { PRODUCT_CATALOG } from "../src/lib/data/products";

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

  // Seed all 163 products from curated catalog
  console.log(`Seeding ${PRODUCT_CATALOG.length} curated products...`);

  let productCount = 0;
  const productIds: string[] = [];

  for (const product of PRODUCT_CATALOG) {
    const created = await prisma.product.upsert({
      where: { meliId: product.meliId },
      update: {
        title: product.title,
        price: product.price,
        commissionRate: product.commissionRate,
        niche: product.niche,
        description: product.description,
        imageUrl: product.imageUrl || null,
        permalink: product.permalink || `https://articulo.mercadolibre.com.ar/${product.meliId.replace(/^(MLA)(\d+)$/, '$1-$2')}-_JM`,
      },
      create: {
        meliId: product.meliId,
        title: product.title,
        description: product.description,
        price: product.price,
        currency: product.currency,
        permalink: product.permalink || `https://articulo.mercadolibre.com.ar/${product.meliId.replace(/^(MLA)(\d+)$/, '$1-$2')}-_JM`,
        imageUrl: product.imageUrl || null,
        niche: product.niche,
        commissionRate: product.commissionRate,
        country: product.country,
      },
    });
    productIds.push(created.id);
    productCount++;
  }

  console.log(`${productCount} products seeded`);

  // Create a campaign with some tech products
  const techProductIds = productIds.slice(0, 5); // First 5 tech products
  const campaign = await prisma.campaign.upsert({
    where: { id: "seed-campaign-1" },
    update: {},
    create: {
      id: "seed-campaign-1",
      sellerId: sellerProfile.id,
      title: "Tech Summer 2026",
      description:
        "Promociona los mejores gadgets de verano. Buscamos influencers de tecnologia y gaming para generar contenido autentico.",
      budget: 500000,
      commissionRate: 12,
      status: "ACTIVE",
      startDate: new Date("2026-01-01"),
      endDate: new Date("2026-03-31"),
      targetNiches: ["Tecnologia", "Gaming"],
      targetCountries: ["AR"],
      targetPlatforms: ["INSTAGRAM", "TIKTOK"],
      products: {
        create: techProductIds.map((id) => ({ productId: id })),
      },
    },
  });
  console.log("Campaign created:", campaign.title);

  // Create content templates for multiple niches
  await prisma.contentTemplate.createMany({
    skipDuplicates: true,
    data: [
      {
        title: "Review de producto - Story",
        content:
          "Estuve probando [PRODUCTO] y tengo que contarles...\n\n✅ [BENEFICIO 1]\n✅ [BENEFICIO 2]\n✅ [BENEFICIO 3]\n\n💰 Precio: [PRECIO]\n🔗 Link en bio",
        platform: "INSTAGRAM",
        format: "STORY",
        niche: ["Tecnologia"],
      },
      {
        title: "Unboxing Reel",
        content:
          "📦 UNBOXING TIME!\n\nLes muestro lo que me llego de MercadoLibre\n\n[PRODUCTO] - [PRECIO]\n\n¿Lo conocían? Cuéntenme en los comentarios\n\n🔗 Link en mi bio",
        platform: "INSTAGRAM",
        format: "REEL",
        niche: ["Tecnologia", "Moda"],
      },
      {
        title: "Video review TikTok",
        content:
          "POV: Encontraste el mejor [CATEGORIA] en MercadoLibre\n\n[PRODUCTO]\n💰 [PRECIO]\n\nVeredicto: [CALIFICACION]/10\n\n#mercadolibre #review #[CATEGORIA]",
        platform: "TIKTOK",
        format: "VIDEO",
        niche: ["Tecnologia", "Gaming"],
      },
      {
        title: "Top 3 recomendados - Carousel",
        content:
          "TOP 3 [CATEGORIA] que recomiendo 🏆\n\n1️⃣ [PRODUCTO 1] - [PRECIO 1]\n2️⃣ [PRODUCTO 2] - [PRECIO 2]\n3️⃣ [PRODUCTO 3] - [PRECIO 3]\n\n¿Cuál elegirían? 👇\n\n🔗 Links en bio",
        platform: "INSTAGRAM",
        format: "CAROUSEL",
        niche: ["Belleza", "Hogar", "Cocina"],
      },
      {
        title: "Rutina de skincare - Reel",
        content:
          "Mi rutina de skincare paso a paso ✨\n\n1. Limpieza\n2. [PRODUCTO 1]\n3. [PRODUCTO 2]\n4. Protector solar\n\nTodos los productos en mi bio 🔗\n\n#skincare #belleza #rutina",
        platform: "INSTAGRAM",
        format: "REEL",
        niche: ["Belleza", "Salud"],
      },
      {
        title: "Outfit del día - Story",
        content:
          "OOTD 🖤\n\n👕 [PRENDA 1] - [PRECIO]\n👖 [PRENDA 2] - [PRECIO]\n👟 [CALZADO] - [PRECIO]\n\nTodo de MercadoLibre\n🔗 Link en bio",
        platform: "INSTAGRAM",
        format: "STORY",
        niche: ["Moda"],
      },
      {
        title: "Setup gaming tour - Video",
        content:
          "SETUP TOUR 2026 🎮\n\n🖥️ Monitor: [PRODUCTO]\n⌨️ Teclado: [PRODUCTO]\n🖱️ Mouse: [PRODUCTO]\n🎧 Auriculares: [PRODUCTO]\n\nTodo en MercadoLibre, links en bio",
        platform: "TIKTOK",
        format: "VIDEO",
        niche: ["Gaming", "Tecnologia"],
      },
      {
        title: "Haul de compras - Reel",
        content:
          "HAUL DE MERCADOLIBRE 🛍️\n\nMe compré estas cosas y no me arrepiento:\n\n1. [PRODUCTO 1] - $[PRECIO]\n2. [PRODUCTO 2] - $[PRECIO]\n3. [PRODUCTO 3] - $[PRECIO]\n\nTodo original ✅ Links en bio",
        platform: "INSTAGRAM",
        format: "REEL",
        niche: ["Moda", "Belleza", "Hogar"],
      },
    ],
  });
  console.log("Content templates created");

  console.log("Seed completed successfully!");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
