import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Header } from "@/shared/components/Header";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Travel Operations Academy",
  description:
    "Parcours d'apprentissage structuré en 9 modules pour progresser dans le métier de travel agent.",
};

// "viewport" est un export séparé de "metadata" depuis les versions
// récentes de Next.js — c'est ici que va la couleur de thème (utilisée
// par le navigateur mobile pour colorer sa barre de statut).
export const viewport: Viewport = {
  themeColor: "#0d9488",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="fr"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Header />
        {children}
      </body>
    </html>
  );
}
