// shared/components/AuthStatus.tsx
//
// "use client": reads and reacts to auth session state, something only
// the browser can do. onAuthStateChange keeps this in sync automatically
// whenever the user signs in/out — no manual polling needed.

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/core/supabase/client";
import type { User } from "@supabase/supabase-js";

export function AuthStatus() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    supabase.auth
      .getUser()
      .then(({ data }) => {
        setUser(data.user);
      })
      .catch((error) => {
        console.error("Error checking session:", error);
        setUser(null);
      })
      .finally(() => {
        setLoaded(true);
      });

    // S'abonne aux changements de session (connexion/déconnexion) pour que
    // le header se mette à jour automatiquement, sans recharger la page.
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  async function handleSignOut() {
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  }

  // Évite un "flash" (voir le lien connexion puis le voir disparaître
  // aussitôt) le temps de savoir si une session existe déjà.
  if (!loaded) return null;

  if (!user) {
    return (
      <Link
        href="/login"
        className="text-[var(--color-text-secondary)] hover:text-[var(--color-text)]"
      >
        Se connecter
      </Link>
    );
  }

  return (
    <div className="flex items-center gap-3">
      <Link
        href="/courses/new"
        className="rounded-lg bg-[var(--color-nature-600)] text-white px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium hover:bg-[var(--color-nature-700)] transition-colors whitespace-nowrap"
      >
        <span className="sm:hidden">+ Ajouter</span>
        <span className="hidden sm:inline">+ Ajouter un cours</span>
      </Link>
      <button
        onClick={handleSignOut}
        className="text-xs text-[var(--color-text-muted)] hover:text-[var(--color-text)]"
      >
        Déconnexion
      </button>
    </div>
  );
}
