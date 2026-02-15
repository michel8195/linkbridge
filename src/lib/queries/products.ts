import { db } from "@/lib/db";
import type { ProductFilters, PaginatedResult } from "@/types";
import type { Product } from "@prisma/client";

export async function getProducts(
  filters: ProductFilters = {}
): Promise<PaginatedResult<Product>> {
  const {
    search,
    niche,
    country,
    minPrice,
    maxPrice,
    minCommission,
    page = 1,
    limit = 20,
  } = filters;

  const where = {
    isActive: true,
    ...(search && {
      title: { contains: search, mode: "insensitive" as const },
    }),
    ...(niche && { niche: { has: niche } }),
    ...(country && { country }),
    ...(minPrice && { price: { gte: minPrice } }),
    ...(maxPrice && { price: { lte: maxPrice } }),
    ...(minCommission && { commissionRate: { gte: minCommission } }),
  };

  const [data, total] = await Promise.all([
    db.product.findMany({
      where,
      skip: (page - 1) * limit,
      take: limit,
      orderBy: { createdAt: "desc" },
    }),
    db.product.count({ where }),
  ]);

  return {
    data,
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
  };
}

export async function getProductById(id: string) {
  return db.product.findUnique({ where: { id } });
}

export async function getProductByMeliId(meliId: string) {
  return db.product.findUnique({ where: { meliId } });
}
