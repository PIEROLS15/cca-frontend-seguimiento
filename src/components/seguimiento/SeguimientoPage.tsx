"use client";

import Image from "next/image";
import { Loader2 } from "lucide-react";
import { useSeguimiento } from "@/hooks/use-seguimiento";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { DocumentTypeToggle } from "./DocumentTypeToggle";
import { SearchForm } from "./SearchForm";
import { ResultCard } from "./ResultCard";
import { NotFound } from "./NotFound";

export function SeguimientoPage() {
  const {
    docType,
    setDocType,
    code,
    setCode,
    tab,
    setTab,
    queried,
    result,
    loading,
    error,
    handleSearch,
    handleClear,
  } = useSeguimiento();

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1 mx-auto w-full max-w-3xl px-4 sm:px-6 py-8 sm:py-12">
        <div className="flex justify-center mb-6">
          <Image
            src="/images/logo.png"
            alt="Comunidad Campesina de Asia"
            width={192}
            height={96}
            className="h-20 sm:h-24 w-auto"
          />
        </div>

        <div className="text-center mb-6">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
            Consulta el estado de tu trámite
          </h2>
          <p className="mt-2 text-sm sm:text-base text-muted-foreground">
            Selecciona el tipo de documento e ingresa tu código
          </p>
        </div>

        <div className="mb-4">
          <DocumentTypeToggle value={docType} onChange={setDocType} />
        </div>

        <div className="mb-6">
          <SearchForm
            value={code}
            onChange={setCode}
            onSubmit={handleSearch}
            loading={loading}
          />
        </div>

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

        {loading && (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
            <span className="ml-2 text-sm text-muted-foreground">
              Consultando...
            </span>
          </div>
        )}

        {!loading && error && (
          <div className="rounded-xl border border-border bg-card shadow-sm overflow-hidden">
            <NotFound message={error} />
          </div>
        )}

        {!loading && !error && queried && result && (
          <div className="rounded-xl border border-border bg-card shadow-sm overflow-hidden">
            <ResultCard result={result} tab={tab} onTabChange={setTab} />
          </div>
        )}

        {!loading && !error && queried && !result && (
          <div className="rounded-xl border border-border bg-card shadow-sm overflow-hidden">
            <NotFound />
          </div>
        )}

        {!queried && (
          <div className="mt-6" />
        )}
      </main>

      <Footer />
    </div>
  );
}
