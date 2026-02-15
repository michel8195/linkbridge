"use client";

import { useState } from "react";
import { Search, MapPin, Users } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { NICHES, COUNTRIES } from "@/lib/constants";

const mockInfluencers = [
  {
    id: "1",
    name: "Maria Garcia",
    bio: "Content creator de moda y lifestyle en Buenos Aires",
    niche: ["Moda", "Belleza"],
    country: "AR",
    city: "Buenos Aires",
    totalReach: 25000,
    platforms: ["INSTAGRAM", "TIKTOK"],
    conversionRate: 4.2,
  },
  {
    id: "2",
    name: "Carlos Rodriguez",
    bio: "Reviews de tech, gadgets y todo lo geek",
    niche: ["Tecnologia", "Gaming"],
    country: "AR",
    city: "Cordoba",
    totalReach: 15000,
    platforms: ["YOUTUBE", "TIKTOK"],
    conversionRate: 3.8,
  },
  {
    id: "3",
    name: "Ana Martinez",
    bio: "Tech reviewer con analisis profundos de productos",
    niche: ["Tecnologia"],
    country: "MX",
    city: "CDMX",
    totalReach: 40000,
    platforms: ["YOUTUBE", "INSTAGRAM"],
    conversionRate: 5.1,
  },
  {
    id: "4",
    name: "Lucas Fernandez",
    bio: "Gamer y streamer con reviews de perifericos",
    niche: ["Gaming", "Tecnologia"],
    country: "AR",
    city: "Rosario",
    totalReach: 8000,
    platforms: ["TIKTOK", "TWITTER"],
    conversionRate: 3.2,
  },
  {
    id: "5",
    name: "Sofia Lopez",
    bio: "Amante de la cocina saludable y organizacion del hogar",
    niche: ["Cocina", "Hogar"],
    country: "CO",
    city: "Bogota",
    totalReach: 18000,
    platforms: ["INSTAGRAM", "TIKTOK"],
    conversionRate: 4.5,
  },
  {
    id: "6",
    name: "Diego Morales",
    bio: "Fitness y nutricion para un estilo de vida activo",
    niche: ["Deportes", "Salud"],
    country: "CL",
    city: "Santiago",
    totalReach: 22000,
    platforms: ["INSTAGRAM", "YOUTUBE"],
    conversionRate: 3.9,
  },
];

export default function InfluencerDiscoveryPage() {
  const [search, setSearch] = useState("");
  const [nicheFilter, setNicheFilter] = useState("all");
  const [countryFilter, setCountryFilter] = useState("all");

  const filtered = mockInfluencers.filter((inf) => {
    if (search && !inf.name.toLowerCase().includes(search.toLowerCase()))
      return false;
    if (nicheFilter !== "all" && !inf.niche.includes(nicheFilter)) return false;
    if (countryFilter !== "all" && inf.country !== countryFilter) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Descubrir influencers</h1>
        <p className="text-muted-foreground">
          Encuentra los influencers ideales para tus campanas
        </p>
      </div>

      <div className="flex flex-col gap-4 md:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Buscar por nombre..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={nicheFilter} onValueChange={setNicheFilter}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Nicho" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos</SelectItem>
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
            <SelectItem value="all">Todos</SelectItem>
            {COUNTRIES.map((c) => (
              <SelectItem key={c.code} value={c.code}>
                {c.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((inf) => (
          <Card
            key={inf.id}
            className="transition-all hover:shadow-lg hover:border-primary/50"
          >
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <Avatar className="h-12 w-12">
                  <AvatarFallback className="bg-primary/10 text-primary">
                    {inf.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold">{inf.name}</h3>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <MapPin className="h-3 w-3" />
                    {inf.city}, {inf.country}
                  </div>
                </div>
              </div>

              <p className="text-sm text-muted-foreground mt-3 line-clamp-2">
                {inf.bio}
              </p>

              <div className="flex items-center gap-4 mt-4 text-sm">
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">
                    {inf.totalReach.toLocaleString()}
                  </span>
                </div>
                <span className="text-green-500 font-medium">
                  {inf.conversionRate}% conv.
                </span>
              </div>

              <div className="flex flex-wrap gap-1 mt-3">
                {inf.niche.map((n) => (
                  <Badge key={n} variant="secondary" className="text-xs">
                    {n}
                  </Badge>
                ))}
                {inf.platforms.map((p) => (
                  <Badge key={p} variant="outline" className="text-xs">
                    {p}
                  </Badge>
                ))}
              </div>

              <Button className="w-full mt-4" variant="outline" size="sm">
                Invitar a campana
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
