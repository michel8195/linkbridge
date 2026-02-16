import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LinkGenerator } from "@/components/influencer/link-generator";
import { getProductById } from "@/lib/queries/products";

export const metadata = { title: "Detalle de producto" };

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await getProductById(id);

  if (!product) {
    notFound();
  }

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
          <div className="aspect-video rounded-xl bg-muted flex items-center justify-center overflow-hidden relative">
            {product.imageUrl ? (
              <Image
                src={product.imageUrl}
                alt={product.title}
                fill
                className="object-contain"
                sizes="(max-width: 1024px) 100vw, 66vw"
              />
            ) : (
              <div className="text-muted-foreground/30 text-sm">
                Sin imagen
              </div>
            )}
          </div>

          <div>
            <h1 className="text-2xl font-bold">{product.title}</h1>
            {product.description && (
              <p className="mt-2 text-muted-foreground">
                {product.description}
              </p>
            )}
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
              {product.categoryName && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Categoria</span>
                  <span>{product.categoryName}</span>
                </div>
              )}
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
              <div className="pt-2">
                <Button variant="outline" size="sm" asChild>
                  <a
                    href={product.permalink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Ver en MercadoLibre
                    <ExternalLink className="ml-2 h-3 w-3" />
                  </a>
                </Button>
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
