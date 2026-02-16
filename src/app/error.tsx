"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[AppError]", {
      message: error.message,
      digest: error.digest,
      timestamp: new Date().toISOString(),
    });
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4">
      <h1 className="text-4xl font-bold text-destructive">Error</h1>
      <h2 className="text-xl font-semibold">Algo salio mal</h2>
      <p className="text-muted-foreground text-center max-w-md">
        Ocurrio un error inesperado. Por favor intenta de nuevo.
      </p>
      {error.digest && (
        <p className="text-xs text-muted-foreground font-mono">
          Ref: {error.digest}
        </p>
      )}
      <div className="flex gap-2">
        <Button onClick={reset}>Reintentar</Button>
        <Button variant="outline" onClick={() => (window.location.href = "/")}>
          Ir al inicio
        </Button>
      </div>
    </div>
  );
}
