import { describe, it, expect } from "vitest";
import { NICHES, COUNTRIES, PRICING_TIERS } from "../constants";

describe("NICHES", () => {
  it("contains expected niches", () => {
    expect(NICHES).toContain("Tecnologia");
    expect(NICHES).toContain("Moda");
    expect(NICHES).toContain("Gaming");
  });

  it("has 14 niches", () => {
    expect(NICHES).toHaveLength(14);
  });

  it("has no duplicates", () => {
    const uniqueNiches = new Set(NICHES);
    expect(uniqueNiches.size).toBe(NICHES.length);
  });
});

describe("COUNTRIES", () => {
  it("contains Argentina", () => {
    const ar = COUNTRIES.find((c) => c.code === "AR");
    expect(ar).toBeDefined();
    expect(ar?.name).toBe("Argentina");
    expect(ar?.currency).toBe("ARS");
  });

  it("has 7 countries", () => {
    expect(COUNTRIES).toHaveLength(7);
  });

  it("has unique country codes", () => {
    const codes = COUNTRIES.map((c) => c.code);
    expect(new Set(codes).size).toBe(codes.length);
  });

  it("all countries have code, name, and currency", () => {
    for (const country of COUNTRIES) {
      expect(country.code).toBeTruthy();
      expect(country.name).toBeTruthy();
      expect(country.currency).toBeTruthy();
    }
  });
});

describe("PRICING_TIERS", () => {
  it("has 3 tiers", () => {
    expect(PRICING_TIERS).toHaveLength(3);
  });

  it("has a free starter tier", () => {
    const starter = PRICING_TIERS.find((t) => t.name === "Starter");
    expect(starter).toBeDefined();
    expect(starter?.price).toBe("Gratis");
  });

  it("has exactly one highlighted tier", () => {
    const highlighted = PRICING_TIERS.filter((t) => t.highlighted);
    expect(highlighted).toHaveLength(1);
    expect(highlighted[0].name).toBe("Pro");
  });

  it("all tiers have required fields", () => {
    for (const tier of PRICING_TIERS) {
      expect(tier.name).toBeTruthy();
      expect(tier.price).toBeTruthy();
      expect(tier.description).toBeTruthy();
      expect(tier.cta).toBeTruthy();
      expect(tier.features.length).toBeGreaterThan(0);
    }
  });
});
