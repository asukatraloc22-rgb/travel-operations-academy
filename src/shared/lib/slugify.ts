// shared/lib/slugify.ts
//
// Transforme un titre ("Résumé en 5 lignes") en identifiant utilisable
// dans une URL/ancre ("resume-en-5-lignes") : minuscules, sans accents,
// espaces remplacés par des tirets. Réutilisable partout où on a besoin
// de générer un identifiant à partir d'un texte libre.

export function slugify(text: string): string {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // retire les accents
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-");
}
