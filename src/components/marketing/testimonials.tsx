"use client";

import { motion } from "framer-motion";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const testimonials = [
  {
    name: "Maria Garcia",
    role: "Influencer de Moda",
    content:
      "LinkBridge me ayudo a monetizar mi Instagram de una forma que nunca imagine. Los templates de contenido son increibles.",
    followers: "25K seguidores",
  },
  {
    name: "Carlos Rodriguez",
    role: "Vendedor MeLi",
    content:
      "Desde que empezamos a usar LinkBridge, nuestras ventas por redes sociales crecieron un 300%. La plataforma es intuitiva.",
    followers: "500+ productos",
  },
  {
    name: "Ana Martinez",
    role: "Influencer de Tech",
    content:
      "El dashboard de analytics es de otro nivel. Puedo ver exactamente que contenido genera mas ventas y optimizar mi estrategia.",
    followers: "40K seguidores",
  },
];

export function Testimonials() {
  return (
    <section className="py-20 md:py-28 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold md:text-4xl">
            Lo que dicen nuestros usuarios
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Miles de influencers y vendedores ya confian en LinkBridge
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-3 max-w-5xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="rounded-2xl border bg-card/50 backdrop-blur-sm p-6 space-y-4"
            >
              <p className="text-sm text-muted-foreground leading-relaxed">
                &ldquo;{testimonial.content}&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarFallback className="bg-primary/10 text-primary">
                    {testimonial.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold text-sm">{testimonial.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {testimonial.role} &middot; {testimonial.followers}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
