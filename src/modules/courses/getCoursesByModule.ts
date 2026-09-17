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

export async function getCourseById(id: string): Promise<Course | null> {
  const { data, error } = await supabase
    .from("courses")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error("Error fetching course:", error.message);
    return null;
  }

  return data;
}

export async function getCourseCounts(): Promise<{
  total: number;
  byModule: Record<string, number>;
  completedByModule: Record<string, number>;
}> {
  const { data, error } = await supabase
    .from("courses")
    .select("module_slug, status");

  if (error) {
    console.error("Error fetching course counts:", error.message);
    return { total: 0, byModule: {}, completedByModule: {} };
  }

  const byModule: Record<string, number> = {};
  const completedByModule: Record<string, number> = {};

  for (const row of data ?? []) {
    byModule[row.module_slug] = (byModule[row.module_slug] ?? 0) + 1;
    if (row.status === "terminé") {
      completedByModule[row.module_slug] =
        (completedByModule[row.module_slug] ?? 0) + 1;
    }
  }

  return { total: data?.length ?? 0, byModule, completedByModule };
}
