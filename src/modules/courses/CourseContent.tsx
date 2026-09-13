// modules/courses/CourseContent.tsx
//
// Affiche le contenu Markdown d'un cours avec :
// 1. Un rendu propre (titres, listes, gras, tableaux...) via react-markdown,
//    stylé par le plugin Tailwind Typography (classe "prose").
// 2. Un sommaire de chapitres généré automatiquement à partir des titres
//    "##" du Markdown — chaque titre "##" devient une entrée cliquable
//    qui saute à la bonne section de la page (ancre HTML native, pas
//    besoin de JavaScript pour ça).

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { slugify } from "@/shared/lib/slugify";

type CourseContentProps = {
  content: string;
};

// Extrait tous les titres de niveau 2 ("## Titre") du Markdown brut,
// pour construire le sommaire, AVANT de passer le texte au rendu.
function extractChapters(markdown: string): { title: string; slug: string }[] {
  const matches = [...markdown.matchAll(/^##\s+(.+)$/gm)];
  return matches.map((match) => {
    const title = match[1].trim();
    return { title, slug: slugify(title) };
  });
}

export function CourseContent({ content }: CourseContentProps) {
  const chapters = extractChapters(content);

  return (
    <div className="grid md:grid-cols-[200px_1fr] gap-8">
      {chapters.length > 0 && (
        <nav className="hidden md:block sticky top-8 self-start text-sm">
          <p className="font-semibold text-gray-400 uppercase text-xs mb-3">
            Chapitres
          </p>
          <ul className="space-y-2">
            {chapters.map((chapter) => (
              <li key={chapter.slug}>
                <a
                  href={`#${chapter.slug}`}
                  className="text-gray-600 hover:text-black"
                >
                  {chapter.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}

      {/* "prose" : classe fournie par @tailwindcss/typography, applique
          automatiquement une belle mise en page à du contenu Markdown
          (espacements, tailles de titres, style des listes...) sans avoir
          à styler chaque balise HTML à la main. */}
      <div className="prose prose-neutral max-w-none">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            // On intercepte le rendu des <h2> pour leur ajouter un "id"
            // correspondant au slug — c'est ce qui permet aux liens du
            // sommaire (href="#...") de sauter au bon endroit.
            h2: ({ children, ...props }) => {
              const text = String(children);
              return (
                <h2 id={slugify(text)} {...props}>
                  {children}
                </h2>
              );
            },
          }}
        >
          {content}
        </ReactMarkdown>
      </div>
    </div>
  );
}
