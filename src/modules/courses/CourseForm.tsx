// modules/courses/CourseForm.tsx
//
// "use client" : indispensable ici car ce component utilise useState
// (mémoire interne qui change dans le navigateur) et des event handlers
// (onChange, onSubmit) — impossible côté serveur.

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/core/supabase/client";
import { TRAVEL_MODULES } from "@/core/config/modules";

export function CourseForm() {
  const router = useRouter();

  // useState : à chaque frappe/clic, on met à jour ces variables, et React
  // redessine automatiquement le formulaire avec les nouvelles valeurs.
  const [moduleSlug, setModuleSlug] = useState(TRAVEL_MODULES[0].slug);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent) {
    // preventDefault : empêche le comportement par défaut d'un <form>
    // (recharger toute la page à l'envoi) — on gère l'envoi nous-mêmes.
    event.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const { error: insertError } = await supabase
      .from("courses")
      .insert({ module_slug: moduleSlug, title, content });

    setIsSubmitting(false);

    if (insertError) {
      setError(insertError.message);
      return;
    }

    // router.push : navigue vers la page du module concerné une fois le
    // cours enregistré, pour voir directement le résultat.
    router.push(`/modules/${moduleSlug}`);
    router.refresh(); // force le Server Component de cette page à re-fetch
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className="block text-sm font-medium mb-1 text-[var(--color-text)]">
          Module
        </label>
        <select
          value={moduleSlug}
          onChange={(e) => setModuleSlug(e.target.value)}
          className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--color-nature-500)]"
        >
          {TRAVEL_MODULES.map((module) => (
            <option key={module.slug} value={module.slug}>
              Module {module.id} — {module.title}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1 text-[var(--color-text)]">
          Titre du cours
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--color-nature-500)]"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1 text-[var(--color-text)]">
          Contenu (Markdown)
        </label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          rows={12}
          className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-nature-500)]"
        />
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <button
        type="submit"
        disabled={isSubmitting}
        className="rounded-lg bg-[var(--color-nature-600)] text-white px-4 py-2 text-sm font-medium hover:bg-[var(--color-nature-700)] transition-colors disabled:opacity-50"
      >
        {isSubmitting ? "Enregistrement..." : "Ajouter le cours"}
      </button>
    </form>
  );
}
