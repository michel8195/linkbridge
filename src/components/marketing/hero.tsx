"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-24 pb-20 md:pt-32 md:pb-28">
      {/* Gradient background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-primary/5" />
        <div className="absolute top-1/4 left-1/4 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />
      </div>

      <div className="container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border bg-background/50 backdrop-blur-sm px-4 py-2 text-sm"
        >
          <Sparkles className="h-4 w-4 text-primary" />
          <span>La plataforma #1 de afiliados en LATAM</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mx-auto max-w-4xl text-4xl font-bold tracking-tight md:text-6xl lg:text-7xl"
        >
          Monetiza tu audiencia con{" "}
          <span className="bg-gradient-to-r from-primary to-violet-400 bg-clip-text text-transparent">
            MercadoLibre
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground md:text-xl"
        >
          Conecta con miles de productos, genera links de afiliado, y gana
          comisiones por cada venta. Herramientas, templates y analytics para
          escalar tu monetizacion.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
        >
          <Button size="lg" className="text-base px-8" asChild>
            <Link href="/registro">
              Comenzar gratis
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button size="lg" variant="outline" className="text-base px-8" asChild>
            <Link href="/#como-funciona">Como funciona</Link>
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mt-16 mx-auto max-w-5xl"
        >
          <div className="rounded-xl border bg-card/50 backdrop-blur-sm p-2 shadow-2xl shadow-primary/5">
            <div className="rounded-lg bg-gradient-to-br from-primary/5 to-primary/10 p-8 md:p-12">
              <div className="grid grid-cols-3 gap-6 text-center">
                <div>
                  <p className="text-3xl font-bold md:text-4xl">10K+</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Influencers activos
                  </p>
                </div>
                <div>
                  <p className="text-3xl font-bold md:text-4xl">50K+</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Productos disponibles
                  </p>
                </div>
                <div>
                  <p className="text-3xl font-bold md:text-4xl">$2M+</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Comisiones generadas
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
