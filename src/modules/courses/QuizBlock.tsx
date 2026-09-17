// modules/courses/QuizBlock.tsx
//
// Parses the Quiz section's raw Markdown (which follows a fixed pattern
// from the travel-course-generator skill: "**N. question**", answer
// options, then "*Réponse : ...*") into individual question cards where
// the answer is hidden until clicked. "use client" because each card
// needs its own open/closed state.
//
// If the text doesn't match the expected pattern (e.g. a hand-written
// quiz that doesn't follow the template), we fall back to rendering it
// as plain Markdown rather than showing something broken.

"use client";

import { useState } from "react";
import ReactMarkdown from "react-markdown";

type QuizBlockProps = {
  content: string;
};

type ParsedQuestion = {
  question: string;
  options: string[];
  answer: string;
};

function parseQuiz(markdown: string): ParsedQuestion[] | null {
  // Un bloc "question" commence par "**N." en début de ligne.
  const blocks = markdown.split(/\n(?=\*\*\d+\.)/).filter((b) => b.trim());
  if (blocks.length === 0) return null;

  const parsed: ParsedQuestion[] = [];

  for (const block of blocks) {
    const questionMatch = block.match(/\*\*\d+\.\s*(.+?)\*\*/);
    const answerMatch = block.match(/\*Réponse\s*:\s*(.+?)\*\s*$/m);
    if (!questionMatch || !answerMatch) return null; // format inattendu, on abandonne le parsing

    const options = [...block.matchAll(/^[A-D]\)\s*(.+)$/gm)].map((m) => m[1]);

    parsed.push({
      question: questionMatch[1].trim(),
      options,
      answer: answerMatch[1].trim(),
    });
  }

  return parsed;
}

function QuestionCard({ q, index }: { q: ParsedQuestion; index: number }) {
  const [revealed, setRevealed] = useState(false);

  return (
    <div className="rounded-lg border border-[var(--color-border)] p-4">
      <p className="font-medium text-[var(--color-text)]">
        {index + 1}. {q.question}
      </p>
      {q.options.length > 0 && (
        <ul className="mt-2 space-y-1 text-sm text-[var(--color-text-secondary)]">
          {q.options.map((opt, i) => (
            <li key={i}>{opt}</li>
          ))}
        </ul>
      )}

      {revealed ? (
        <p className="mt-3 text-sm rounded-md bg-[var(--color-nature-50)] text-[var(--color-nature-700)] px-3 py-2">
          ✅ {q.answer}
        </p>
      ) : (
        <button
          onClick={() => setRevealed(true)}
          className="mt-3 text-sm font-medium text-[var(--color-nature-700)] hover:underline"
        >
          Voir la réponse →
        </button>
      )}
    </div>
  );
}

export function QuizBlock({ content }: QuizBlockProps) {
  const questions = parseQuiz(content);

  if (!questions) {
    // Fallback : format non reconnu, on affiche le Markdown brut plutôt
    // que de planter ou de cacher le contenu.
    return (
      <div className="prose prose-neutral max-w-none">
        <ReactMarkdown>{content}</ReactMarkdown>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {questions.map((q, i) => (
        <QuestionCard key={i} q={q} index={i} />
      ))}
    </div>
  );
}
