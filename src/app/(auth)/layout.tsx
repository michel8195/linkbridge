import { Logo } from "@/components/shared/logo";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <div className="hidden lg:flex lg:flex-col lg:justify-between bg-primary/5 p-10">
        <Logo />
        <div className="space-y-4">
          <h2 className="text-3xl font-bold">
            Monetiza tu audiencia con{" "}
            <span className="text-primary">MercadoLibre</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Conecta con miles de productos, genera links de afiliado y gana
            comisiones por cada venta.
          </p>
        </div>
        <p className="text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} LinkBridge. Todos los derechos
          reservados.
        </p>
      </div>
      <div className="flex items-center justify-center p-6 lg:p-10">
        <div className="w-full max-w-md space-y-6">
          <div className="lg:hidden mb-8">
            <Logo />
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}
