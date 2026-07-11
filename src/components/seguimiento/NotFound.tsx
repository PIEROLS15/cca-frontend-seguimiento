"use client";

import { AlertCircle } from "lucide-react";

interface NotFoundProps {
  message?: string;
}

export function NotFound({ message }: NotFoundProps) {
  return (
    <div className="p-8 text-center">
      <div className="mx-auto h-12 w-12 rounded-full bg-status-amber-bg flex items-center justify-center mb-3">
        <AlertCircle className="h-6 w-6 text-status-amber-fg" />
      </div>
      <p className="text-base font-semibold text-foreground">
        {message || "No encontramos ningún trámite con ese código"}
      </p>
      <p className="text-sm text-muted-foreground mt-1">
        Verifica el código e intenta nuevamente, o comunícate con secretaría
      </p>
    </div>
  );
}
