"use client";

import Image from "next/image";
import Link from "next/link";
import { ExternalLink, Tag } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface ProductCardProps {
  id: string;
  title: string;
  price: number;
  currency: string;
  imageUrl?: string;
  commissionRate: number;
  niche: string[];
  country: string;
}

export function ProductCard({
  id,
  title,
  price,
  currency,
  imageUrl,
  commissionRate,
  niche,
  country,
}: ProductCardProps) {
  const estimatedCommission = (price * commissionRate) / 100;

  return (
    <Card className="group overflow-hidden transition-all hover:shadow-lg hover:border-primary/50">
      <div className="aspect-square relative bg-muted overflow-hidden">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-cover transition-transform group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <Tag className="h-12 w-12 text-muted-foreground/30" />
          </div>
        )}
        <Badge className="absolute top-2 right-2" variant="secondary">
          {commissionRate}% comision
        </Badge>
      </div>
      <CardContent className="p-4 space-y-3">
        <h3 className="font-medium text-sm line-clamp-2">{title}</h3>
        <div className="flex items-center justify-between">
          <div>
            <p className="font-bold">
              {currency} {price.toLocaleString()}
            </p>
            <p className="text-xs text-green-500">
              Comision: {currency} {estimatedCommission.toLocaleString()}
            </p>
          </div>
          <Badge variant="outline" className="text-xs">
            {country}
          </Badge>
        </div>
        <div className="flex flex-wrap gap-1">
          {niche.slice(0, 2).map((n) => (
            <Badge key={n} variant="secondary" className="text-xs">
              {n}
            </Badge>
          ))}
        </div>
        <Button className="w-full" size="sm" asChild>
          <Link href={`/influencer/catalogo/${id}`}>
            Ver producto
            <ExternalLink className="ml-2 h-3 w-3" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}
