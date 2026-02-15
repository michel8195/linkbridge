import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(request: NextRequest) {
  const shortCode = request.nextUrl.searchParams.get("c");

  if (!shortCode) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  try {
    const affiliateLink = await db.affiliateLink.findUnique({
      where: { shortCode },
    });

    if (!affiliateLink) {
      return NextResponse.redirect(new URL("/", request.url));
    }

    // Log the click asynchronously
    const headers = request.headers;
    const ipAddress =
      headers.get("x-forwarded-for")?.split(",")[0] ||
      headers.get("x-real-ip") ||
      "unknown";
    const userAgent = headers.get("user-agent") || "";
    const referer = headers.get("referer") || "";

    // Detect device type from user agent
    const isMobile = /Mobile|Android|iPhone/i.test(userAgent);
    const isTablet = /iPad|Tablet/i.test(userAgent);
    const device = isTablet ? "tablet" : isMobile ? "mobile" : "desktop";

    // Fire and forget — don't block the redirect
    db.click
      .create({
        data: {
          affiliateLinkId: affiliateLink.id,
          ipAddress,
          userAgent: userAgent.slice(0, 500),
          referer: referer.slice(0, 500),
          device,
        },
      })
      .catch(console.error);

    return NextResponse.redirect(affiliateLink.meliUrl, { status: 302 });
  } catch (error) {
    console.error("Click tracking error:", error);
    return NextResponse.redirect(new URL("/", request.url));
  }
}
