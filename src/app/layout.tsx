import type { Metadata } from "next";
import { Toaster } from "sonner";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sistema de Seguimiento de Trámites · Comunidad Campesina de Asia",
  description:
    "Consulta el estado de tus trámites en la Comunidad Campesina de Asia: certificados, solicitudes y actas de asamblea.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="h-full antialiased" suppressHydrationWarning>
      <body className="min-h-full flex flex-col">
        <ThemeProvider>{children}</ThemeProvider>
        <Toaster richColors closeButton position="top-right" duration={3000} />
      </body>
    </html>
  );
}
