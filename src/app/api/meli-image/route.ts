import { NextRequest, NextResponse } from "next/server";

const CACHE = new Map<string, { url: string; ts: number }>();
const CACHE_TTL = 1000 * 60 * 60 * 24; // 24h

const PLACEHOLDER =
  "https://http2.mlstatic.com/resources/frontend/statics/img-not-available/1.1.0/O.jpg";

export async function GET(request: NextRequest) {
  const meliId = request.nextUrl.searchParams.get("id");
  if (!meliId || !/^MLA\d+$/.test(meliId)) {
    return NextResponse.redirect(PLACEHOLDER);
  }

  // Check cache
  const cached = CACHE.get(meliId);
  if (cached && Date.now() - cached.ts < CACHE_TTL) {
    return NextResponse.redirect(cached.url);
  }

  // Build the product URL with dash format
  const dashId = meliId.replace(/^(MLA)(\d+)$/, "$1-$2");
  const productUrl = `https://articulo.mercadolibre.com.ar/${dashId}`;

  try {
    const res = await fetch(productUrl, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        Accept: "text/html",
        "Accept-Language": "es-AR,es;q=0.9",
      },
      redirect: "follow",
    });

    const html = await res.text();

    // Try multiple patterns to find image URL
    let imageUrl: string | null = null;

    // Pattern 1: og:image meta tag
    const ogMatch = html.match(
      /property="og:image"\s+content="([^"]+)"/
    );
    if (ogMatch) {
      imageUrl = ogMatch[1];
    }

    // Pattern 2: __PRELOADED_STATE__ JSON with thumbnail
    if (!imageUrl) {
      const thumbMatch = html.match(/"thumbnail":"(https:\/\/[^"]+)"/);
      if (thumbMatch) {
        imageUrl = thumbMatch[1];
      }
    }

    // Pattern 3: secure_url in pictures array
    if (!imageUrl) {
      const secureMatch = html.match(
        /"secure_url":"(https:\/\/http2\.mlstatic\.com\/D_NQ_NP_[^"]+)"/
      );
      if (secureMatch) {
        imageUrl = secureMatch[1];
      }
    }

    // Pattern 4: data-src or src with mlstatic product image
    if (!imageUrl) {
      const imgMatch = html.match(
        /(?:data-src|src)="(https:\/\/http2\.mlstatic\.com\/D_NQ_NP_[^"]+)"/
      );
      if (imgMatch) {
        imageUrl = imgMatch[1];
      }
    }

    if (imageUrl) {
      CACHE.set(meliId, { url: imageUrl, ts: Date.now() });
      return NextResponse.redirect(imageUrl);
    }
  } catch {
    // Fall through to placeholder
  }

  return NextResponse.redirect(PLACEHOLDER);
}
