import Link from "next/link";
import { RegisterForm } from "@/components/auth/register-form";

export const metadata = {
  title: "Crear cuenta",
};

export default function RegisterPage() {
  return (
    <>
      <div className="space-y-2">
        <h1 className="text-2xl font-bold">Crear cuenta</h1>
        <p className="text-muted-foreground">
          Completa tus datos para comenzar a usar LinkBridge
        </p>
      </div>

      <RegisterForm />

      <p className="text-center text-sm text-muted-foreground">
        Ya tienes una cuenta?{" "}
        <Link
          href="/login"
          className="font-medium text-primary hover:underline"
        >
          Iniciar sesion
        </Link>
      </p>
    </>
  );
}
