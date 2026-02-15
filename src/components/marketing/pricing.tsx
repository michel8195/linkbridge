"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PRICING_TIERS } from "@/lib/constants";

export function Pricing() {
  return (
    <section id="precios" className="py-20 md:py-28">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold md:text-4xl">
            Planes para cada necesidad
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Comienza gratis y escala cuando estes listo
          </p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-3 max-w-5xl mx-auto">
          {PRICING_TIERS.map((tier, index) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative rounded-2xl border p-8 ${
                tier.highlighted
                  ? "border-primary bg-primary/5 shadow-lg shadow-primary/10"
                  : "bg-card"
              }`}
            >
              {tier.highlighted && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-4 py-1 text-xs font-medium text-primary-foreground">
                  Mas popular
                </div>
              )}
              <div className="mb-6">
                <h3 className="text-xl font-semibold">{tier.name}</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  {tier.description}
                </p>
                <p className="text-3xl font-bold mt-4">{tier.price}</p>
              </div>
              <ul className="space-y-3 mb-8">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
              <Button
                className="w-full"
                variant={tier.highlighted ? "default" : "outline"}
                asChild
              >
                <Link href="/registro">{tier.cta}</Link>
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
