import { describe, it, expect } from "vitest";

// Test the middleware routing logic as pure functions
// We extract the logic to test without requiring NextAuth runtime

function getDashboardUrl(role: string | undefined): string {
  switch (role) {
    case "ADMIN":
      return "/admin";
    case "SELLER":
      return "/vendedor";
    default:
      return "/influencer";
  }
}

const publicRoutes = ["/", "/precios", "/como-funciona"];
const authRoutes = ["/login", "/registro"];

type RouteDecision =
  | { action: "allow" }
  | { action: "redirect"; to: string };

function resolveRoute(
  pathname: string,
  isLoggedIn: boolean,
  role?: string,
  onboarding?: string
): RouteDecision {
  const isPublicRoute = publicRoutes.includes(pathname);
  const isAuthRoute = authRoutes.includes(pathname);
  const isApiRoute = pathname.startsWith("/api");
  const isOnboardingRoute = pathname.startsWith("/onboarding");

  if (isApiRoute) return { action: "allow" };

  if (isAuthRoute) {
    if (isLoggedIn) {
      if (onboarding === "PENDING") {
        return { action: "redirect", to: "/onboarding" };
      }
      return { action: "redirect", to: getDashboardUrl(role) };
    }
    return { action: "allow" };
  }

  if (isPublicRoute) {
    if (isLoggedIn && pathname === "/") {
      if (onboarding === "PENDING") {
        return { action: "redirect", to: "/onboarding" };
      }
      return { action: "redirect", to: getDashboardUrl(role) };
    }
    return { action: "allow" };
  }

  if (!isLoggedIn) {
    return { action: "redirect", to: `/login?callbackUrl=${encodeURIComponent(pathname)}` };
  }

  if (onboarding === "PENDING" && !isOnboardingRoute) {
    return { action: "redirect", to: "/onboarding" };
  }

  if (onboarding === "COMPLETED" && isOnboardingRoute) {
    return { action: "redirect", to: getDashboardUrl(role) };
  }

  // Role-based route protection (only if role is known)
  if (role) {
    const correctDashboard = getDashboardUrl(role);
    if (pathname.startsWith("/influencer") && role !== "INFLUENCER") {
      return { action: "redirect", to: correctDashboard };
    }
    if (pathname.startsWith("/vendedor") && role !== "SELLER") {
      return { action: "redirect", to: correctDashboard };
    }
    if (pathname.startsWith("/admin") && role !== "ADMIN") {
      return { action: "redirect", to: correctDashboard };
    }
  }

  return { action: "allow" };
}

describe("getDashboardUrl", () => {
  it("returns /admin for ADMIN role", () => {
    expect(getDashboardUrl("ADMIN")).toBe("/admin");
  });

  it("returns /vendedor for SELLER role", () => {
    expect(getDashboardUrl("SELLER")).toBe("/vendedor");
  });

  it("returns /influencer for INFLUENCER role", () => {
    expect(getDashboardUrl("INFLUENCER")).toBe("/influencer");
  });

  it("defaults to /influencer for undefined role", () => {
    expect(getDashboardUrl(undefined)).toBe("/influencer");
  });
});

describe("edge case: undefined role/onboarding (auth.config.ts missing callbacks)", () => {
  it("should NOT create redirect loops when role is undefined", () => {
    // This was the actual bug: auth.config.ts had no callbacks,
    // so role/onboarding were undefined in the middleware.
    // getDashboardUrl(undefined) returns "/influencer",
    // but the role check `role !== 'INFLUENCER'` was true (undefined !== 'INFLUENCER'),
    // causing an infinite redirect to /influencer.
    const result = resolveRoute("/influencer", true, undefined, undefined);
    // With undefined role, it should allow access (default to influencer)
    expect(result).toEqual({ action: "allow" });
  });

  it("should handle undefined onboarding gracefully", () => {
    const result = resolveRoute("/influencer", true, "INFLUENCER", undefined);
    expect(result).toEqual({ action: "allow" });
  });
});

