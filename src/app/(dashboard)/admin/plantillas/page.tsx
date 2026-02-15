"use client";

import { useState } from "react";
import { Plus, MoreHorizontal, Eye, EyeOff, Trash2, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

const initialTemplates = [
  {
    id: "1",
    title: "Review de producto - Story",
    platform: "INSTAGRAM",
    format: "STORY",
    niche: ["Tecnologia"],
    isActive: true,
  },
  {
    id: "2",
    title: "Unboxing Reel",
    platform: "INSTAGRAM",
    format: "REEL",
    niche: ["Tecnologia", "Moda"],
    isActive: true,
  },
  {
    id: "3",
    title: "Top 5 productos - Carrusel",
    platform: "INSTAGRAM",
    format: "CAROUSEL",
    niche: ["Belleza", "Hogar"],
    isActive: true,
  },
  {
    id: "4",
    title: "Video review - TikTok",
    platform: "TIKTOK",
    format: "VIDEO",
    niche: ["Tecnologia", "Gaming"],
    isActive: true,
  },
  {
    id: "5",
    title: "Comparativa - YouTube",
    platform: "YOUTUBE",
    format: "VIDEO",
    niche: ["Tecnologia"],
    isActive: false,
  },
  {
    id: "6",
    title: "Tweet promocional",
    platform: "TWITTER",
    format: "TWEET",
    niche: ["Tecnologia", "Gaming"],
    isActive: true,
  },
];

export default function TemplatesPage() {
  const [templates, setTemplates] = useState(initialTemplates);

  function toggleActive(id: string) {
    setTemplates((prev) =>
      prev.map((t) => (t.id === id ? { ...t, isActive: !t.isActive } : t))
    );
    toast.success("Template actualizado");
  }

  function removeTemplate(id: string) {
    setTemplates((prev) => prev.filter((t) => t.id !== id));
    toast.success("Template eliminado");
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Plantillas de contenido</h1>
          <p className="text-muted-foreground">
            Gestiona los templates disponibles para los influencers
          </p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Nueva plantilla
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>Crear plantilla</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Titulo</Label>
                <Input placeholder="Nombre de la plantilla" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Plataforma</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="INSTAGRAM">Instagram</SelectItem>
                      <SelectItem value="TIKTOK">TikTok</SelectItem>
                      <SelectItem value="YOUTUBE">YouTube</SelectItem>
                      <SelectItem value="TWITTER">Twitter/X</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Formato</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="STORY">Story</SelectItem>
                      <SelectItem value="REEL">Reel</SelectItem>
                      <SelectItem value="POST">Post</SelectItem>
                      <SelectItem value="VIDEO">Video</SelectItem>
                      <SelectItem value="TWEET">Tweet</SelectItem>
                      <SelectItem value="CAROUSEL">Carrusel</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Contenido del template</Label>
                <Textarea rows={6} placeholder="Escribe el contenido..." />
              </div>
              <Button
                className="w-full"
                onClick={() => toast.success("Plantilla creada (mock)")}
              >
                Crear plantilla
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {templates.map((template) => (
          <Card key={template.id} className={!template.isActive ? "opacity-60" : ""}>
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                    <FileText className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-base">{template.title}</CardTitle>
                    <div className="flex gap-1 mt-1">
                      <Badge variant="secondary" className="text-xs">
                        {template.platform}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {template.format}
                      </Badge>
                    </div>
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem
                      onClick={() => toggleActive(template.id)}
                    >
                      {template.isActive ? (
                        <>
                          <EyeOff className="mr-2 h-4 w-4" />
                          Desactivar
                        </>
                      ) : (
                        <>
                          <Eye className="mr-2 h-4 w-4" />
                          Activar
                        </>
                      )}
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="text-destructive"
                      onClick={() => removeTemplate(template.id)}
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      Eliminar
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-1">
                {template.niche.map((n) => (
                  <Badge key={n} variant="secondary" className="text-xs">
                    {n}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
