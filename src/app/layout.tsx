import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, Inter } from "next/font/google";
import { Header } from "@/shared/components/Header";
import { ServiceWorkerRegister } from "@/shared/components/ServiceWorkerRegister";
import "./globals.css";

// Typographie brand : Plus Jakarta Sans pour les titres, Inter pour le
// corps de texte/UI — conformément à TourismHub_Logo_Design_Master_Brief
// section 13. Chaque police expose sa propre variable CSS, utilisées
// séparément dans globals.css (--font-heading vs --font-sans).
const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TourismHub",
  description:
    "Parcours d'apprentissage structuré en 9 modules pour progresser dans le métier de travel agent.",
};

// "viewport" est un export séparé de "metadata" depuis les versions
// récentes de Next.js — c'est ici que va la couleur de thème (utilisée
// par le navigateur mobile pour colorer sa barre de statut).
export const viewport: Viewport = {
  themeColor: "#10b981",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="fr"
      className={`${jakarta.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <ServiceWorkerRegister />
        <Header />
        {children}
      </body>
    </html>
  );
}
