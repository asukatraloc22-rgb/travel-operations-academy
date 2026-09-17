// shared/components/Header.tsx
//
// Server Component that renders AuthStatus (a Client Component) inside
// it for the interactive, session-aware part — Server Components can
// render Client Components as children without becoming client
// themselves, which is why Header stays simple here.

import Link from "next/link";
import { AuthStatus } from "@/shared/components/AuthStatus";

export function Header() {
  return (
    <header className="sticky top-0 z-10 border-b border-[var(--color-border)] bg-[var(--color-surface)]/90 backdrop-blur">
      <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="font-semibold text-lg shrink-0">
          TourismHub
        </Link>

        <nav className="flex items-center gap-3 sm:gap-6 text-sm">
          <Link href="/" className="hidden sm:inline text-[var(--color-text-secondary)] hover:text-[var(--color-text)]">
            Accueil
          </Link>
          <AuthStatus />
        </nav>
      </div>
    </header>
  );
}
