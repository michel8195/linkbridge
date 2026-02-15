"use client";

import { useState } from "react";
import {
  Search,
  Plus,
  MoreHorizontal,
  Eye,
  EyeOff,
  Trash2,
  Tag,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
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
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

const initialProducts = [
  {
    id: "1",
    meliId: "MLA123456",
    title: "Auriculares Bluetooth TWS con Cancelacion de Ruido",
    price: 15999,
    commissionRate: 8,
    niche: ["Tecnologia"],
    country: "AR",
    isActive: true,
  },
  {
    id: "2",
    meliId: "MLA234567",
    title: "Smartwatch Deportivo Resistente al Agua",
    price: 22500,
    commissionRate: 10,
    niche: ["Tecnologia", "Deportes"],
    country: "AR",
    isActive: true,
  },
  {
    id: "3",
    meliId: "MLA345678",
    title: "Zapatillas Running Ultralight",
    price: 34999,
    commissionRate: 6,
    niche: ["Deportes", "Moda"],
    country: "AR",
    isActive: true,
  },
  {
    id: "4",
    meliId: "MLA456789",
    title: "Set de Maquillaje Profesional 24 Piezas",
    price: 12800,
    commissionRate: 12,
    niche: ["Belleza"],
    country: "AR",
    isActive: false,
  },
  {
    id: "5",
    meliId: "MLA567890",
    title: "Teclado Mecanico RGB Gaming 60%",
    price: 28900,
    commissionRate: 7,
    niche: ["Tecnologia", "Gaming"],
    country: "AR",
    isActive: true,
  },
];

export default function ProductsPage() {
  const [products, setProducts] = useState(initialProducts);
  const [search, setSearch] = useState("");
  const [meliSearch, setMeliSearch] = useState("");

  function toggleActive(id: string) {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, isActive: !p.isActive } : p))
    );
    toast.success("Producto actualizado");
  }

  function removeProduct(id: string) {
    setProducts((prev) => prev.filter((p) => p.id !== id));
    toast.success("Producto eliminado del catalogo");
  }

  const filtered = products.filter((p) =>
    search
      ? p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.meliId.toLowerCase().includes(search.toLowerCase())
      : true
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Curacion de productos</h1>
          <p className="text-muted-foreground">
            Gestiona el catalogo de productos de MercadoLibre
          </p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Importar de MeLi
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Importar producto de MercadoLibre</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Buscar en MercadoLibre</Label>
                <Input
                  placeholder="ID del producto o URL..."
                  value={meliSearch}
                  onChange={(e) => setMeliSearch(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Nichos</Label>
                <Input placeholder="Tecnologia, Gaming..." />
              </div>
              <div className="space-y-2">
                <Label>Tasa de comision (%)</Label>
                <Input type="number" placeholder="10" />
              </div>
              <Button
                className="w-full"
                onClick={() => toast.success("Producto importado (mock)")}
              >
                Importar producto
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Buscar por nombre o MeLi ID..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-10"
        />
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="divide-y">
            {filtered.map((product) => (
              <div
                key={product.id}
                className="flex items-center justify-between p-4"
              >
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-muted">
                    <Tag className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div className="min-w-0">
                    <p className="font-medium text-sm truncate">
                      {product.title}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {product.meliId} &middot; ARS{" "}
                      {product.price.toLocaleString()} &middot;{" "}
                      {product.commissionRate}% comision
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <div className="hidden md:flex gap-1">
                    {product.niche.map((n) => (
                      <Badge key={n} variant="secondary" className="text-xs">
                        {n}
                      </Badge>
                    ))}
                  </div>
                  <Badge
                    variant={product.isActive ? "default" : "outline"}
                    className="text-xs"
                  >
                    {product.isActive ? "Activo" : "Inactivo"}
                  </Badge>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        onClick={() => toggleActive(product.id)}
                      >
                        {product.isActive ? (
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
                        onClick={() => removeProduct(product.id)}
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Eliminar
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
