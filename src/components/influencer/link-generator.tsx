"use client";

import { useState } from "react";
import { Copy, Check, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";
import { siteConfig } from "@/lib/constants";

interface LinkGeneratorProps {
  productTitle: string;
  productId: string;
  meliUrl?: string;
}

export function LinkGenerator({
  productTitle,
  productId,
  meliUrl,
}: LinkGeneratorProps) {
  const [shortCode] = useState(
    () => `lb_${productId.slice(0, 4)}_${Math.random().toString(36).slice(2, 8)}`
  );
  const { copied, copy } = useCopyToClipboard();

  const affiliateUrl = `${siteConfig.url}/api/tracking/click?c=${shortCode}`;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Generar link de afiliado</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label>Producto</Label>
          <p className="text-sm text-muted-foreground">{productTitle}</p>
        </div>

        <div className="space-y-2">
          <Label>Tu link de afiliado</Label>
          <div className="flex gap-2">
            <Input value={affiliateUrl} readOnly className="font-mono text-sm" />
            <Button
              size="icon"
              variant="outline"
              onClick={() => copy(affiliateUrl)}
            >
              {copied ? (
                <Check className="h-4 w-4 text-green-500" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </Button>
          </div>
          <p className="text-xs text-muted-foreground">
            Short code: {shortCode}
          </p>
        </div>

        {meliUrl && (
          <Button variant="outline" className="w-full" asChild>
            <a href={meliUrl} target="_blank" rel="noopener noreferrer">
              Ver en MercadoLibre
              <ExternalLink className="ml-2 h-3 w-3" />
            </a>
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
