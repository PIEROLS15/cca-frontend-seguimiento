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
  return (
    <div className="space-y-4">
      {result.people.length > 0 && (
        <div className="space-y-3">
          {result.people.map((person, index) => (
            <div key={index}>
              {result.people.length > 1 && (
                <p className="text-xs text-muted-foreground mb-1">{person.role}</p>
              )}
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-muted-foreground" />
                <p className="text-sm font-semibold text-foreground">
                  {person.fullName}
                </p>
              </div>
              <div className="flex items-center gap-2 mt-1">
                <IdCard className="h-3.5 w-3.5 text-muted-foreground" />
                <p className="text-xs text-muted-foreground">
                  DNI {person.documentNumber}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {result.fields.length > 0 && (
        <div
          className={`grid gap-4 pt-2 border-t border-border ${
            result.fields.length >= 2 ? "grid-cols-2" : "grid-cols-1"
          }`}
        >
          {result.fields.map((field, index) => (
            <Field key={index} label={field.label} value={field.value} />
          ))}
        </div>
      )}
    </div>
  );
}
