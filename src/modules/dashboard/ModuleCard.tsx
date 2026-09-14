// modules/dashboard/ModuleCard.tsx
//
// "Presentational component": receives a module as props, renders it,
// holds no logic or state. Updated in Design Phase 4 to use the design
// tokens (colors, radius) instead of hardcoded Tailwind grays.

import Link from "next/link";
import type { TravelModule } from "@/core/config/modules";

type ModuleCardProps = {
  module: TravelModule;
  courseCount: number;
};

export function ModuleCard({ module, courseCount }: ModuleCardProps) {
  return (
    <Link
      href={`/modules/${module.slug}`}
      className="block rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5 hover:border-[var(--color-nature-500)] hover:shadow-md transition-all"
    >
      <div className="flex items-center justify-between">
        <span className="inline-block rounded-full bg-[var(--color-nature-50)] text-[var(--color-nature-700)] text-xs font-semibold px-2 py-0.5">
          Module {module.id}
        </span>
        {/* Nombre RÉEL de cours dans ce module — pas une barre de
            progression fictive. On affichera une vraie progression
            (cours suivis/terminés) une fois cette fonctionnalité
            construite, pas avant. */}
        <span className="text-xs text-[var(--color-text-muted)]">
          {courseCount} cours
        </span>
      </div>
      <h3 className="text-lg font-semibold mt-2 text-[var(--color-text)]">
        {module.title}
      </h3>
      <p className="text-sm text-[var(--color-text-secondary)] mt-2">
        {module.description}
      </p>
    </Link>
  );
}
