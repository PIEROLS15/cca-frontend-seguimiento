import type { Metadata } from "next";
import { Toaster } from "sonner";
import "./globals.css";

export const metadata: Metadata = {
  title: "CCA Seguimiento",
  description: "Proyecto base de seguimiento",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        {children}
        <Toaster richColors closeButton position="top-right" duration={3000} />
      </body>
    </html>
  );
}
