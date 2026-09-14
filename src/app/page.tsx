// app/page.tsx
//
// Server Component. Design Phase 5 (Homepage): hero section + a stats
// row driven by REAL data from Supabase (module count is static/known,
// course count and "modules started" are fetched, not invented).

import { TRAVEL_MODULES } from "@/core/config/modules";
import { ModuleCard } from "@/modules/dashboard/ModuleCard";
import { getCourseCounts } from "@/modules/courses/getCoursesByModule";

export default async function Home() {
  const { total: totalCourses, byModule, completedByModule } = await getCourseCounts();
  const modulesStarted = Object.keys(byModule).length;

  return (
    <main>
      {/* Hero */}
      <section className="bg-gradient-to-br from-[var(--color-nature-600)] to-[var(--color-ocean-600)] text-white">
        <div className="max-w-4xl mx-auto px-6 py-20">
          <h1 className="text-3xl sm:text-4xl font-bold max-w-2xl">
            Bâtis ton expertise du tourisme, un module à la fois
          </h1>
          <p className="text-white/85 mt-4 max-w-xl">
            9 modules structurés pour progresser du terrain jusqu&apos;au
            management — construits à partir de vrais cas d&apos;agence.
          </p>

          {/* Stats réelles — pas de chiffres inventés. */}
          <div className="flex flex-wrap gap-6 sm:gap-8 mt-10">
            <div>
              <p className="text-2xl font-bold">{TRAVEL_MODULES.length}</p>
              <p className="text-sm text-white/70">modules</p>
            </div>
            <div>
              <p className="text-2xl font-bold">{totalCourses}</p>
              <p className="text-sm text-white/70">cours ajoutés</p>
            </div>
            <div>
              <p className="text-2xl font-bold">{modulesStarted}</p>
              <p className="text-sm text-white/70">modules démarrés</p>
            </div>
          </div>
        </div>
      </section>

      {/* Modules grid */}
      <section className="max-w-4xl mx-auto px-6 py-16">
        <h2 className="text-xl font-semibold mb-6">Tes modules</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {TRAVEL_MODULES.map((module) => (
            <ModuleCard
              key={module.id}
              module={module}
              courseCount={byModule[module.slug] ?? 0}
              completedCount={completedByModule[module.slug] ?? 0}
            />
          ))}
        </div>
      </section>
    </main>
  );
}
