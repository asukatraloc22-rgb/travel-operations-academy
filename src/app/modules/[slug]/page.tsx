// app/modules/[slug]/page.tsx
//
// Route dynamique : ce fichier gère TOUTES les URLs du type /modules/xxx.
// Next.js passe automatiquement la valeur capturée dans "params.slug".
//
// Depuis Next.js 15/16, "params" est une Promise (à cause du streaming côté
// serveur) — on doit donc faire "await params" avant de l'utiliser.

import { notFound } from "next/navigation";
import Link from "next/link";
import { getModuleBySlug } from "@/core/config/modules";
import { getCoursesByModule } from "@/modules/courses/getCoursesByModule";

type ModulePageProps = {
  params: Promise<{ slug: string }>;
};

export default async function ModulePage({ params }: ModulePageProps) {
  const { slug } = await params;
  const module = getModuleBySlug(slug);

  // Si quelqu'un tape une URL avec un slug qui n'existe pas
  // (/modules/n-importe-quoi), on affiche la page 404 standard de Next.js
  // plutôt que de planter ou d'afficher une page vide et confuse.
  if (!module) {
    notFound();
  }

  const courses = await getCoursesByModule(module.slug);

  return (
    <main className="max-w-3xl mx-auto px-6 py-16">
      <Link href="/" className="text-sm text-gray-500 hover:underline">
        ← Retour aux modules
      </Link>

      <span className="block text-xs font-semibold text-gray-400 mt-6">
        Module {module.id}
      </span>
      <h1 className="text-2xl font-bold mt-1">{module.title}</h1>
      <p className="text-gray-600 mt-3">{module.description}</p>

      <div className="mt-10 space-y-4">
        {courses.length === 0 ? (
          <div className="rounded-xl border border-dashed border-gray-300 p-6 text-sm text-gray-400">
            Aucun cours pour ce module pour l&apos;instant.
          </div>
        ) : (
          courses.map((course) => (
            <div key={course.id} className="rounded-xl border border-gray-200 p-5">
              <span className="text-xs text-gray-400">{course.status}</span>
              <h2 className="font-semibold mt-1">{course.title}</h2>
              {/* whitespace-pre-wrap : affiche le texte brut en respectant
                  les sauts de ligne. Le rendu Markdown propre (titres,
                  listes, gras...) viendra dans une étape ultérieure. */}
              <p className="text-sm text-gray-600 mt-2 whitespace-pre-wrap">
                {course.content}
              </p>
            </div>
          ))
        )}
      </div>
    </main>
  );
}
