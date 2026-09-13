// modules/courses/getCoursesByModule.ts
//
// "Data access function" : isole la requête Supabase dans une fonction
// dédiée, avec un nom qui dit exactement ce qu'elle fait. La page qui
// l'utilise n'a pas besoin de connaître la syntaxe Supabase elle-même.

import { supabase } from "@/core/supabase/client";

export type Course = {
  id: string;
  module_slug: string;
  title: string;
  content: string;
  status: string;
  created_at: string;
};

export async function getCoursesByModule(moduleSlug: string): Promise<Course[]> {
  const { data, error } = await supabase
    .from("courses")
    .select("*")
    .eq("module_slug", moduleSlug)
    .order("created_at", { ascending: true });

  if (error) {
    // On log l'erreur côté serveur pour debug, mais on ne fait pas planter
    // toute la page pour autant : on retourne une liste vide, et la page
    // affichera "aucun cours pour l'instant" plutôt qu'un crash.
    console.error("Error fetching courses:", error.message);
    return [];
  }

  return data ?? [];
}
