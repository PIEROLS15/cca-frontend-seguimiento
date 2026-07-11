"use client";

import { Search } from "lucide-react";

interface SearchFormProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export function SearchForm({ value, onChange, onSubmit }: SearchFormProps) {
  return (
    <form onSubmit={onSubmit} className="flex flex-col sm:flex-row gap-2">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Ingresa el código de tu trámite"
          className="w-full rounded-lg border border-input bg-card pl-10 pr-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring/40 focus:border-primary"
        />
      </div>
      <button
        type="submit"
        className="rounded-lg px-5 py-2.5 text-sm font-semibold bg-primary text-primary-foreground transition-colors hover:opacity-90"
      >
        Consultar
      </button>
    </form>
  );
}
