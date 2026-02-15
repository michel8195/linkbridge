import Link from "next/link";
import { LoginForm } from "@/components/auth/login-form";

export const metadata = {
  title: "Iniciar sesion",
};

export default function LoginPage() {
  return (
    <>
      <div className="space-y-2">
        <h1 className="text-2xl font-bold">Iniciar sesion</h1>
        <p className="text-muted-foreground">
          Ingresa tus credenciales para acceder a tu cuenta
        </p>
      </div>

      <LoginForm />

      <p className="text-center text-sm text-muted-foreground">
        No tienes una cuenta?{" "}
        <Link
          href="/registro"
          className="font-medium text-primary hover:underline"
        >
          Registrate
        </Link>
      </p>
    </>
  );
}