describe("middleware routing logic", () => {
  describe("unauthenticated users", () => {
    it("allows access to landing page", () => {
      expect(resolveRoute("/", false)).toEqual({ action: "allow" });
    });

    it("allows access to public routes", () => {
      expect(resolveRoute("/precios", false)).toEqual({ action: "allow" });
      expect(resolveRoute("/como-funciona", false)).toEqual({
        action: "allow",
      });
    });

    it("allows access to auth routes", () => {
      expect(resolveRoute("/login", false)).toEqual({ action: "allow" });
      expect(resolveRoute("/registro", false)).toEqual({ action: "allow" });
    });

    it("redirects to login for protected routes", () => {
      const result = resolveRoute("/influencer", false);
      expect(result.action).toBe("redirect");
      if (result.action === "redirect") {
        expect(result.to).toContain("/login");
      }
    });

    it("includes callbackUrl in redirect", () => {
      const result = resolveRoute("/influencer/catalogo", false);
      expect(result.action).toBe("redirect");
      if (result.action === "redirect") {
        expect(result.to).toContain("callbackUrl");
        expect(result.to).toContain("influencer");
      }
    });

    it("allows API routes", () => {
      expect(resolveRoute("/api/auth/callback/google", false)).toEqual({
        action: "allow",
      });
    });
  });

  describe("authenticated users with PENDING onboarding", () => {
    it("redirects from auth routes to onboarding", () => {
      expect(resolveRoute("/login", true, "INFLUENCER", "PENDING")).toEqual({
        action: "redirect",
        to: "/onboarding",
      });
      expect(resolveRoute("/registro", true, "INFLUENCER", "PENDING")).toEqual({
        action: "redirect",
        to: "/onboarding",
      });
    });

    it("redirects from landing to onboarding", () => {
      expect(resolveRoute("/", true, "INFLUENCER", "PENDING")).toEqual({
        action: "redirect",
        to: "/onboarding",
      });
    });

    it("allows access to onboarding page", () => {
      expect(
        resolveRoute("/onboarding", true, "INFLUENCER", "PENDING")
      ).toEqual({ action: "allow" });
    });

    it("redirects from dashboard to onboarding", () => {
      expect(
        resolveRoute("/influencer", true, "INFLUENCER", "PENDING")
      ).toEqual({ action: "redirect", to: "/onboarding" });
    });
  });

  describe("authenticated users with COMPLETED onboarding", () => {
    it("redirects from auth routes to correct dashboard", () => {
      expect(
        resolveRoute("/login", true, "INFLUENCER", "COMPLETED")
      ).toEqual({ action: "redirect", to: "/influencer" });
      expect(resolveRoute("/login", true, "SELLER", "COMPLETED")).toEqual({
        action: "redirect",
        to: "/vendedor",
      });
      expect(resolveRoute("/login", true, "ADMIN", "COMPLETED")).toEqual({
        action: "redirect",
        to: "/admin",
      });
    });

    it("redirects from onboarding to dashboard", () => {
      expect(
        resolveRoute("/onboarding", true, "INFLUENCER", "COMPLETED")
      ).toEqual({ action: "redirect", to: "/influencer" });
    });

    it("allows access to matching role dashboard", () => {
      expect(
        resolveRoute("/influencer", true, "INFLUENCER", "COMPLETED")
      ).toEqual({ action: "allow" });
      expect(
        resolveRoute("/vendedor", true, "SELLER", "COMPLETED")
      ).toEqual({ action: "allow" });
      expect(
        resolveRoute("/admin", true, "ADMIN", "COMPLETED")
      ).toEqual({ action: "allow" });
    });

    it("redirects from wrong role dashboard", () => {
      expect(
        resolveRoute("/admin", true, "INFLUENCER", "COMPLETED")
      ).toEqual({ action: "redirect", to: "/influencer" });
      expect(
        resolveRoute("/influencer", true, "SELLER", "COMPLETED")
      ).toEqual({ action: "redirect", to: "/vendedor" });
      expect(
        resolveRoute("/vendedor", true, "ADMIN", "COMPLETED")
      ).toEqual({ action: "redirect", to: "/admin" });
    });

    it("allows nested dashboard routes for correct role", () => {
      expect(
        resolveRoute("/influencer/catalogo", true, "INFLUENCER", "COMPLETED")
      ).toEqual({ action: "allow" });
      expect(
        resolveRoute(
          "/vendedor/campanas/nueva",
          true,
          "SELLER",
          "COMPLETED"
        )
      ).toEqual({ action: "allow" });
    });

    it("redirects from landing to dashboard", () => {
      expect(resolveRoute("/", true, "INFLUENCER", "COMPLETED")).toEqual({
        action: "redirect",
        to: "/influencer",
      });
    });
  });
});
