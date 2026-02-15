import type { NavItem } from "@/types";

export const marketingNav: NavItem[] = [
  { title: "Inicio", href: "/" },
  { title: "Como funciona", href: "/#como-funciona" },
  { title: "Precios", href: "/#precios" },
];

export const influencerNav: NavItem[] = [
  { title: "Overview", href: "/influencer", icon: "LayoutDashboard" },
  { title: "Catalogo", href: "/influencer/catalogo", icon: "ShoppingBag" },
  { title: "Mis Links", href: "/influencer/links", icon: "Link" },
  { title: "Contenido", href: "/influencer/contenido", icon: "FileText" },
  { title: "Campanas", href: "/influencer/campanas", icon: "Megaphone" },
  { title: "Ganancias", href: "/influencer/ganancias", icon: "DollarSign" },
  { title: "Perfil", href: "/influencer/perfil", icon: "User" },
];

export const sellerNav: NavItem[] = [
  { title: "Overview", href: "/vendedor", icon: "LayoutDashboard" },
  { title: "Campanas", href: "/vendedor/campanas", icon: "Megaphone" },
  { title: "Influencers", href: "/vendedor/influencers", icon: "Users" },
  { title: "Facturacion", href: "/vendedor/facturacion", icon: "Receipt" },
  { title: "Perfil", href: "/vendedor/perfil", icon: "User" },
];

export const adminNav: NavItem[] = [
  { title: "Overview", href: "/admin", icon: "LayoutDashboard" },
  { title: "Usuarios", href: "/admin/usuarios", icon: "Users" },
  { title: "Productos", href: "/admin/productos", icon: "Package" },
  { title: "Plantillas", href: "/admin/plantillas", icon: "FileText" },
  { title: "Analiticas", href: "/admin/analiticas", icon: "BarChart3" },
  { title: "Ingresos", href: "/admin/ingresos", icon: "DollarSign" },
];
