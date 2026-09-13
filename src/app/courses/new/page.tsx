// app/courses/new/page.tsx
//
// Server Component "coquille" : cette page elle-même n'a besoin d'aucune
// interactivité, donc elle reste un Server Component par défaut — elle se
// contente d'afficher le CourseForm (qui, lui, est un Client Component).
// On peut mélanger les deux : un Server Component peut très bien rendre
// un Client Component à l'intérieur de lui.

import Link from "next/link";
import { CourseForm } from "@/modules/courses/CourseForm";

export default function NewCoursePage() {
  return (
    <main className="max-w-2xl mx-auto px-6 py-16">
      <Link href="/" className="text-sm text-gray-500 hover:underline">
        ← Retour aux modules
      </Link>

      <h1 className="text-2xl font-bold mt-6 mb-8">Ajouter un cours</h1>

      <CourseForm />
    </main>
  );
}
