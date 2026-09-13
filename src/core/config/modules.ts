// core/config/modules.ts
//
// Single source of truth pour les 9 modules de la Travel Operations Academy.
// "Single source of truth" = un seul endroit fiable où cette donnée existe ;
// tout le reste de l'app vient LIRE cette liste plutôt que de la dupliquer.

export type TravelModule = {
  id: number;
  slug: string; // identifiant URL-friendly, ex: "agency-economics"
  title: string;
  description: string;
};

export const TRAVEL_MODULES: TravelModule[] = [
  {
    id: 1,
    slug: "agency-economics",
    title: "Fonctionnement économique d'une agence",
    description:
      "Comprendre comment une agence ou un opérateur touristique génère ses revenus.",
  },
  {
    id: 2,
    slug: "product-profitability",
    title: "Construction & rentabilité d'un produit",
    description:
      "Structurer un produit touristique rentable, du sourcing à la marge.",
  },
  {
    id: 3,
    slug: "distribution",
    title: "Distribution moderne",
    description: "Agences, OTA, GDS, NDC, et vente en direct.",
  },
  {
    id: 4,
    slug: "revenue-management",
    title: "Revenue management & tarification",
    description: "Optimiser les prix selon la demande et la saisonnalité.",
  },
  {
    id: 5,
    slug: "performance-metrics",
    title: "Indicateurs de performance",
    description: "Suivre et interpréter les KPIs clés d'une agence.",
  },
  {
    id: 6,
    slug: "customer-experience",
    title: "Qualité & expérience client",
    description: "Fidélisation et excellence de service.",
  },
  {
    id: 7,
    slug: "management-coaching",
    title: "Management & coaching",
    description: "Structurer et faire progresser une équipe.",
  },
  {
    id: 8,
    slug: "sustainability-risk",
    title: "Tourisme durable & gestion des risques",
    description: "Durabilité et anticipation des risques opérationnels.",
  },
  {
    id: 9,
    slug: "digital-ai",
    title: "Digitalisation & intelligence artificielle",
    description: "Automatisation et usage de l'IA dans le tourisme.",
  },
];

// Petit helper : évite de refaire "TRAVEL_MODULES.find(...)" partout où
// on a besoin de retrouver un module depuis son slug (ex: dans la route
// dynamique /modules/[slug]).
export function getModuleBySlug(slug: string): TravelModule | undefined {
  return TRAVEL_MODULES.find((module) => module.slug === slug);
}
