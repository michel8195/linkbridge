"use client";

import { useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ProductCard } from "@/components/influencer/product-card";
import { NICHES, COUNTRIES } from "@/lib/constants";

const mockProducts = [
  {
    id: "1",
    title: "Auriculares Bluetooth TWS con Cancelacion de Ruido Activa",
    price: 15999,
    currency: "ARS",
    imageUrl: "",
    commissionRate: 8,
    niche: ["Tecnologia"],
    country: "AR",
  },
  {
    id: "2",
    title: "Smartwatch Deportivo Resistente al Agua IP68",
    price: 22500,
    currency: "ARS",
    imageUrl: "",
    commissionRate: 10,
    niche: ["Tecnologia", "Deportes"],
    country: "AR",
  },
  {
    id: "3",
    title: "Zapatillas Running Ultralight Unisex",
    price: 34999,
    currency: "ARS",
    imageUrl: "",
    commissionRate: 6,
    niche: ["Deportes", "Moda"],
    country: "AR",
  },
  {
    id: "4",
    title: "Set de Maquillaje Profesional 24 Piezas",
    price: 12800,
    currency: "ARS",
    imageUrl: "",
    commissionRate: 12,
    niche: ["Belleza"],
    country: "AR",
  },
  {
    id: "5",
    title: "Teclado Mecanico RGB Gaming 60%",
    price: 28900,
    currency: "ARS",
    imageUrl: "",
    commissionRate: 7,
    niche: ["Tecnologia", "Gaming"],
    country: "AR",
  },
  {
    id: "6",
    title: "Organizador de Escritorio Minimalista Bambu",
    price: 8500,
    currency: "ARS",
    imageUrl: "",
    commissionRate: 15,
    niche: ["Hogar"],
    country: "AR",
  },
  {
    id: "7",
    title: "Camara de Seguridad WiFi 360° con Vision Nocturna",
    price: 19990,
    currency: "ARS",
    imageUrl: "",
    commissionRate: 9,
    niche: ["Tecnologia", "Hogar"],
    country: "AR",
  },
  {
    id: "8",
    title: "Kit de Cocina Saludable Antiadherente 5 Piezas",
    price: 27500,
    currency: "ARS",
    imageUrl: "",
    commissionRate: 11,
    niche: ["Cocina", "Hogar"],
    country: "AR",
  },
];

export default function CatalogPage() {
  const [search, setSearch] = useState("");
  const [nicheFilter, setNicheFilter] = useState<string>("all");
  const [countryFilter, setCountryFilter] = useState<string>("all");
  const [showFilters, setShowFilters] = useState(false);

  const filtered = mockProducts.filter((p) => {
    if (search && !p.title.toLowerCase().includes(search.toLowerCase()))
      return false;
    if (nicheFilter !== "all" && !p.niche.includes(nicheFilter)) return false;
    if (countryFilter !== "all" && p.country !== countryFilter) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Catalogo de productos</h1>
        <p className="text-muted-foreground">
          Explora productos curados de MercadoLibre y genera tus links de
          afiliado
        </p>
      </div>

      <div className="flex flex-col gap-4 md:flex-row md:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Buscar productos..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>
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
          <Select value={nicheFilter} onValueChange={setNicheFilter}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Nicho" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos los nichos</SelectItem>
              {NICHES.map((n) => (
                <SelectItem key={n} value={n}>
                  {n}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={countryFilter} onValueChange={setCountryFilter}>
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

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filtered.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">
            No se encontraron productos con los filtros seleccionados
          </p>
        </div>
      )}
    </div>
  );
}
