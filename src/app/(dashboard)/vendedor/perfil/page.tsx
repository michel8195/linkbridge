"use client";

import { useSession } from "next-auth/react";
import { Building2, Globe, MapPin, Mail, Tag } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";

const mockProfile = {
  companyName: "TechStore AR",
  website: "https://techstore.com.ar",
  industry: "Tecnologia",
  country: "AR",
  description:
    "Tienda online de tecnologia y gadgets con mas de 500 productos en MercadoLibre. Especializados en audio, wearables y perifericos gaming.",
  meliSellerId: "123456789",
  activeCampaigns: 2,
  totalInvestment: 1200000,
  totalInfluencers: 42,
};

export default function SellerProfilePage() {
  const { data: session } = useSession();
  const initials =
    mockProfile.companyName
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase() || "S";

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Perfil de empresa</h1>
        <p className="text-muted-foreground">
          Informacion de tu empresa y metricas
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-1">
          <CardContent className="pt-6 text-center">
            <Avatar className="h-20 w-20 mx-auto">
              <AvatarFallback className="bg-primary/10 text-primary text-2xl">
                {initials}
              </AvatarFallback>
            </Avatar>
            <h2 className="mt-4 text-lg font-semibold">
              {mockProfile.companyName}
            </h2>
            <p className="text-sm text-muted-foreground">
              {session?.user?.email}
            </p>
            <div className="flex items-center justify-center gap-1 mt-2 text-sm text-muted-foreground">
              <MapPin className="h-3 w-3" />
              {mockProfile.country}
            </div>
            <Separator className="my-4" />
            <div className="grid grid-cols-3 gap-2 text-center">
              <div>
                <p className="text-xl font-bold">
                  {mockProfile.activeCampaigns}
                </p>
                <p className="text-xs text-muted-foreground">Campanas</p>
              </div>
              <div>
                <p className="text-xl font-bold">
                  {mockProfile.totalInfluencers}
                </p>
                <p className="text-xs text-muted-foreground">Influencers</p>
              </div>
              <div>
                <p className="text-xl font-bold">$1.2M</p>
                <p className="text-xs text-muted-foreground">Invertido</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Informacion del negocio</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <Building2 className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">
                    {mockProfile.companyName}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Nombre de empresa
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Globe className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">{mockProfile.website}</p>
                  <p className="text-xs text-muted-foreground">Sitio web</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Tag className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">{mockProfile.industry}</p>
                  <p className="text-xs text-muted-foreground">Industria</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">{session?.user?.email}</p>
                  <p className="text-xs text-muted-foreground">Email</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Descripcion</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                {mockProfile.description}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>MercadoLibre</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <Badge variant="secondary">Seller ID</Badge>
                <span className="text-sm font-mono">
                  {mockProfile.meliSellerId}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
