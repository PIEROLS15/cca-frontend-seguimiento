"use client";

import { useState, useCallback, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import type { DocType, Result, TimelineStepStatus, StatusTone } from "@/types/seguimiento";
import {
  fetchDocumentTracking,
  type TrackingResponse,
} from "@/services/tracking.service";

const DOC_TYPE_MAP: Record<DocType, string> = {
  certificado: "certificado",
  solicitud: "solicitud-de-certificado",
  acta: "acta",
};

const REVERSE_DOC_TYPE_MAP: Record<string, DocType> = {
  certificate: "certificado",
  certificate_request: "solicitud",
  assembly_record_request: "acta",
};

interface UseSeguimientoReturn {
  docType: DocType;
  setDocType: (type: DocType) => void;
  code: string;
  setCode: (code: string) => void;
  tab: "info" | "history";
  setTab: (tab: "info" | "history") => void;
  queried: { type: DocType; code: string } | null;
  result: Result | null;
  loading: boolean;
  error: string | null;
  handleSearch: (e: React.FormEvent) => Promise<void>;
  handleClear: () => void;
}

function mapTimelineStatus(done: boolean, date: string | null, index: number, history: TrackingResponse["history"]): TimelineStepStatus {
  if (done) return "done";

  const lastDoneIndex = history.reduce(
    (acc, step, i) => (step.done ? i : acc),
    -1
  );

  if (index === lastDoneIndex + 1 && date !== null) return "active";

  return "pending";
}

function mapStatusTone(history: TrackingResponse["history"]): StatusTone {
  const allDone = history.every((step) => step.done);
  return allDone ? "green" : "amber";
}

function transformResponse(data: TrackingResponse): Result {
  const timeline = data.history.map((step, i) => ({
    label: step.status,
    date: step.date,
    status: mapTimelineStatus(step.done, step.date, i, data.history),
  }));

  return {
    documentType: data.documentType,
    title: data.title,
    code: data.code,
    currentStatus: data.currentStatus,
    statusTone: mapStatusTone(data.history),
    people: data.information.people,
    fields: data.information.fields,
    timeline,
  };
}

function getFriendlyError(err: unknown): string {
  if (err instanceof Error) {
    const msg = err.message;
    if (msg.includes("404") || msg.includes("Not Found")) {
      return "No encontramos ningún trámite con ese código";
    }
    if (msg.includes("400") || msg.includes("Bad Request")) {
      return "No encontramos ningún trámite con ese código";
    }
    if (msg.includes("Failed to fetch") || msg.includes("NetworkError")) {
      return "No se pudo conectar con el servidor. Intenta nuevamente.";
    }
    return msg;
  }
  return "Error al consultar el documento";
}

export function useSeguimiento(): UseSeguimientoReturn {
  const searchParams = useSearchParams();
  const router = useRouter();

  const initialType = (searchParams.get("type") as DocType) || "certificado";
  const initialCode = searchParams.get("code") || "";
  const initialTab = (searchParams.get("tab") as "info" | "history") || "info";

  const [docType, setDocType] = useState<DocType>(initialType);
  const [code, setCode] = useState(initialCode);
  const [tab, setTab] = useState<"info" | "history">(initialTab);
  const [queried, setQueried] = useState<{ type: DocType; code: string } | null>(null);
  const [result, setResult] = useState<Result | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [initialLoadDone, setInitialLoadDone] = useState(false);

  const updateURL = useCallback(
    (type: DocType, searchCode: string, activeTab: "info" | "history") => {
      const params = new URLSearchParams();
      params.set("type", type);
      params.set("code", searchCode);
      params.set("tab", activeTab);
      router.replace(`?${params.toString()}`, { scroll: false });
    },
    [router]
  );

  const executeSearch = useCallback(
    async (type: DocType, searchCode: string, initialTab?: "info" | "history") => {
      setLoading(true);
      setError(null);
      setQueried({ type, code: searchCode });
      setTab(initialTab || "info");

      try {
        const backendType = DOC_TYPE_MAP[type];
        const data = await fetchDocumentTracking(backendType, searchCode.trim());
        setResult(transformResponse(data));
      } catch (err) {
        setResult(null);
        setError(getFriendlyError(err));
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const handleSearch = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (!code.trim()) return;
      updateURL(docType, code.trim(), "info");
      await executeSearch(docType, code.trim());
    },
    [code, docType, updateURL, executeSearch]
  );

  const handleTabChange = useCallback(
    (newTab: "info" | "history") => {
      setTab(newTab);
      if (queried) {
        updateURL(queried.type, queried.code, newTab);
      }
    },
    [queried, updateURL]
  );

  const handleClear = useCallback(() => {
    setCode("");
    setDocType("certificado");
    setQueried(null);
    setResult(null);
    setError(null);
    setTab("info");
    setInitialLoadDone(false);
    window.location.href = "/";
  }, []);

  useEffect(() => {
    if (initialCode && !initialLoadDone) {
      setInitialLoadDone(true);
      executeSearch(initialType, initialCode, initialTab);
    }
  }, [initialCode, initialType, initialTab, initialLoadDone, executeSearch]);

  return {
    docType,
    setDocType,
    code,
    setCode,
    tab,
    setTab: handleTabChange,
    queried,
    result,
    loading,
    error,
    handleSearch,
    handleClear,
  };
}
