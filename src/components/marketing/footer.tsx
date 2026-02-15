import Link from "next/link";
import { Logo } from "@/components/shared/logo";

const footerLinks = {
  Plataforma: [
    { title: "Como funciona", href: "/#como-funciona" },
    { title: "Precios", href: "/#precios" },
    { title: "Para Influencers", href: "/#beneficios" },
    { title: "Para Vendedores", href: "/#beneficios" },
  ],
  Recursos: [
    { title: "Blog", href: "#" },
    { title: "Guias", href: "#" },
    { title: "API Docs", href: "#" },
    { title: "Soporte", href: "#" },
  ],
  Legal: [
    { title: "Terminos de uso", href: "#" },
    { title: "Privacidad", href: "#" },
    { title: "Cookies", href: "#" },
  ],
};

export function Footer() {
  return (
    <footer className="border-t bg-background/50">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <Logo />
            <p className="text-sm text-muted-foreground max-w-xs">
              Conectando influencers con MercadoLibre para crear oportunidades
              de monetizacion en LATAM.
            </p>
          </div>

          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="font-semibold mb-3">{category}</h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.title}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 border-t pt-8 text-center text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} LinkBridge. Todos los derechos
          reservados.
        </div>
      </div>
    </footer>
  );
}
