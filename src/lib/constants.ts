export const siteConfig = {
  name: "LinkBridge",
  description:
    "Conecta micro y nano influencers con el programa de afiliados de MercadoLibre",
  url: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
};

export const NICHES = [
  "Tecnologia",
  "Moda",
  "Belleza",
  "Hogar",
  "Deportes",
  "Gaming",
  "Cocina",
  "Mascotas",
  "Bebes",
  "Salud",
  "Libros",
  "Musica",
  "Viajes",
  "Automotriz",
] as const;

export const COUNTRIES = [
  { code: "AR", name: "Argentina", currency: "ARS" },
  { code: "MX", name: "Mexico", currency: "MXN" },
  { code: "CO", name: "Colombia", currency: "COP" },
  { code: "CL", name: "Chile", currency: "CLP" },
  { code: "BR", name: "Brasil", currency: "BRL" },
  { code: "UY", name: "Uruguay", currency: "UYU" },
  { code: "PE", name: "Peru", currency: "PEN" },
] as const;

export const PRICING_TIERS = [
  {
    name: "Starter",
    price: "Gratis",
    description: "Para influencers que recien empiezan",
    features: [
      "Acceso al catalogo de productos",
      "Generacion de links de afiliado",
      "Templates basicos de contenido",
      "Dashboard de estadisticas",
    ],
    cta: "Comenzar gratis",
    highlighted: false,
  },
  {
    name: "Pro",
    price: "$29/mes",
    description: "Para influencers serios sobre monetizacion",
    features: [
      "Todo de Starter",
      "Templates premium de contenido",
      "Analytics avanzados",
      "Acceso prioritario a campanas",
      "Soporte prioritario",
    ],
    cta: "Comenzar prueba gratis",
    highlighted: true,
  },
  {
    name: "Business",
    price: "Personalizado",
    description: "Para sellers que quieren escalar",
    features: [
      "Creacion ilimitada de campanas",
      "Red completa de influencers",
      "Analytics en tiempo real",
      "Manager dedicado",
      "API access",
    ],
    cta: "Contactar ventas",
    highlighted: false,
  },
] as const;
