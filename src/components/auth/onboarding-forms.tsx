"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import {
  Loader2,
  Users,
  ShoppingBag,
  ArrowRight,
  ArrowLeft,
  Plus,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
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
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  influencerOnboardingSchema,
  sellerOnboardingSchema,
  type InfluencerOnboardingInput,
  type SellerOnboardingInput,
} from "@/lib/validations/auth";
import { completeOnboarding } from "@/lib/actions/auth";
import { NICHES, COUNTRIES } from "@/lib/constants";

type SelectedRole = "INFLUENCER" | "SELLER" | null;

export function OnboardingForms() {
  const { data: session, update } = useSession();
  const router = useRouter();
  const [selectedRole, setSelectedRole] = useState<SelectedRole>(null);

  if (!selectedRole) {
    return <RoleSelector onSelect={setSelectedRole} />;
  }

  if (selectedRole === "INFLUENCER") {
    return (
      <InfluencerForm
        userId={session?.user?.id || ""}
        onBack={() => setSelectedRole(null)}
        onComplete={async () => {
          await update({ role: "INFLUENCER", onboarding: "COMPLETED" });
          router.push("/influencer");
          router.refresh();
        }}
      />
    );
  }

  return (
    <SellerForm
      userId={session?.user?.id || ""}
      onBack={() => setSelectedRole(null)}
      onComplete={async () => {
        await update({ role: "SELLER", onboarding: "COMPLETED" });
        router.push("/vendedor");
        router.refresh();
      }}
    />
  );
}

