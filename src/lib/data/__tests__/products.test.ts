import { describe, it, expect } from "vitest";
import {
  PRODUCT_CATALOG,
  getProductsByNiche,
  getNicheStats,
} from "../products";
import { NICHES } from "@/lib/constants";

describe("PRODUCT_CATALOG", () => {
  it("has 166 products", () => {
    expect(PRODUCT_CATALOG).toHaveLength(166);
  });

  it("all products have required fields", () => {
    for (const product of PRODUCT_CATALOG) {
      expect(product.meliId).toBeTruthy();
      expect(product.title).toBeTruthy();
      expect(product.price).toBeGreaterThan(0);
      expect(product.currency).toBeTruthy();
      expect(product.niche).toBeTruthy();
      expect(product.niche.length).toBeGreaterThan(0);
      expect(product.commissionRate).toBeGreaterThanOrEqual(0);
      expect(product.commissionRate).toBeLessThanOrEqual(100);
      expect(product.country).toBeTruthy();
    }
  });

  it("all products have unique meliIds", () => {
    const ids = PRODUCT_CATALOG.map((p) => p.meliId);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("all niches have a description", () => {
    for (const product of PRODUCT_CATALOG) {
      expect(product.description).toBeTruthy();
      expect(product.description.length).toBeGreaterThan(5);
    }
  });

  it("uses valid niche names", () => {
    const validNiches = new Set(NICHES);
    for (const product of PRODUCT_CATALOG) {
      for (const niche of product.niche) {
        expect(validNiches.has(niche as typeof NICHES[number])).toBe(true);
      }
    }
  });
});

describe("getProductsByNiche", () => {
  it("returns products for a specific niche", () => {
    const techProducts = getProductsByNiche("Tecnologia");
    expect(techProducts.length).toBeGreaterThan(0);
    for (const product of techProducts) {
      expect(product.niche).toContain("Tecnologia");
    }
  });

  it("returns empty array for non-existent niche", () => {
    const products = getProductsByNiche("NonExistent");
    expect(products).toHaveLength(0);
  });
});

describe("getNicheStats", () => {
  it("returns stats for all niches with products", () => {
    const stats = getNicheStats();
    expect(Object.keys(stats).length).toBeGreaterThan(0);
  });

  it("each niche has at least 10 products", () => {
    const stats = getNicheStats();
    for (const [niche, stat] of Object.entries(stats)) {
      expect(stat.count).toBeGreaterThanOrEqual(10);
    }
  });

  it("total products across niches may exceed 166 due to multi-niche", () => {
    const stats = getNicheStats();
    const total = Object.values(stats).reduce((sum, stat) => sum + stat.count, 0);
    expect(total).toBeGreaterThanOrEqual(166);
  });

  it("average commission is reasonable", () => {
    const stats = getNicheStats();
    for (const [niche, stat] of Object.entries(stats)) {
      expect(stat.avgCommission).toBeGreaterThan(0);
      expect(stat.avgCommission).toBeLessThanOrEqual(25);
    }
  });
});
