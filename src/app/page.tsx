// app/page.tsx
//
// C'est un "Server Component" par défaut dans Next.js (App Router) :
// il s'exécute côté serveur avant d'envoyer le HTML au navigateur, plutôt
// que dans le navigateur du visiteur. Avantage : plus rapide au premier
// chargement, et on pourra plus tard y faire des requêtes Supabase
// directement, sans passer par une API séparée.

import Link from "next/link";
import { TRAVEL_MODULES } from "@/core/config/modules";
import { ModuleCard } from "@/modules/dashboard/ModuleCard";

export default function Home() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-16">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Travel Operations Academy</h1>
          <p className="text-gray-600 mt-2">
            Ton parcours structuré en 9 modules vers l&apos;expertise voyage.
          </p>
        </div>
        <Link
          href="/courses/new"
          className="rounded-lg bg-black text-white px-4 py-2 text-sm font-medium whitespace-nowrap"
        >
          + Ajouter un cours
        </Link>
      </div>

      <div className="grid sm:grid-cols-2 gap-4 mt-10">
        {TRAVEL_MODULES.map((module) => (
          <ModuleCard key={module.id} module={module} />
        ))}
      </div>
    </main>
  );
}
