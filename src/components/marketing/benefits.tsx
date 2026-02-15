"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BarChart3,
  FileText,
  Link,
  Target,
  Users,
  TrendingUp,
  Megaphone,
  Eye,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const influencerBenefits = [
  {
    icon: Link,
    title: "Generador de links",
    description: "Crea links de afiliado con short codes y tracking avanzado.",
  },
  {
    icon: FileText,
    title: "Templates de contenido",
    description: "Accede a templates optimizados para cada red social y nicho.",
  },
  {
    icon: BarChart3,
    title: "Analytics en tiempo real",
    description: "Trackea clicks, conversiones y ganancias desde tu dashboard.",
  },
  {
    icon: Target,
    title: "Campanas exclusivas",
    description:
      "Postulate a campanas de sellers y gana comisiones adicionales.",
  },
];

const sellerBenefits = [
  {
    icon: Users,
    title: "Red de influencers",
    description: "Accede a miles de micro/nano influencers verificados.",
  },
  {
    icon: Megaphone,
    title: "Campanas dirigidas",
    description:
      "Crea campanas segmentadas por nicho, plataforma y ubicacion.",
  },
  {
    icon: Eye,
    title: "Visibilidad de marca",
    description: "Aumenta la exposicion de tus productos en redes sociales.",
  },
  {
    icon: TrendingUp,
    title: "ROI medible",
    description: "Metricas claras de cada campana: clicks, ventas, ROAS.",
  },
];

export function Benefits() {
  const [activeTab, setActiveTab] = useState<"influencer" | "seller">(
    "influencer"
  );

  const benefits =
    activeTab === "influencer" ? influencerBenefits : sellerBenefits;

  return (
    <section id="beneficios" className="py-20 md:py-28 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold md:text-4xl">
            Beneficios para todos
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Herramientas poderosas tanto para influencers como para vendedores
          </p>
        </motion.div>

        <div className="flex justify-center mb-12">
          <div className="inline-flex rounded-lg border bg-background p-1">
            <Button
              variant={activeTab === "influencer" ? "default" : "ghost"}
              size="sm"
              onClick={() => setActiveTab("influencer")}
            >
              Para Influencers
            </Button>
            <Button
              variant={activeTab === "seller" ? "default" : "ghost"}
              size="sm"
              onClick={() => setActiveTab("seller")}
            >
              Para Vendedores
            </Button>
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="grid gap-6 md:grid-cols-2 lg:grid-cols-4"
          >
            {benefits.map((benefit) => (
              <div
                key={benefit.title}
                className="rounded-xl border bg-card p-6 transition-all hover:shadow-lg hover:border-primary/50"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 mb-4">
                  <benefit.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">{benefit.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {benefit.description}
                </p>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
