"use client";

import { motion } from "framer-motion";
import { UserPlus, ShoppingBag, DollarSign } from "lucide-react";

const steps = [
  {
    icon: UserPlus,
    title: "Crea tu cuenta",
    description:
      "Registrate gratis y completa tu perfil como influencer o vendedor en menos de 2 minutos.",
  },
  {
    icon: ShoppingBag,
    title: "Explora y comparte",
    description:
      "Navega el catalogo curado de productos de MercadoLibre, genera tus links de afiliado y comparte con tu audiencia.",
  },
  {
    icon: DollarSign,
    title: "Gana comisiones",
    description:
      "Recibe comisiones por cada venta generada. Trackea tu performance en tiempo real desde el dashboard.",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export function HowItWorks() {
  return (
    <section id="como-funciona" className="py-20 md:py-28">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold md:text-4xl">Como funciona</h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Tres simples pasos para comenzar a monetizar tu audiencia
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid gap-8 md:grid-cols-3"
        >
          {steps.map((step, index) => (
            <motion.div key={step.title} variants={itemVariants}>
              <div className="relative flex flex-col items-center text-center p-6">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 mb-6">
                  <step.icon className="h-8 w-8 text-primary" />
                </div>
                <span className="absolute top-4 right-4 text-6xl font-bold text-muted/30">
                  {index + 1}
                </span>
                <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
