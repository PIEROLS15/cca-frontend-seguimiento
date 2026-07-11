"use client";

import { FileText, ClipboardList, Users } from "lucide-react";
import type { DocType } from "@/types/seguimiento";

const DOC_META: Record<DocType, { label: string }> = {
  certificado: { label: "Certificado" },
  solicitud: { label: "Solicitud de certificado" },
  acta: { label: "Acta de asamblea" },
};

const DOC_ICONS: Record<DocType, typeof FileText> = {
  certificado: FileText,
  solicitud: ClipboardList,
  acta: Users,
};

interface DocumentTypeToggleProps {
  value: DocType;
  onChange: (type: DocType) => void;
}

export function DocumentTypeToggle({ value, onChange }: DocumentTypeToggleProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
      {(Object.keys(DOC_META) as DocType[]).map((t) => {
        const meta = DOC_META[t];
        const Icon = DOC_ICONS[t];
        const active = value === t;
        return (
          <button
            key={t}
            type="button"
            onClick={() => onChange(t)}
            className={
              "flex items-center justify-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors " +
              (active
                ? "border-2 border-primary bg-primary-soft text-primary-strong"
                : "border border-border bg-muted text-muted-foreground hover:bg-muted/70")
            }
          >
            <Icon className="h-4 w-4" />
            {meta.label}
          </button>
        );
      })}
    </div>
  );
}
