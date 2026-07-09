"use client";

import { useState } from "react";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "@/store/theme";
import type { DocType, Result } from "@/types/seguimiento";
import { MOCK } from "@/data/mock-seguimiento";
import {
  DocumentTypeToggle,
  SearchForm,
  ResultCard,
  NotFound,
} from "@/components/seguimiento";

export default function Home() {
  const [docType, setDocType] = useState<DocType>("certificado");
  const [code, setCode] = useState("");
  const [tab, setTab] = useState<"info" | "history">("info");
  const [queried, setQueried] = useState<{ type: DocType; code: string } | null>(null);
  const { theme, toggle } = useTheme();

  const result: Result | null = queried
    ? MOCK[queried.type][queried.code.trim()] ?? null
    : null;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!code.trim()) return;
    setQueried({ type: docType, code });
    setTab("info");
  };

  const handleClear = () => {
    setCode("");
    setQueried(null);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* NAVBAR */}
      <header className="border-b border-border bg-muted/60 backdrop-blur">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 py-3 flex items-center gap-3">
          <img
            src="/images/logo_2.png"
            alt="Comunidad Campesina de Asia"
            className="h-10 w-auto object-contain shrink-0"
          />
          <div className="flex-1 min-w-0">
            <h1 className="text-sm sm:text-base font-semibold text-foreground truncate">
              Sistema de seguimiento
            </h1>
          </div>
          <button
            type="button"
            onClick={toggle}
            aria-label="Cambiar tema"
            className="ml-2 h-9 w-9 rounded-lg border border-border bg-card text-foreground flex items-center justify-center hover:bg-muted transition-colors"
          >
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
        </div>
      </header>

      <main className="flex-1 mx-auto w-full max-w-3xl px-4 sm:px-6 py-8 sm:py-12">
        {/* LOGO */}
        <div className="flex justify-center mb-6">
          <img
            src="/images/logo.png"
            alt="Comunidad Campesina de Asia"
            className="h-20 sm:h-24 w-auto"
          />
        </div>

        {/* HERO */}
        <div className="text-center mb-6">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
            Consulta el estado de tu trámite
          </h2>
          <p className="mt-2 text-sm sm:text-base text-muted-foreground">
            Selecciona el tipo de documento e ingresa tu código
          </p>
        </div>

        {/* DOC TYPE TOGGLE */}
        <div className="mb-4">
          <DocumentTypeToggle value={docType} onChange={setDocType} />
        </div>

        {/* SEARCH FORM */}
        <div className="mb-6">
          <SearchForm value={code} onChange={setCode} onSubmit={handleSearch} />
        </div>

        {/* CLEAR BUTTON */}
        {queried && (
          <div className="flex justify-end mb-4">
            <button
              type="button"
              onClick={handleClear}
              className="text-xs sm:text-sm text-muted-foreground hover:text-foreground underline underline-offset-2"
            >
              Limpiar búsqueda
            </button>
          </div>
        )}

        {/* RESULT */}
        {queried && (
          <div className="rounded-xl border border-border bg-card shadow-sm overflow-hidden">
            {result ? (
              <ResultCard result={result} tab={tab} onTabChange={setTab} />
            ) : (
              <NotFound />
            )}
          </div>
        )}

        {/* Sample codes hint */}
        {!queried && (
          <p className="text-center text-xs text-muted-foreground mt-6">
            Códigos de prueba: <code className="font-mono">023665</code>,{" "}
            <code className="font-mono">003205-26</code>,{" "}
            <code className="font-mono">018461</code>
          </p>
        )}
      </main>

      <footer className="border-t border-border py-6">
        <p className="text-center text-xs text-muted-foreground px-4">
          Comunidad Campesina de Asia · Para consultas comunícate con secretaría
        </p>
      </footer>
    </div>
  );
}
