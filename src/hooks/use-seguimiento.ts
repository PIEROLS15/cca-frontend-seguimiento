"use client";

import { useState, useCallback } from "react";
import type { DocType, Result } from "@/types/seguimiento";
import { MOCK } from "@/data/mock-seguimiento";

interface UseSeguimientoReturn {
  docType: DocType;
  setDocType: (type: DocType) => void;
  code: string;
  setCode: (code: string) => void;
  tab: "info" | "history";
  setTab: (tab: "info" | "history") => void;
  queried: { type: DocType; code: string } | null;
  result: Result | null;
  handleSearch: (e: React.FormEvent) => void;
  handleClear: () => void;
}

export function useSeguimiento(): UseSeguimientoReturn {
  const [docType, setDocType] = useState<DocType>("certificado");
  const [code, setCode] = useState("");
  const [tab, setTab] = useState<"info" | "history">("info");
  const [queried, setQueried] = useState<{ type: DocType; code: string } | null>(null);

  const result: Result | null = queried
    ? MOCK[queried.type][queried.code.trim()] ?? null
    : null;

  const handleSearch = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (!code.trim()) return;
      setQueried({ type: docType, code });
      setTab("info");
    },
    [code, docType],
  );

  const handleClear = useCallback(() => {
    setCode("");
    setQueried(null);
  }, []);

  return {
    docType,
    setDocType,
    code,
    setCode,
    tab,
    setTab,
    queried,
    result,
    handleSearch,
    handleClear,
  };
}
