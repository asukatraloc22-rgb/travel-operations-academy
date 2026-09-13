// core/supabase/client.ts
//
// Point d'entrée unique pour parler à Supabase depuis le reste de l'app.
// On crée le client ICI, une seule fois, et tout le monde l'importe
// plutôt que de le recréer à chaque fichier.

import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  // Erreur volontairement explicite : mieux vaut planter tout de suite
  // avec un message clair que d'avoir un bug silencieux plus tard parce
  // que .env.local est manquant ou mal rempli.
  throw new Error(
    "Missing Supabase environment variables. Check your .env.local file."
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
