"use client";

import { Sun, Moon } from "lucide-react";
import Image from "next/image";
import { useTheme } from "@/store/theme";

export function Header() {
  const { theme, toggle } = useTheme();

  return (
    <header className="border-b border-border bg-muted/60 backdrop-blur">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 py-3 flex items-center gap-3">
        <Image
          src="/images/logo_2.png"
          alt="Comunidad Campesina de Asia"
          width={40}
          height={40}
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
  );
}
