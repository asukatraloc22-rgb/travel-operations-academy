// modules/dashboard/ModuleCard.tsx
//
// "Presentational component" : un component qui reçoit des données en props
// et se contente de les afficher, sans logique métier ni state (mémoire interne).

import type { TravelModule } from "@/core/config/modules";

type ModuleCardProps = {
  module: TravelModule;
};

export function ModuleCard({ module }: ModuleCardProps) {
  return (
    <div className="rounded-xl border border-gray-200 p-5 hover:shadow-md transition-shadow">
      <span className="text-xs font-semibold text-gray-400">
        Module {module.id}
      </span>
      <h3 className="text-lg font-semibold mt-1">{module.title}</h3>
      <p className="text-sm text-gray-600 mt-2">{module.description}</p>
    </div>
  );
}
