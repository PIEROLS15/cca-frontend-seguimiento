"use client";

import { Check, Loader2 } from "lucide-react";
import type { TimelineStep } from "@/types/seguimiento";

interface TimelineProps {
  steps: TimelineStep[];
}

function formatDate(dateString: string): string {
  const cleaned = dateString.replace(/\.\d+$/, "");
  const parts = cleaned.split("T");
  const dateParts = parts[0].split("-");
  const timeParts = (parts[1] || "").replace(/(Z|[+-]\d{2}:\d{2})$/, "").split(":");
  const day = dateParts[2];
  const month = dateParts[1];
  const year = dateParts[0];
  const hours = timeParts[0];
  const minutes = timeParts[1];
  return `${day}/${month}/${year}, ${hours}:${minutes}`;
}

export function Timeline({ steps }: TimelineProps) {
  return (
    <ol className="relative">
      {steps.map((step, i) => {
        const isLast = i === steps.length - 1;
        const nextDone = !isLast && steps[i + 1].status !== "pending";
        return (
          <li key={i} className="flex gap-3 pb-5 last:pb-0 relative">
            <div className="flex flex-col items-center">
              <div
                className={
                  "h-8 w-8 rounded-full flex items-center justify-center shrink-0 z-10 " +
                  (step.status === "done"
                    ? "bg-status-green-fg text-status-green-bg"
                    : step.status === "active"
                      ? "bg-status-amber-fg text-status-amber-bg animate-pulse"
                      : "bg-muted text-muted-foreground border border-border")
                }
              >
                {step.status === "done" ? (
                  <Check className="h-4 w-4" />
                ) : step.status === "active" ? (
                  <Loader2 className="h-4 w-4" />
                ) : (
                  <span className="h-2 w-2 rounded-full bg-current" />
                )}
              </div>
              {!isLast && (
                <div
                  className={
                    "w-0.5 flex-1 mt-1 " +
                    (step.status === "done" && nextDone
                      ? "bg-status-green-fg"
                      : step.status === "done"
                        ? "bg-gradient-to-b from-status-green-fg to-border"
                        : "bg-border")
                  }
                  style={{ minHeight: "1.5rem" }}
                />
              )}
            </div>
            <div className="pb-2 pt-1">
              <p
                className={
                  "text-sm font-medium " +
                  (step.status === "pending" ? "text-muted-foreground" : "text-foreground")
                }
              >
                {step.label}
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">
                {step.date ? formatDate(step.date) : "Pendiente"}
              </p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
