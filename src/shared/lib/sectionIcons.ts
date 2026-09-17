// shared/lib/sectionIcons.ts
//
// Maps a course chapter's title to an emoji, by keyword — matched against
// the section titles the travel-course-generator skill's template
// produces (Objectif, Résumé, Définitions, Cours détaillé, Exemple,
// Procédure, Erreurs fréquentes, Mini-cas, Quiz, Sources, Notes
// personnelles). Falls back to a neutral bookmark icon for anything else,
// so a custom/unexpected section title never breaks the layout.

const ICON_RULES: [pattern: RegExp, icon: string][] = [
  [/objectif/i, "🎯"],
  [/résumé/i, "⚡"],
  [/définition/i, "📖"],
  [/cours détaillé|détaillé/i, "📚"],
  [/exemple/i, "💡"],
  [/procédure/i, "✅"],
  [/erreur/i, "⚠️"],
  [/cas pratique|mini-cas/i, "🧩"],
  [/quiz/i, "❓"],
  [/source/i, "📎"],
  [/note/i, "✍️"],
];

export function getSectionIcon(title: string): string {
  const match = ICON_RULES.find(([pattern]) => pattern.test(title));
  return match ? match[1] : "📄";
}
