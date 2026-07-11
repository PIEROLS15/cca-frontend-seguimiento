"use client";

import { Suspense } from "react";
import { SeguimientoPage } from "@/components/seguimiento/SeguimientoPage";

export default function Home() {
  return (
    <Suspense>
      <SeguimientoPage />
    </Suspense>
  );
}
