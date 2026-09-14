// shared/components/Header.tsx
//
// Header global de l'app — brief section 11 : fin, discret, sticky,
// fond clair/translucide. Server Component : aucun state, aucune
// interactivité nécessaire pour de simples liens.
//
// Volontairement minimal pour l'instant : seuls les liens vers des
// pages RÉELLEMENT existantes apparaissent (Accueil). Le brief prévoit
// "Destinations" et "Ressources", mais ces fonctionnalités n'existent
// pas encore côté code — on évite les liens morts. À enrichir au fur
// et à mesure que ces sections seront construites.

import Link from "next/link";

export function Header() {
  return (
    <header className="sticky top-0 z-10 border-b border-[var(--color-border)] bg-[var(--color-surface)]/90 backdrop-blur">
      <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="font-semibold text-lg shrink-0">
          <span className="sm:hidden">TOA</span>
          <span className="hidden sm:inline">Travel Operations Academy</span>
        </Link>

        <nav className="flex items-center gap-3 sm:gap-6 text-sm">
          <Link href="/" className="hidden sm:inline text-[var(--color-text-secondary)] hover:text-[var(--color-text)]">
            Accueil
          </Link>
          <Link
            href="/courses/new"
            className="rounded-lg bg-[var(--color-nature-600)] text-white px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium hover:bg-[var(--color-nature-700)] transition-colors whitespace-nowrap"
          >
            <span className="sm:hidden">+ Ajouter</span>
            <span className="hidden sm:inline">+ Ajouter un cours</span>
          </Link>
        </nav>
      </div>
    </header>
  );
}
