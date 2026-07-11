"use client";

import { User, IdCard } from "lucide-react";
import type { Result } from "@/types/seguimiento";

interface InfoTabProps {
  result: Result;
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div className="min-w-0">
      <p className="text-xs text-muted-foreground uppercase tracking-wide">{label}</p>
      <p className="text-sm font-medium text-foreground truncate">{value}</p>
    </div>
  );
}

export function InfoTab({ result }: InfoTabProps) {
  if (result.type === "acta") {
    return (
      <div className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="rounded-lg border border-border p-3">
            <p className="text-xs text-muted-foreground mb-1">Comprador</p>
            <div className="flex items-center gap-2">
              <User className="h-4 w-4 text-muted-foreground" />
              <p className="text-sm font-semibold">{result.comprador}</p>
            </div>
            <div className="flex items-center gap-2 mt-1">
              <IdCard className="h-3.5 w-3.5 text-muted-foreground" />
              <p className="text-xs text-muted-foreground">DNI {result.compradorDni}</p>
            </div>
          </div>
          <div className="rounded-lg border border-border p-3">
            <p className="text-xs text-muted-foreground mb-1">Vendedor</p>
            <div className="flex items-center gap-2">
              <User className="h-4 w-4 text-muted-foreground" />
              <p className="text-sm font-semibold">{result.vendedor}</p>
            </div>
            <div className="flex items-center gap-2 mt-1">
              <IdCard className="h-3.5 w-3.5 text-muted-foreground" />
              <p className="text-xs text-muted-foreground">DNI {result.vendedorDni}</p>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 pt-2">
          <Field label="Ubicación" value={result.ubicacion} />
          <Field label="Tipo de terreno" value={result.tipoTerreno} />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div>
        <div className="flex items-center gap-2">
          <User className="h-4 w-4 text-muted-foreground" />
          <p className="text-sm font-semibold text-foreground">{result.fullName}</p>
        </div>
        <div className="flex items-center gap-2 mt-1">
          <IdCard className="h-3.5 w-3.5 text-muted-foreground" />
          <p className="text-xs text-muted-foreground">DNI {result.dni}</p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 pt-2 border-t border-border">
        {result.type === "certificado" ? (
          <>
            <Field label="Ubicación" value={result.ubicacion} />
            <Field label="Tipo de terreno" value={result.tipoTerreno} />
            <Field label="Manzana" value={result.manzana} />
            <Field label="Lote" value={result.lote} />
          </>
        ) : (
          <>
            <Field label="Descripción" value={result.descripcion} />
            <Field label="Tipo de solicitud" value={result.tipoSolicitud} />
            <Field label="Sector" value={result.sector} />
            <Field label="Destino" value={result.destino} />
          </>
        )}
      </div>
    </div>
  );
}
