import { describe, it, expect } from "vitest";
import {
  loginSchema,
  registerSchema,
  influencerOnboardingSchema,
  sellerOnboardingSchema,
} from "../auth";

describe("loginSchema", () => {
  it("validates correct login data", () => {
    const result = loginSchema.safeParse({
      email: "test@example.com",
      password: "123456",
    });
    expect(result.success).toBe(true);
  });

  it("rejects invalid email", () => {
    const result = loginSchema.safeParse({
      email: "not-an-email",
      password: "123456",
    });
    expect(result.success).toBe(false);
  });

  it("rejects short password", () => {
    const result = loginSchema.safeParse({
      email: "test@example.com",
      password: "12345",
    });
    expect(result.success).toBe(false);
  });

  it("rejects empty fields", () => {
    const result = loginSchema.safeParse({ email: "", password: "" });
    expect(result.success).toBe(false);
  });
});

describe("registerSchema", () => {
  const validData = {
    name: "Test User",
    email: "test@example.com",
    password: "password123",
    confirmPassword: "password123",
  };

  it("validates correct registration data", () => {
    const result = registerSchema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  it("rejects mismatched passwords", () => {
    const result = registerSchema.safeParse({
      ...validData,
      confirmPassword: "different",
    });
    expect(result.success).toBe(false);
  });

  it("rejects short name", () => {
    const result = registerSchema.safeParse({
      ...validData,
      name: "A",
    });
    expect(result.success).toBe(false);
  });

  it("rejects invalid email", () => {
    const result = registerSchema.safeParse({
      ...validData,
      email: "bad-email",
    });
    expect(result.success).toBe(false);
  });

  it("rejects short password", () => {
    const result = registerSchema.safeParse({
      ...validData,
      password: "12345",
      confirmPassword: "12345",
    });
    expect(result.success).toBe(false);
  });
});

describe("influencerOnboardingSchema", () => {
  const validData = {
    bio: "This is a valid bio with enough characters",
    niche: ["Tecnologia"],
    country: "AR",
    city: "Buenos Aires",
    socialLinks: [
      {
        platform: "INSTAGRAM" as const,
        url: "https://instagram.com/test",
        username: "@test",
        followers: 1000,
      },
    ],
  };

  it("validates correct influencer data", () => {
    const result = influencerOnboardingSchema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  it("rejects too short bio", () => {
    const result = influencerOnboardingSchema.safeParse({
      ...validData,
      bio: "Short",
    });
    expect(result.success).toBe(false);
  });

  it("rejects too long bio", () => {
    const result = influencerOnboardingSchema.safeParse({
      ...validData,
      bio: "a".repeat(501),
    });
    expect(result.success).toBe(false);
  });

  it("rejects empty niche array", () => {
    const result = influencerOnboardingSchema.safeParse({
      ...validData,
      niche: [],
    });
    expect(result.success).toBe(false);
  });

  it("rejects missing country", () => {
    const result = influencerOnboardingSchema.safeParse({
      ...validData,
      country: "",
    });
    expect(result.success).toBe(false);
  });

  it("rejects empty socialLinks", () => {
    const result = influencerOnboardingSchema.safeParse({
      ...validData,
      socialLinks: [],
    });
    expect(result.success).toBe(false);
  });

  it("rejects invalid platform", () => {
    const result = influencerOnboardingSchema.safeParse({
      ...validData,
      socialLinks: [
        {
          platform: "INVALID",
          url: "https://example.com",
          username: "@test",
          followers: 100,
        },
      ],
    });
    expect(result.success).toBe(false);
  });

  it("allows optional city", () => {
    const { city, ...dataWithoutCity } = validData;
    const result = influencerOnboardingSchema.safeParse(dataWithoutCity);
    expect(result.success).toBe(true);
  });

  it("validates multiple niches", () => {
    const result = influencerOnboardingSchema.safeParse({
      ...validData,
      niche: ["Tecnologia", "Gaming", "Moda"],
    });
    expect(result.success).toBe(true);
  });

  it("rejects negative followers", () => {
    const result = influencerOnboardingSchema.safeParse({
      ...validData,
      socialLinks: [
        {
          platform: "INSTAGRAM",
          url: "https://instagram.com/test",
          username: "@test",
          followers: -1,
        },
      ],
    });
    expect(result.success).toBe(false);
  });
});

describe("sellerOnboardingSchema", () => {
  const validData = {
    companyName: "TechStore AR",
    website: "https://techstore.com.ar",
    industry: "Tecnologia",
    country: "AR",
    description: "We sell technology products and gadgets.",
    meliSellerId: "123456789",
  };

  it("validates correct seller data", () => {
    const result = sellerOnboardingSchema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  it("rejects short company name", () => {
    const result = sellerOnboardingSchema.safeParse({
      ...validData,
      companyName: "A",
    });
    expect(result.success).toBe(false);
  });

  it("rejects invalid website URL", () => {
    const result = sellerOnboardingSchema.safeParse({
      ...validData,
      website: "not-a-url",
    });
    expect(result.success).toBe(false);
  });

  it("allows empty website", () => {
    const result = sellerOnboardingSchema.safeParse({
      ...validData,
      website: "",
    });
    expect(result.success).toBe(true);
  });

  it("allows missing website", () => {
    const { website, ...dataWithoutWebsite } = validData;
    const result = sellerOnboardingSchema.safeParse(dataWithoutWebsite);
    expect(result.success).toBe(true);
  });

  it("rejects too short description", () => {
    const result = sellerOnboardingSchema.safeParse({
      ...validData,
      description: "Short",
    });
    expect(result.success).toBe(false);
  });

  it("rejects too long description", () => {
    const result = sellerOnboardingSchema.safeParse({
      ...validData,
      description: "a".repeat(1001),
    });
    expect(result.success).toBe(false);
  });

  it("allows optional meliSellerId", () => {
    const { meliSellerId, ...dataWithoutMeli } = validData;
    const result = sellerOnboardingSchema.safeParse(dataWithoutMeli);
    expect(result.success).toBe(true);
  });
});