function RoleSelector({
  onSelect,
}: {
  onSelect: (role: SelectedRole) => void;
}) {
  return (
    <div className="space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-2xl font-bold">Bienvenido a LinkBridge</h1>
        <p className="text-muted-foreground">
          Selecciona tu rol para personalizar tu experiencia
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Card
          className="cursor-pointer transition-all hover:border-primary hover:shadow-lg"
          onClick={() => onSelect("INFLUENCER")}
        >
          <CardContent className="flex flex-col items-center gap-4 p-6 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10">
              <Users className="h-7 w-7 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-lg">Influencer</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Monetiza tu audiencia promocionando productos de MercadoLibre
              </p>
            </div>
          </CardContent>
        </Card>

        <Card
          className="cursor-pointer transition-all hover:border-primary hover:shadow-lg"
          onClick={() => onSelect("SELLER")}
        >
          <CardContent className="flex flex-col items-center gap-4 p-6 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10">
              <ShoppingBag className="h-7 w-7 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-lg">Vendedor</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Conecta con influencers para promocionar tus productos
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function InfluencerForm({
  userId,
  onBack,
  onComplete,
}: {
  userId: string;
  onBack: () => void;
  onComplete: () => Promise<void>;
}) {
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedNiches, setSelectedNiches] = useState<string[]>([]);
  type SocialLinkEntry = {
    platform: "INSTAGRAM" | "TIKTOK" | "YOUTUBE" | "TWITTER" | "FACEBOOK";
    url: string;
    username: string;
    followers: number;
  };
  const [socialLinks, setSocialLinks] = useState<SocialLinkEntry[]>([
    { platform: "INSTAGRAM", url: "", username: "", followers: 0 },
  ]);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<InfluencerOnboardingInput>({
    resolver: zodResolver(influencerOnboardingSchema),
    defaultValues: { niche: [], socialLinks: [] },
  });

  // Sync socialLinks state to form so Zod validation sees actual data
  useEffect(() => {
    setValue("socialLinks", socialLinks, { shouldValidate: false });
  }, [socialLinks, setValue]);

  function toggleNiche(niche: string) {
    const updated = selectedNiches.includes(niche)
      ? selectedNiches.filter((n) => n !== niche)
      : [...selectedNiches, niche];
    setSelectedNiches(updated);
    setValue("niche", updated);
  }

  function addSocialLink() {
    setSocialLinks([
      ...socialLinks,
      { platform: "TIKTOK" as const, url: "", username: "", followers: 0 },
    ]);
  }

  function removeSocialLink(index: number) {
    setSocialLinks(socialLinks.filter((_, i) => i !== index));
  }

  async function onSubmit(data: InfluencerOnboardingInput) {
    if (!userId) {
      toast.error("Sesion no encontrada. Recarga la pagina.");
      return;
    }
    setIsLoading(true);
    try {
      const result = await completeOnboarding(userId, "INFLUENCER", {
        ...data,
        socialLinks,
      });
      if (result.error) {
        toast.error(result.error);
      } else if (result.success) {
        toast.success("Perfil completado!");
        await onComplete();
      }
    } catch {
      toast.error("Error al completar el perfil");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Button variant="ghost" size="sm" onClick={onBack}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Volver
        </Button>
        <span className="text-sm text-muted-foreground">Paso {step} de 3</span>
      </div>

      <div className="flex gap-1">
        {[1, 2, 3].map((s) => (
          <div
            key={s}
            className={`h-1 flex-1 rounded-full ${
              s <= step ? "bg-primary" : "bg-muted"
            }`}
          />
        ))}
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {step === 1 && (
          <>
            <h2 className="text-xl font-semibold">Sobre ti</h2>
            <div className="space-y-2">
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                placeholder="Cuentanos sobre ti y tu contenido..."
                {...register("bio")}
              />
              {errors.bio && (
                <p className="text-sm text-destructive">
                  {errors.bio.message}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label>Nichos</Label>
              <div className="flex flex-wrap gap-2">
                {NICHES.map((niche) => (
                  <Badge
                    key={niche}
                    variant={
                      selectedNiches.includes(niche) ? "default" : "outline"
                    }
                    className="cursor-pointer"
                    onClick={() => toggleNiche(niche)}
                  >
                    {niche}
                  </Badge>
                ))}
              </div>
              {errors.niche && (
                <p className="text-sm text-destructive">
                  {errors.niche.message}
                </p>
              )}
            </div>
            <Button type="button" onClick={() => setStep(2)} className="w-full">
              Siguiente
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </>
        )}

        {step === 2 && (
          <>
            <h2 className="text-xl font-semibold">Ubicacion</h2>
            <div className="space-y-2">
              <Label>Pais</Label>
              <Select onValueChange={(v) => setValue("country", v)}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona un pais" />
                </SelectTrigger>
                <SelectContent>
                  {COUNTRIES.map((c) => (
                    <SelectItem key={c.code} value={c.code}>
                      {c.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.country && (
                <p className="text-sm text-destructive">
                  {errors.country.message}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="city">Ciudad (opcional)</Label>
              <Input
                id="city"
                placeholder="Tu ciudad"
                {...register("city")}
              />
            </div>
            <div className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setStep(1)}
                className="flex-1"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Anterior
              </Button>
              <Button
                type="button"
                onClick={() => setStep(3)}
                className="flex-1"
              >
                Siguiente
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </>
        )}

        {step === 3 && (
          <>
            <h2 className="text-xl font-semibold">Redes sociales</h2>
            <div className="space-y-4">
              {socialLinks.map((link, index) => (
                <Card key={index}>
                  <CardContent className="p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <Select
                        value={link.platform}
                        onValueChange={(v) => {
                          const updated = [...socialLinks];
                          updated[index].platform = v as typeof link.platform;
                          setSocialLinks(updated);
                        }}
                      >
                        <SelectTrigger className="w-40">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="INSTAGRAM">Instagram</SelectItem>
                          <SelectItem value="TIKTOK">TikTok</SelectItem>
                          <SelectItem value="YOUTUBE">YouTube</SelectItem>
                          <SelectItem value="TWITTER">Twitter/X</SelectItem>
                          <SelectItem value="FACEBOOK">Facebook</SelectItem>
                        </SelectContent>
                      </Select>
                      {index > 0 && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => removeSocialLink(index)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                    <Input
                      placeholder="URL del perfil"
                      value={link.url}
                      onChange={(e) => {
                        const updated = [...socialLinks];
                        updated[index].url = e.target.value;
                        setSocialLinks(updated);
                      }}
                    />
                    <div className="grid grid-cols-2 gap-2">
                      <Input
                        placeholder="Username"
                        value={link.username}
                        onChange={(e) => {
                          const updated = [...socialLinks];
                          updated[index].username = e.target.value;
                          setSocialLinks(updated);
                        }}
                      />
                      <Input
                        type="number"
                        placeholder="Seguidores"
                        value={link.followers || ""}
                        onChange={(e) => {
                          const updated = [...socialLinks];
                          updated[index].followers =
                            parseInt(e.target.value) || 0;
                          setSocialLinks(updated);
                        }}
                      />
                    </div>
                  </CardContent>
                </Card>
              ))}
              <Button
                type="button"
                variant="outline"
                onClick={addSocialLink}
                className="w-full"
              >
                <Plus className="mr-2 h-4 w-4" />
                Agregar red social
              </Button>
            </div>
            {errors.socialLinks && (
              <p className="text-sm text-destructive">
                {typeof errors.socialLinks.message === "string"
                  ? errors.socialLinks.message
                  : "Completa los datos de al menos una red social"}
              </p>
            )}
            {errors.bio && (
              <p className="text-sm text-destructive">
                Bio: {errors.bio.message}
              </p>
            )}
            {errors.niche && (
              <p className="text-sm text-destructive">
                Nichos: {errors.niche.message}
              </p>
            )}
            {errors.country && (
              <p className="text-sm text-destructive">
                Pais: {errors.country.message}
              </p>
            )}
            <div className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setStep(2)}
                className="flex-1"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Anterior
              </Button>
              <Button type="submit" className="flex-1" disabled={isLoading}>
                {isLoading && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                Completar perfil
              </Button>
            </div>
          </>
        )}
      </form>
    </div>
  );
}

function SellerForm({
  userId,
  onBack,
  onComplete,
}: {
  userId: string;
  onBack: () => void;
  onComplete: () => Promise<void>;
}) {
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<SellerOnboardingInput>({
    resolver: zodResolver(sellerOnboardingSchema),
  });

  async function onSubmit(data: SellerOnboardingInput) {
    if (!userId) {
      toast.error("Sesion no encontrada. Recarga la pagina.");
      return;
    }
    setIsLoading(true);
    try {
      const result = await completeOnboarding(userId, "SELLER", data);
      if (result.error) {
        toast.error(result.error);
      } else if (result.success) {
        toast.success("Perfil completado!");
        await onComplete();
      }
    } catch {
      toast.error("Error al completar el perfil");
    } finally {
      setIsLoading(false);
    }
  }

  const industries = [
    "Tecnologia",
    "Moda y Accesorios",
    "Hogar y Decoracion",
    "Deportes",
    "Belleza y Cuidado Personal",
    "Alimentos y Bebidas",
    "Automotriz",
    "Juguetes y Bebes",
    "Electronica",
    "Otro",
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center">
        <Button variant="ghost" size="sm" onClick={onBack}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Volver
        </Button>
      </div>

      <div className="space-y-2">
        <h2 className="text-xl font-semibold">Datos de tu empresa</h2>
        <p className="text-sm text-muted-foreground">
          Completa la informacion de tu negocio
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="companyName">Nombre de la empresa</Label>
          <Input
            id="companyName"
            placeholder="Mi Empresa S.A."
            {...register("companyName")}
          />
          {errors.companyName && (
            <p className="text-sm text-destructive">
              {errors.companyName.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="website">Sitio web (opcional)</Label>
          <Input
            id="website"
            placeholder="https://miempresa.com"
            {...register("website")}
          />
          {errors.website && (
            <p className="text-sm text-destructive">
              {errors.website.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label>Industria</Label>
          <Select onValueChange={(v) => setValue("industry", v)}>
            <SelectTrigger>
              <SelectValue placeholder="Selecciona una industria" />
            </SelectTrigger>
            <SelectContent>
              {industries.map((i) => (
                <SelectItem key={i} value={i}>
                  {i}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.industry && (
            <p className="text-sm text-destructive">
              {errors.industry.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label>Pais</Label>
          <Select onValueChange={(v) => setValue("country", v)}>
            <SelectTrigger>
              <SelectValue placeholder="Selecciona un pais" />
            </SelectTrigger>
            <SelectContent>
              {COUNTRIES.map((c) => (
                <SelectItem key={c.code} value={c.code}>
                  {c.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.country && (
            <p className="text-sm text-destructive">
              {errors.country.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Descripcion del negocio</Label>
          <Textarea
            id="description"
            placeholder="Describe tu negocio y que tipo de productos vendes..."
            {...register("description")}
          />
          {errors.description && (
            <p className="text-sm text-destructive">
              {errors.description.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="meliSellerId">
            ID de vendedor en MercadoLibre (opcional)
          </Label>
          <Input
            id="meliSellerId"
            placeholder="123456789"
            {...register("meliSellerId")}
          />
        </div>

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Completar perfil
        </Button>
      </form>
    </div>
  );
}
