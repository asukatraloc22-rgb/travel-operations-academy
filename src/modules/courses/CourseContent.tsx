// modules/courses/CourseContent.tsx
//
// Renders a course as a series of distinct, icon-headed section cards
// instead of one long flowing Markdown document — less "book", more
// "app". Each "## Title" in the source Markdown becomes its own card;
// the Quiz section specifically renders as interactive reveal-answer
// cards via QuizBlock instead of pre-printed Markdown.

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { slugify } from "@/shared/lib/slugify";
import { getSectionIcon } from "@/shared/lib/sectionIcons";
import { QuizBlock } from "@/modules/courses/QuizBlock";

type CourseContentProps = {
  content: string;
};

type Section = {
  title: string;
  slug: string;
  body: string;
};

// Découpe le Markdown brut en sections, une par titre "## ...". On garde
// le titre et le corps de texte séparément : le titre sert à construire
// à la fois le sommaire ET l'en-tête visuel de chaque carte.
function splitIntoSections(markdown: string): Section[] {
  const parts = markdown.split(/^##\s+(.+)$/gm);
  const sections: Section[] = [];

  // parts[0] = tout texte avant le premier "##" (ignoré, rare en pratique).
  // Ensuite les éléments alternent : titre, corps, titre, corps...
  for (let i = 1; i < parts.length; i += 2) {
    const title = parts[i].trim();
    const body = (parts[i + 1] ?? "").trim();
    sections.push({ title, slug: slugify(title), body });
  }

  return sections;
}

export function CourseContent({ content }: CourseContentProps) {
  const sections = splitIntoSections(content);

  return (
    <div>
      {/* Mobile: sommaire repliable, natif (details/summary), aucun
          JavaScript nécessaire pour l'ouverture/fermeture. */}
      {sections.length > 0 && (
        <details className="md:hidden mb-6 rounded-lg border border-[var(--color-border)] p-3">
          <summary className="text-sm font-semibold cursor-pointer">
            Sommaire ({sections.length} chapitres)
          </summary>
          <ul className="mt-3 space-y-2 text-sm">
            {sections.map((section) => (
              <li key={section.slug}>
                <a
                  href={`#${section.slug}`}
                  className="text-[var(--color-text-secondary)] hover:text-[var(--color-nature-700)]"
                >
                  {getSectionIcon(section.title)} {section.title}
                </a>
              </li>
            ))}
          </ul>
        </details>
      )}

      <div className="grid md:grid-cols-[200px_1fr] gap-8">
        {sections.length > 0 && (
          <nav className="hidden md:block sticky top-24 self-start text-sm">
            <p className="font-semibold text-[var(--color-text-muted)] uppercase text-xs mb-3">
              Chapitres
            </p>
            <ul className="space-y-2">
              {sections.map((section) => (
                <li key={section.slug}>
                  <a
                    href={`#${section.slug}`}
                    className="text-[var(--color-text-secondary)] hover:text-[var(--color-nature-700)]"
                  >
                    {getSectionIcon(section.title)} {section.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        )}

        <div className="space-y-6">
          {sections.map((section) => {
            const isQuiz = /quiz/i.test(section.title);

            return (
              <section
                key={section.slug}
                id={section.slug}
                className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5 scroll-mt-24"
              >
                <h2 className="flex items-center gap-2 text-lg font-semibold mb-4">
                  <span aria-hidden>{getSectionIcon(section.title)}</span>
                  {section.title}
                </h2>

                {isQuiz ? (
                  <QuizBlock content={section.body} />
                ) : (
                  <div className="prose prose-neutral max-w-none prose-headings:font-[var(--font-heading)]">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                      {section.body}
                    </ReactMarkdown>
                  </div>
                )}
              </section>
            );
          })}
        </div>
      </div>
    </div>
  );
}
