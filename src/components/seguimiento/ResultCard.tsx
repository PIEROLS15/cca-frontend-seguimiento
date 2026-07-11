"use client";

import type { Result } from "@/types/seguimiento";
import { DOC_META } from "@/data/mock-seguimiento";
import { InfoTab } from "./InfoTab";
import { Timeline } from "./Timeline";

interface ResultCardProps {
  result: Result;
  tab: "info" | "history";
  onTabChange: (tab: "info" | "history") => void;
}

export function ResultCard({ result, tab, onTabChange }: ResultCardProps) {
  const meta = DOC_META[result.type];
  const statusClasses =
    result.statusTone === "green"
      ? "bg-status-green-bg text-status-green-fg"
      : "bg-status-amber-bg text-status-amber-fg";

  return (
    <div>
      {/* Header */}
      <div className="p-4 sm:p-5 border-b border-border">
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span
            className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium"
            style={{ backgroundColor: meta.tagBg, color: meta.tagFg }}
          >
            {meta.label}
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
          <span className="text-xs uppercase tracking-wide text-muted-foreground">Código</span>
          <span className="font-mono text-lg font-semibold text-foreground">{result.code}</span>
        </div>
      </div>

      {/* Tabs */}
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
        {tab === "info" ? <InfoTab result={result} /> : <Timeline steps={result.timeline} />}
      </div>
    </div>
  );
}
