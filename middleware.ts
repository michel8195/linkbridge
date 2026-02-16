import NextAuth from "next-auth";
import authConfig from "@/lib/auth.config";

const { auth } = NextAuth(authConfig);

const publicRoutes = ["/", "/precios", "/como-funciona"];
const authRoutes = ["/login", "/registro"];

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

export default auth((req) => {
  const { nextUrl } = req;
  const pathname = nextUrl.pathname;
  const isLoggedIn = !!req.auth;
  const isPublicRoute = publicRoutes.includes(pathname);
  const isAuthRoute = authRoutes.includes(pathname);
  const isApiRoute = pathname.startsWith("/api");
  const isOnboardingRoute = pathname.startsWith("/onboarding");

  // Always allow API routes
  if (isApiRoute) return;

  // Auth routes: redirect logged-in users away
  if (isAuthRoute) {
    if (isLoggedIn) {
      const role = req.auth?.user?.role;
      const onboarding = req.auth?.user?.onboarding;

      if (onboarding === "PENDING") {
        return Response.redirect(new URL("/onboarding", nextUrl));
      }

      return Response.redirect(new URL(getDashboardUrl(role), nextUrl));
    }
    return;
  }

  // Public routes: always accessible
  if (isPublicRoute) {
    // If logged in and visiting landing, redirect to dashboard
    if (isLoggedIn && pathname === "/") {
      const role = req.auth?.user?.role;
      const onboarding = req.auth?.user?.onboarding;

      if (onboarding === "PENDING") {
        return Response.redirect(new URL("/onboarding", nextUrl));
      }

      return Response.redirect(new URL(getDashboardUrl(role), nextUrl));
    }
    return;
  }

  // Everything below requires authentication
  if (!isLoggedIn) {
    const callbackUrl = encodeURIComponent(pathname);
    return Response.redirect(
      new URL(`/login?callbackUrl=${callbackUrl}`, nextUrl)
    );
  }

  const role = req.auth?.user?.role;
  const onboarding = req.auth?.user?.onboarding;

  // Force onboarding for incomplete users
  if (onboarding === "PENDING" && !isOnboardingRoute) {
    return Response.redirect(new URL("/onboarding", nextUrl));
  }

  // Redirect completed users away from onboarding
  if (onboarding === "COMPLETED" && isOnboardingRoute) {
    return Response.redirect(new URL(getDashboardUrl(role), nextUrl));
  }

  // Role-based route protection (only if role is known)
  if (role) {
    const correctDashboard = getDashboardUrl(role);
    if (pathname.startsWith("/influencer") && role !== "INFLUENCER") {
      return Response.redirect(new URL(correctDashboard, nextUrl));
    }
    if (pathname.startsWith("/vendedor") && role !== "SELLER") {
      return Response.redirect(new URL(correctDashboard, nextUrl));
    }
    if (pathname.startsWith("/admin") && role !== "ADMIN") {
      return Response.redirect(new URL(correctDashboard, nextUrl));
    }
  }
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
  ],
};
