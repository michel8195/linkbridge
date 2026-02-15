"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Calendar,
  Users,
  DollarSign,
  Tag,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const campaign = {
  id: "1",
  title: "Tech Summer 2025",
  description:
    "Promociona los mejores gadgets de verano. Buscamos influencers de tecnologia con engagement real para crear contenido autentico sobre auriculares, smartwatches y accesorios tech.",
  commissionRate: 12,
  status: "ACTIVE",
  budget: 500000,
  startDate: "2025-01-01",
  endDate: "2025-03-31",
  participantCount: 24,
  targetNiches: ["Tecnologia", "Gaming"],
  targetPlatforms: ["INSTAGRAM", "TIKTOK"],
  minFollowers: 1000,
  maxFollowers: 50000,
  sellerName: "TechStore AR",
  products: [
    { title: "Auriculares Bluetooth TWS", price: 15999, commission: 8 },
    { title: "Smartwatch Deportivo", price: 22500, commission: 10 },
    { title: "Teclado Mecanico RGB", price: 28900, commission: 7 },
  ],
};

export default function CampaignDetailPage() {
  const [isApplying, setIsApplying] = useState(false);
  const [message, setMessage] = useState("");
  const [applied, setApplied] = useState(false);

  async function handleApply() {
    setIsApplying(true);
    // Simulate API call
    await new Promise((r) => setTimeout(r, 1000));
    setApplied(true);
    setIsApplying(false);
    toast.success("Postulacion enviada exitosamente");
  }

  return (
    <div className="space-y-6">
      <Button variant="ghost" size="sm" asChild>
        <Link href="/influencer/campanas">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Volver a campanas
        </Link>
      </Button>

      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold">{campaign.title}</h1>
          <p className="text-muted-foreground">por {campaign.sellerName}</p>
        </div>
        <Badge className="bg-green-500/10 text-green-500">Activa</Badge>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Descripcion</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{campaign.description}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Productos de la campana</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {campaign.products.map((product) => (
                  <div
                    key={product.title}
                    className="flex items-center justify-between rounded-lg border p-3"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                        <Tag className="h-5 w-5 text-muted-foreground" />
                      </div>
                      <div>
                        <p className="font-medium text-sm">{product.title}</p>
                        <p className="text-xs text-muted-foreground">
                          ARS {product.price.toLocaleString()}
                        </p>
                      </div>
                    </div>
                    <Badge variant="secondary">
                      {product.commission}% comision
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Detalles</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-green-500" />
                <span className="text-sm">
                  {campaign.commissionRate}% comision
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">
                  {campaign.participantCount} participantes
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">
                  {campaign.startDate} - {campaign.endDate}
                </span>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Nichos</p>
                <div className="flex flex-wrap gap-1">
                  {campaign.targetNiches.map((n) => (
                    <Badge key={n} variant="outline">
                      {n}
                    </Badge>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Plataformas</p>
                <div className="flex flex-wrap gap-1">
                  {campaign.targetPlatforms.map((p) => (
                    <Badge key={p} variant="secondary">
                      {p}
                    </Badge>
                  ))}
                </div>
              </div>
              <div className="text-sm text-muted-foreground">
                {campaign.minFollowers.toLocaleString()} -{" "}
                {campaign.maxFollowers.toLocaleString()} seguidores
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Postularse</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {applied ? (
                <div className="text-center py-4">
                  <p className="text-green-500 font-medium">
                    Postulacion enviada
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    El vendedor revisara tu perfil y te notificara
                  </p>
                </div>
              ) : (
                <>
                  <div className="space-y-2">
                    <Label>Mensaje al vendedor (opcional)</Label>
                    <Textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Cuentale al vendedor por que eres ideal para esta campana..."
                      rows={3}
                    />
                  </div>
                  <Button
                    className="w-full"
                    onClick={handleApply}
                    disabled={isApplying}
                  >
                    {isApplying && (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    Postularse a la campana
                  </Button>
                </>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
