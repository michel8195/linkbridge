"use client";

import { useState } from "react";
import { FileText, Copy, Check } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";

const mockTemplates = [
  {
    id: "1",
    title: "Review de producto - Story",
    platform: "INSTAGRAM",
    format: "STORY",
    niche: ["Tecnologia"],
    content:
      "🔥 Estuve probando [PRODUCTO] y tengo que contarles...\n\n✅ [BENEFICIO 1]\n✅ [BENEFICIO 2]\n✅ [BENEFICIO 3]\n\n💰 Precio increible: [PRECIO]\n\n👉 Link en bio para comprarlo con descuento\n\n#[NICHO] #MercadoLibre #Recomendacion",
  },
  {
    id: "2",
    title: "Unboxing Reel",
    platform: "INSTAGRAM",
    format: "REEL",
    niche: ["Tecnologia", "Moda"],
    content:
      "🎁 UNBOXING TIME!\n\nLes muestro lo que me llego de MercadoLibre 📦\n\n[PRODUCTO] - [PRECIO]\n\nMi opinion honesta: [OPINION]\n\nSi lo quieren, link en mi bio 👆\n\n#Unboxing #MercadoLibre #[NICHO]",
  },
  {
    id: "3",
    title: "Top 5 productos - Carrusel",
    platform: "INSTAGRAM",
    format: "CAROUSEL",
    niche: ["Belleza", "Hogar"],
    content:
      "TOP 5 PRODUCTOS QUE NECESITAS 👇\n\nSlide 1: [PRODUCTO 1] - [PRECIO] ⭐\nSlide 2: [PRODUCTO 2] - [PRECIO] ⭐\nSlide 3: [PRODUCTO 3] - [PRECIO] ⭐\nSlide 4: [PRODUCTO 4] - [PRECIO] ⭐\nSlide 5: [PRODUCTO 5] - [PRECIO] ⭐\n\nTodos disponibles en MercadoLibre\nLink en bio 🔗",
  },
  {
    id: "4",
    title: "Video review - TikTok",
    platform: "TIKTOK",
    format: "VIDEO",
    niche: ["Tecnologia", "Gaming"],
    content:
      "POV: Encontraste el mejor [CATEGORIA] en MercadoLibre\n\n[PRODUCTO]\n💰 [PRECIO]\n\nPros:\n✅ [PRO 1]\n✅ [PRO 2]\n\nContras:\n❌ [CONTRA 1]\n\nVeredicto: [CALIFICACION]/10\n\nLink en mi perfil 👆",
  },
  {
    id: "5",
    title: "Comparativa - YouTube",
    platform: "YOUTUBE",
    format: "VIDEO",
    niche: ["Tecnologia"],
    content:
      "📱 [PRODUCTO A] vs [PRODUCTO B] - Cual comprar en 2025?\n\nEn este video comparo:\n- Diseno y calidad de construccion\n- Performance y funcionalidades\n- Relacion calidad-precio\n\n🔗 Links de compra en la descripcion\n\n#Comparativa #MercadoLibre #Tech",
  },
  {
    id: "6",
    title: "Tweet promocional",
    platform: "TWITTER",
    format: "TWEET",
    niche: ["Tecnologia", "Gaming"],
    content:
      "Acabo de encontrar [PRODUCTO] a un precio increible en @MercadoLibre 🔥\n\n[BENEFICIO PRINCIPAL]\n\n💰 [PRECIO]\n\n🔗 [LINK]\n\n#[NICHO]",
  },
];

function TemplateCard({
  template,
}: {
  template: (typeof mockTemplates)[0];
}) {
  const { copied, copy } = useCopyToClipboard();

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <CardTitle className="text-base">{template.title}</CardTitle>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => copy(template.content)}
          >
            {copied ? (
              <Check className="h-4 w-4 text-green-500" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
          </Button>
        </div>
        <div className="flex gap-2">
          <Badge variant="secondary">{template.platform}</Badge>
          <Badge variant="outline">{template.format}</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <pre className="whitespace-pre-wrap text-sm text-muted-foreground bg-muted p-3 rounded-lg font-sans">
          {template.content}
        </pre>
        <div className="flex flex-wrap gap-1 mt-3">
          {template.niche.map((n) => (
            <Badge key={n} variant="secondary" className="text-xs">
              {n}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export default function ContentHubPage() {
  const [platformFilter, setPlatformFilter] = useState<string>("all");
  const [nicheFilter, setNicheFilter] = useState<string>("all");

  const filtered = mockTemplates.filter((t) => {
    if (platformFilter !== "all" && t.platform !== platformFilter) return false;
    if (nicheFilter !== "all" && !t.niche.includes(nicheFilter)) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Content Hub</h1>
        <p className="text-muted-foreground">
          Templates de contenido optimizados para cada plataforma
        </p>
      </div>

      <div className="flex gap-2">
        <Select value={platformFilter} onValueChange={setPlatformFilter}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Plataforma" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas</SelectItem>
            <SelectItem value="INSTAGRAM">Instagram</SelectItem>
            <SelectItem value="TIKTOK">TikTok</SelectItem>
            <SelectItem value="YOUTUBE">YouTube</SelectItem>
            <SelectItem value="TWITTER">Twitter/X</SelectItem>
          </SelectContent>
        </Select>
        <Select value={nicheFilter} onValueChange={setNicheFilter}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Nicho" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos</SelectItem>
            <SelectItem value="Tecnologia">Tecnologia</SelectItem>
            <SelectItem value="Moda">Moda</SelectItem>
            <SelectItem value="Belleza">Belleza</SelectItem>
            <SelectItem value="Hogar">Hogar</SelectItem>
            <SelectItem value="Gaming">Gaming</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {filtered.map((template) => (
          <TemplateCard key={template.id} template={template} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12">
          <FileText className="h-12 w-12 text-muted-foreground/30 mx-auto mb-4" />
          <p className="text-muted-foreground">
            No se encontraron templates con los filtros seleccionados
          </p>
        </div>
      )}
    </div>
  );
}
