"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  Loader2,
  Plus,
  X,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { NICHES, COUNTRIES } from "@/lib/constants";

const steps = [
  "Informacion basica",
  "Productos",
  "Targeting",
  "Budget",
  "Revision",
];

export function CampaignForm() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    products: [] as string[],
    targetNiches: [] as string[],
    targetCountries: [] as string[],
    targetPlatforms: [] as string[],
    minFollowers: 1000,
    maxFollowers: 50000,
    budget: 0,
    commissionRate: 10,
    startDate: "",
    endDate: "",
  });

  const [productInput, setProductInput] = useState("");

  function updateField(field: string, value: unknown) {
    setFormData((prev) => ({ ...prev, [field]: value }));
  }

  function toggleArrayField(field: string, value: string) {
    setFormData((prev) => {
      const arr = prev[field as keyof typeof prev] as string[];
      return {
        ...prev,
        [field]: arr.includes(value)
          ? arr.filter((v) => v !== value)
          : [...arr, value],
      };
    });
  }

  function addProduct() {
    if (productInput.trim()) {
      setFormData((prev) => ({
        ...prev,
        products: [...prev.products, productInput.trim()],
      }));
      setProductInput("");
    }
  }

  async function handleSubmit() {
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    setIsLoading(false);
    toast.success("Campana creada exitosamente");
    router.push("/vendedor/campanas");
  }

  return (
    <div className="space-y-6">
      {/* Step indicators */}
      <div className="flex items-center gap-2">
        {steps.map((s, i) => (
          <div key={s} className="flex items-center gap-2">
            <div
              className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium ${
                i <= step
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              {i < step ? <Check className="h-4 w-4" /> : i + 1}
            </div>
            <span
              className={`hidden text-sm md:block ${
                i <= step ? "font-medium" : "text-muted-foreground"
              }`}
            >
              {s}
            </span>
            {i < steps.length - 1 && (
              <div
                className={`h-px w-8 ${
                  i < step ? "bg-primary" : "bg-muted"
                }`}
              />
            )}
          </div>
        ))}
      </div>

      {/* Step 1: Basic Info */}
      {step === 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Informacion basica</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Nombre de la campana</Label>
              <Input
                value={formData.title}
                onChange={(e) => updateField("title", e.target.value)}
                placeholder="Ej: Tech Summer 2025"
              />
            </div>
            <div className="space-y-2">
              <Label>Descripcion</Label>
              <Textarea
                value={formData.description}
                onChange={(e) => updateField("description", e.target.value)}
                placeholder="Describe tu campana y lo que buscas..."
                rows={4}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Fecha inicio</Label>
                <Input
                  type="date"
                  value={formData.startDate}
                  onChange={(e) => updateField("startDate", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Fecha fin</Label>
                <Input
                  type="date"
                  value={formData.endDate}
                  onChange={(e) => updateField("endDate", e.target.value)}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 2: Products */}
      {step === 1 && (
        <Card>
          <CardHeader>
            <CardTitle>Productos</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <Input
                value={productInput}
                onChange={(e) => setProductInput(e.target.value)}
                placeholder="ID o nombre del producto de MeLi"
                onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addProduct())}
              />
              <Button type="button" onClick={addProduct}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <div className="space-y-2">
              {formData.products.map((p, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between rounded-lg border p-3"
                >
                  <span className="text-sm">{p}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() =>
                      updateField(
                        "products",
                        formData.products.filter((_, j) => j !== i)
                      )
                    }
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              {formData.products.length === 0 && (
                <p className="text-sm text-muted-foreground text-center py-4">
                  Agrega al menos un producto
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 3: Targeting */}
      {step === 2 && (
        <Card>
          <CardHeader>
            <CardTitle>Targeting</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label>Nichos objetivo</Label>
              <div className="flex flex-wrap gap-2">
                {NICHES.map((n) => (
                  <Badge
                    key={n}
                    variant={
                      formData.targetNiches.includes(n) ? "default" : "outline"
                    }
                    className="cursor-pointer"
                    onClick={() => toggleArrayField("targetNiches", n)}
                  >
                    {n}
                  </Badge>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <Label>Paises</Label>
              <div className="flex flex-wrap gap-2">
                {COUNTRIES.map((c) => (
                  <Badge
                    key={c.code}
                    variant={
                      formData.targetCountries.includes(c.code)
                        ? "default"
                        : "outline"
                    }
                    className="cursor-pointer"
                    onClick={() => toggleArrayField("targetCountries", c.code)}
                  >
                    {c.name}
                  </Badge>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <Label>Plataformas</Label>
              <div className="flex flex-wrap gap-2">
                {["INSTAGRAM", "TIKTOK", "YOUTUBE", "TWITTER"].map((p) => (
                  <Badge
                    key={p}
                    variant={
                      formData.targetPlatforms.includes(p)
                        ? "default"
                        : "outline"
                    }
                    className="cursor-pointer"
                    onClick={() => toggleArrayField("targetPlatforms", p)}
                  >
                    {p}
                  </Badge>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Min. seguidores</Label>
                <Input
                  type="number"
                  value={formData.minFollowers}
                  onChange={(e) =>
                    updateField("minFollowers", parseInt(e.target.value) || 0)
                  }
                />
              </div>
              <div className="space-y-2">
                <Label>Max. seguidores</Label>
                <Input
                  type="number"
                  value={formData.maxFollowers}
                  onChange={(e) =>
                    updateField("maxFollowers", parseInt(e.target.value) || 0)
                  }
                />
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 4: Budget */}
      {step === 3 && (
        <Card>
          <CardHeader>
            <CardTitle>Presupuesto</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Presupuesto total (ARS)</Label>
              <Input
                type="number"
                value={formData.budget || ""}
                onChange={(e) =>
                  updateField("budget", parseInt(e.target.value) || 0)
                }
                placeholder="100000"
              />
            </div>
            <div className="space-y-2">
              <Label>Tasa de comision (%)</Label>
              <Input
                type="number"
                value={formData.commissionRate}
                onChange={(e) =>
                  updateField("commissionRate", parseInt(e.target.value) || 0)
                }
                min={1}
                max={50}
              />
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 5: Review */}
      {step === 4 && (
        <Card>
          <CardHeader>
            <CardTitle>Revision</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-3 text-sm">
              <div className="flex justify-between border-b pb-2">
                <span className="text-muted-foreground">Nombre</span>
                <span className="font-medium">
                  {formData.title || "Sin nombre"}
                </span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="text-muted-foreground">Productos</span>
                <span>{formData.products.length} productos</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="text-muted-foreground">Presupuesto</span>
                <span>ARS {formData.budget.toLocaleString()}</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="text-muted-foreground">Comision</span>
                <span>{formData.commissionRate}%</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="text-muted-foreground">Nichos</span>
                <span>{formData.targetNiches.join(", ") || "Todos"}</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="text-muted-foreground">Paises</span>
                <span>{formData.targetCountries.join(", ") || "Todos"}</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="text-muted-foreground">Seguidores</span>
                <span>
                  {formData.minFollowers.toLocaleString()} -{" "}
                  {formData.maxFollowers.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Periodo</span>
                <span>
                  {formData.startDate || "TBD"} - {formData.endDate || "TBD"}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Navigation buttons */}
      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={() => setStep(step - 1)}
          disabled={step === 0}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Anterior
        </Button>
        {step < steps.length - 1 ? (
          <Button onClick={() => setStep(step + 1)}>
            Siguiente
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        ) : (
          <Button onClick={handleSubmit} disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Crear campana
          </Button>
        )}
      </div>
    </div>
  );
}
