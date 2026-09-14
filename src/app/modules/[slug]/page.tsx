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
import { CourseContent } from "@/modules/courses/CourseContent";

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
      <Link href="/" className="text-sm text-[var(--color-text-secondary)] hover:underline">
        ← Retour aux modules
      </Link>

      <span className="inline-block rounded-full bg-[var(--color-nature-50)] text-[var(--color-nature-700)] text-xs font-semibold px-2 py-0.5 mt-6">
        Module {module.id}
      </span>
      <h1 className="text-2xl font-bold mt-3">{module.title}</h1>
      <p className="text-[var(--color-text-secondary)] mt-2">{module.description}</p>

      <div className="mt-10 space-y-10">
        {courses.length === 0 ? (
          <div className="rounded-xl border border-dashed border-[var(--color-border)] p-6 text-sm text-[var(--color-text-muted)]">
            Aucun cours pour ce module pour l&apos;instant.
          </div>
        ) : (
          courses.map((course) => (
            <div
              key={course.id}
              className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6"
            >
              <span className="text-xs text-[var(--color-text-muted)]">{course.status}</span>
              <h2 className="font-semibold text-xl mt-1 mb-6">{course.title}</h2>
              <CourseContent content={course.content} />
            </div>
          ))
        )}
      </div>
    </main>
  );
}
