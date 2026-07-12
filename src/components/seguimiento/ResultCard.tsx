"use client";

import type { Result } from "@/types/seguimiento";
import { InfoTab } from "./InfoTab";
import { Timeline } from "./Timeline";

interface ResultCardProps {
  result: Result;
  tab: "info" | "history";
  onTabChange: (tab: "info" | "history") => void;
}

const TAG_STYLES: Record<string, { bg: string; fg: string }> = {
  certificate: { bg: "var(--tag-cert-bg)", fg: "var(--tag-cert-fg)" },
  certificate_request: { bg: "var(--tag-sol-bg)", fg: "var(--tag-sol-fg)" },
  assembly_record_request: { bg: "var(--tag-acta-bg)", fg: "var(--tag-acta-fg)" },
};

export function ResultCard({ result, tab, onTabChange }: ResultCardProps) {
  const tagStyle = TAG_STYLES[result.documentType] ?? {
    bg: "var(--tag-cert-bg)",
    fg: "var(--tag-cert-fg)",
  };

  const statusClasses =
    result.statusTone === "green"
      ? "bg-status-green-bg text-status-green-fg"
      : result.statusTone === "red"
        ? "bg-destructive/10 text-destructive border border-destructive/20"
        : "bg-status-amber-bg text-status-amber-fg";

  return (
    <div>
      <div className="p-4 sm:p-5 border-b border-border">
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span
            className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium"
            style={{ backgroundColor: tagStyle.bg, color: tagStyle.fg }}
          >
            {result.title}
          </span>
          <span
            className={
              "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ml-auto " +
              statusClasses
            }
          >
            {result.currentStatus}
          </span>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-xs uppercase tracking-wide text-muted-foreground">
            Código
          </span>
          <span className="font-mono text-lg font-semibold text-foreground">
            {result.code}
          </span>
        </div>
      </div>

      <div className="flex border-b border-border">
        {(["info", "history"] as const).map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => onTabChange(t)}
            className={
              "flex-1 px-4 py-2.5 text-sm font-medium transition-colors " +
              (tab === t
                ? "border-b-2 border-primary text-primary-strong"
                : "border-b-2 border-transparent text-muted-foreground hover:text-foreground")
            }
          >
            {t === "info" ? "Información" : "Historial"}
          </button>
        ))}
      </div>

      <div className="p-4 sm:p-5">
        {tab === "info" ? (
          <InfoTab result={result} />
        ) : (
          <Timeline steps={result.timeline} />
        )}
      </div>
    </div>
  );
}
