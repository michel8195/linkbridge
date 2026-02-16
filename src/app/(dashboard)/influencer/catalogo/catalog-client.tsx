"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search, SlidersHorizontal, ChevronLeft, ChevronRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { ProductCard } from "@/components/influencer/product-card";
import { NICHES, COUNTRIES } from "@/lib/constants";
import type { Product } from "@prisma/client";
import type { PaginatedResult } from "@/types";

interface CatalogClientProps {
  initialData: PaginatedResult<Product>;
}

export function CatalogClient({ initialData }: CatalogClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [search, setSearch] = useState(searchParams.get("buscar") || "");
  const [showFilters, setShowFilters] = useState(false);

  const currentNiche = searchParams.get("nicho") || "all";
  const currentCountry = searchParams.get("pais") || "all";

  function updateParams(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (value === "all" || value === "") {
      params.delete(key);
    } else {
      params.set(key, value);
    }
    params.delete("pagina");
    router.push(`/influencer/catalogo?${params.toString()}`);
  }

  function handleSearch() {
    updateParams("buscar", search);
  }

  function goToPage(page: number) {
    const params = new URLSearchParams(searchParams.toString());
    if (page <= 1) {
      params.delete("pagina");
    } else {
      params.set("pagina", page.toString());
    }
    router.push(`/influencer/catalogo?${params.toString()}`);
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Catalogo de productos</h1>
        <p className="text-muted-foreground">
          Explora {initialData.total} productos curados de MercadoLibre y genera
          tus links de afiliado
        </p>
      </div>

      {/* Niche quick filters */}
      <div className="flex flex-wrap gap-2">
        <Badge
          variant={currentNiche === "all" ? "default" : "outline"}
          className="cursor-pointer hover:bg-primary/80 transition-colors"
          onClick={() => updateParams("nicho", "all")}
        >
          Todos
        </Badge>
        {NICHES.map((n) => (
          <Badge
            key={n}
            variant={currentNiche === n ? "default" : "outline"}
            className="cursor-pointer hover:bg-primary/80 transition-colors"
            onClick={() => updateParams("nicho", n)}
          >
            {n}
          </Badge>
        ))}
      </div>

      {/* Search and filters */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Buscar productos..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            className="pl-10"
          />
        </div>
        <Button variant="outline" size="sm" onClick={handleSearch}>
          Buscar
        </Button>
        <Button
          variant="outline"
          onClick={() => setShowFilters(!showFilters)}
          className="md:hidden"
        >
          <SlidersHorizontal className="mr-2 h-4 w-4" />
          Filtros
        </Button>
        <div
          className={`flex gap-2 ${showFilters ? "flex" : "hidden md:flex"}`}
        >
          <Select
            value={currentCountry}
            onValueChange={(v) => updateParams("pais", v)}
          >
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Pais" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos los paises</SelectItem>
              {COUNTRIES.map((c) => (
                <SelectItem key={c.code} value={c.code}>
                  {c.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Product grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {initialData.data.map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            meliId={product.meliId}
            title={product.title}
            price={product.price}
            currency={product.currency}
            commissionRate={product.commissionRate}
            niche={product.niche}
            country={product.country}
          />
        ))}
      </div>

      {initialData.data.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">
            No se encontraron productos con los filtros seleccionados
          </p>
        </div>
      )}

      {/* Pagination */}
      {initialData.totalPages > 1 && (
        <div className="flex items-center justify-center gap-2">
          <Button
            variant="outline"
            size="sm"
            disabled={initialData.page <= 1}
            onClick={() => goToPage(initialData.page - 1)}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="text-sm text-muted-foreground">
            Página {initialData.page} de {initialData.totalPages}
          </span>
          <Button
            variant="outline"
            size="sm"
            disabled={initialData.page >= initialData.totalPages}
            onClick={() => goToPage(initialData.page + 1)}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
}
