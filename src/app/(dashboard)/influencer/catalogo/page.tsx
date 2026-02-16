import { getProducts } from "@/lib/queries/products";
import { CatalogClient } from "./catalog-client";

export const metadata = {
  title: "Catálogo de productos",
};

export default async function CatalogPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | undefined>>;
}) {
  const params = await searchParams;
  const niche = params.nicho && params.nicho !== "all" ? params.nicho : undefined;
  const country =
    params.pais && params.pais !== "all" ? params.pais : undefined;
  const search = params.buscar || undefined;
  const page = params.pagina ? parseInt(params.pagina) : 1;

  const result = await getProducts({
    search,
    niche,
    country,
    page,
    limit: 24,
  });

  return <CatalogClient initialData={result} />;
}
