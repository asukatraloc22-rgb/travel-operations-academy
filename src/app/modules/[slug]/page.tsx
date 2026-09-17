import { notFound } from "next/navigation";
import Link from "next/link";
import { getModuleBySlug } from "@/core/config/modules";
import { getCoursesByModule } from "@/modules/courses/getCoursesByModule";
import { CourseListItem } from "@/modules/courses/CourseListItem";
import { ProgressBar } from "@/shared/components/ProgressBar";

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
  const completedCount = courses.filter((c) => c.status === "terminé").length;
  const progressPercent =
    courses.length === 0 ? 0 : Math.round((completedCount / courses.length) * 100);

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

      {courses.length > 0 && (
        <div className="mt-6 max-w-xs">
          <div className="flex justify-between text-xs text-[var(--color-text-muted)] mb-1">
            <span>Progression</span>
            <span>{progressPercent}%</span>
          </div>
          <ProgressBar percent={progressPercent} />
        </div>
      )}

      {/* Liste de résumés cliquables, PAS le contenu complet — chaque
          cours a sa propre page dédiée (/courses/[id]). Garde le module
          lisible même avec beaucoup de cours dedans. */}
      <div className="mt-10 space-y-3">
        {courses.length === 0 ? (
          <div className="rounded-xl border border-dashed border-[var(--color-border)] p-6 text-sm text-[var(--color-text-muted)]">
            Aucun cours pour ce module pour l&apos;instant.
          </div>
        ) : (
          courses.map((course) => <CourseListItem key={course.id} course={course} />)
        )}
      </div>
    </main>
  );
}
