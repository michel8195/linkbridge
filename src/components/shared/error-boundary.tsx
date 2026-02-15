"use client";

import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ErrorBoundaryProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export function ErrorBoundary({ error, reset }: ErrorBoundaryProps) {
  return (
    <div className="flex h-full min-h-[400px] flex-col items-center justify-center gap-4">
      <AlertTriangle className="h-10 w-10 text-destructive" />
      <h2 className="text-xl font-semibold">Algo salio mal</h2>
      <p className="text-muted-foreground">{error.message}</p>
      <Button onClick={reset}>Intentar de nuevo</Button>
    </div>
  );
}
