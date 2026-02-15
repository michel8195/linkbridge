"use client";

import { Copy, Check, ExternalLink, MousePointerClick, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";
import { siteConfig } from "@/lib/constants";

const mockLinks = [
  {
    id: "1",
    shortCode: "lb_aur_x8k2m",
    productTitle: "Auriculares Bluetooth TWS",
    clicks: 234,
    conversions: 12,
    earnings: 1280,
    createdAt: "2025-01-15",
  },
  {
    id: "2",
    shortCode: "lb_smt_p9n4j",
    productTitle: "Smartwatch Deportivo",
    clicks: 189,
    conversions: 8,
    earnings: 2250,
    createdAt: "2025-01-20",
  },
  {
    id: "3",
    shortCode: "lb_tec_r7q1w",
    productTitle: "Teclado Mecanico RGB",
    clicks: 156,
    conversions: 6,
    earnings: 2023,
    createdAt: "2025-02-01",
  },
  {
    id: "4",
    shortCode: "lb_maq_s3v8f",
    productTitle: "Set de Maquillaje Profesional",
    clicks: 98,
    conversions: 4,
    earnings: 1536,
    createdAt: "2025-02-05",
  },
];

function LinkRow({ link }: { link: (typeof mockLinks)[0] }) {
  const { copied, copy } = useCopyToClipboard();
  const url = `${siteConfig.url}/api/tracking/click?c=${link.shortCode}`;
  const conversionRate =
    link.clicks > 0 ? ((link.conversions / link.clicks) * 100).toFixed(1) : "0";

  return (
    <div className="flex flex-col gap-3 rounded-lg border p-4 md:flex-row md:items-center md:justify-between">
      <div className="flex-1 min-w-0">
        <p className="font-medium">{link.productTitle}</p>
        <div className="flex items-center gap-2 mt-1">
          <code className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded truncate max-w-[300px]">
            {url}
          </code>
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6 shrink-0"
            onClick={() => copy(url)}
          >
            {copied ? (
              <Check className="h-3 w-3 text-green-500" />
            ) : (
              <Copy className="h-3 w-3" />
            )}
          </Button>
        </div>
      </div>
      <div className="flex items-center gap-6 text-sm">
        <div className="flex items-center gap-1">
          <MousePointerClick className="h-4 w-4 text-muted-foreground" />
          <span>{link.clicks} clicks</span>
        </div>
        <div className="flex items-center gap-1">
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
          <span>{conversionRate}%</span>
        </div>
        <span className="font-bold text-green-500">
          +${link.earnings.toLocaleString()}
        </span>
      </div>
    </div>
  );
}

export default function LinksPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Mis Links</h1>
        <p className="text-muted-foreground">
          Gestiona tus links de afiliado y trackea su rendimiento
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="pt-6 text-center">
            <p className="text-3xl font-bold">{mockLinks.length}</p>
            <p className="text-sm text-muted-foreground">Links activos</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6 text-center">
            <p className="text-3xl font-bold">
              {mockLinks.reduce((sum, l) => sum + l.clicks, 0)}
            </p>
            <p className="text-sm text-muted-foreground">Clicks totales</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6 text-center">
            <p className="text-3xl font-bold text-green-500">
              ${mockLinks.reduce((sum, l) => sum + l.earnings, 0).toLocaleString()}
            </p>
            <p className="text-sm text-muted-foreground">Ganancias totales</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Todos los links</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {mockLinks.map((link) => (
            <LinkRow key={link.id} link={link} />
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
