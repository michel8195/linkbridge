const MELI_API_BASE = "https://api.mercadolibre.com";

interface MeliSearchResult {
  id: string;
  title: string;
  price: number;
  currency_id: string;
  thumbnail: string;
  permalink: string;
  category_id: string;
}

interface MeliSearchResponse {
  results: MeliSearchResult[];
  paging: {
    total: number;
    offset: number;
    limit: number;
  };
}

interface MeliCategory {
  id: string;
  name: string;
}

export async function searchProducts(
  query: string,
  siteId: string = "MLA",
  offset: number = 0,
  limit: number = 20
): Promise<MeliSearchResponse> {
  const url = `${MELI_API_BASE}/sites/${siteId}/search?q=${encodeURIComponent(query)}&offset=${offset}&limit=${limit}`;

  const response = await fetch(url);
  if (!response.ok) throw new Error("Error al buscar productos en MeLi");

  return response.json();
}

export async function getProductDetails(itemId: string) {
  const response = await fetch(`${MELI_API_BASE}/items/${itemId}`);
  if (!response.ok) throw new Error("Error al obtener producto de MeLi");

  return response.json();
}

export async function getCategory(categoryId: string): Promise<MeliCategory> {
  const response = await fetch(
    `${MELI_API_BASE}/categories/${categoryId}`
  );
  if (!response.ok) throw new Error("Error al obtener categoria de MeLi");

  return response.json();
}

export async function getCategories(
  siteId: string = "MLA"
): Promise<MeliCategory[]> {
  const response = await fetch(
    `${MELI_API_BASE}/sites/${siteId}/categories`
  );
  if (!response.ok) throw new Error("Error al obtener categorias de MeLi");

  return response.json();
}

export function getSiteIdForCountry(
  country: string
): string {
  const siteMap: Record<string, string> = {
    AR: "MLA",
    MX: "MLM",
    CO: "MCO",
    CL: "MLC",
    BR: "MLB",
    UY: "MLU",
    PE: "MPE",
  };
  return siteMap[country] || "MLA";
}
