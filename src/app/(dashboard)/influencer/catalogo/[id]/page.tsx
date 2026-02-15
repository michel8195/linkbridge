import { ArrowLeft, Tag } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LinkGenerator } from "@/components/influencer/link-generator";

export const metadata = { title: "Detalle de producto" };

// Mock data - in production, fetch from DB
const product = {
  id: "1",
  title: "Auriculares Bluetooth TWS con Cancelacion de Ruido Activa",
  description:
    "Auriculares inalambricos de alta calidad con tecnologia ANC, 30 horas de bateria, resistencia al agua IPX5 y conectividad Bluetooth 5.3.",
  price: 15999,
  currency: "ARS",
  commissionRate: 8,
  niche: ["Tecnologia"],
  country: "AR",
  permalink: "https://www.mercadolibre.com.ar/auriculares-bluetooth",
  categoryName: "Auriculares",
};

export default function ProductDetailPage() {
  const estimatedCommission =
    (product.price * product.commissionRate) / 100;

  return (
    <div className="space-y-6">
      <Button variant="ghost" size="sm" asChild>
        <Link href="/influencer/catalogo">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Volver al catalogo
        </Link>
      </Button>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <div className="aspect-video rounded-xl bg-muted flex items-center justify-center">
            <Tag className="h-16 w-16 text-muted-foreground/30" />
          </div>

          <div>
            <h1 className="text-2xl font-bold">{product.title}</h1>
            <p className="mt-2 text-muted-foreground">
              {product.description}
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Detalles del producto</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Precio</span>
                <span className="font-medium">
                  {product.currency} {product.price.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Comision</span>
                <span className="font-medium text-green-500">
                  {product.commissionRate}% (~{product.currency}{" "}
                  {estimatedCommission.toLocaleString()})
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Categoria</span>
                <span>{product.categoryName}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Nichos</span>
                <div className="flex gap-1">
                  {product.niche.map((n) => (
                    <Badge key={n} variant="secondary">
                      {n}
                    </Badge>
                  ))}
                </div>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Pais</span>
                <Badge variant="outline">{product.country}</Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <LinkGenerator
            productTitle={product.title}
            productId={product.id}
            meliUrl={product.permalink}
          />
        </div>
      </div>
    </div>
  );
}
