import NextAuth from "next-auth";
import authConfig from "@/lib/auth.config";

const { auth } = NextAuth(authConfig);

const publicRoutes = ["/", "/precios", "/como-funciona"];
const authRoutes = ["/login", "/registro"];

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);
  const isApiRoute = nextUrl.pathname.startsWith("/api");
  const isOnboardingRoute = nextUrl.pathname.startsWith("/onboarding");

  if (isApiRoute) return;

  if (isAuthRoute) {
    if (isLoggedIn) {
      const role = req.auth?.user?.role;
      const onboarding = req.auth?.user?.onboarding;

      if (onboarding === "PENDING") {
        return Response.redirect(new URL("/onboarding", nextUrl));
      }

      const dashboardUrl =
        role === "ADMIN"
          ? "/admin"
          : role === "SELLER"
            ? "/vendedor"
            : "/influencer";
      return Response.redirect(new URL(dashboardUrl, nextUrl));
    }
    return;
  }

  if (isPublicRoute) return;

  if (!isLoggedIn) {
    return Response.redirect(new URL("/login", nextUrl));
  }

  const role = req.auth?.user?.role;
  const onboarding = req.auth?.user?.onboarding;

  if (onboarding === "PENDING" && !isOnboardingRoute) {
    return Response.redirect(new URL("/onboarding", nextUrl));
  }

  if (onboarding === "COMPLETED" && isOnboardingRoute) {
    const dashboardUrl =
      role === "ADMIN"
        ? "/admin"
        : role === "SELLER"
          ? "/vendedor"
          : "/influencer";
    return Response.redirect(new URL(dashboardUrl, nextUrl));
  }

  // Role-based route protection
  if (nextUrl.pathname.startsWith("/influencer") && role !== "INFLUENCER") {
    return Response.redirect(new URL("/login", nextUrl));
  }
  if (nextUrl.pathname.startsWith("/vendedor") && role !== "SELLER") {
    return Response.redirect(new URL("/login", nextUrl));
  }
  if (nextUrl.pathname.startsWith("/admin") && role !== "ADMIN") {
    return Response.redirect(new URL("/login", nextUrl));
  }
});

export const config = {
  matcher: ["/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)"],
};
