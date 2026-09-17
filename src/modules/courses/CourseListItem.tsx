// modules/courses/CourseListItem.tsx
//
// Lightweight summary row — title, status, an arrow — used on the module
// page. Deliberately does NOT render CourseContent; that only happens on
// the course's own dedicated page (/courses/[id]), so a module with many
// courses stays scannable instead of turning into one giant scroll.

import Link from "next/link";
import type { Course } from "@/modules/courses/getCoursesByModule";

const STATUS_STYLES: Record<string, string> = {
  "terminé": "bg-[var(--color-nature-50)] text-[var(--color-nature-700)]",
  "en cours": "bg-amber-50 text-amber-700",
  "à apprendre": "bg-[var(--color-muted)] text-[var(--color-text-muted)]",
};

export function CourseListItem({ course }: { course: Course }) {
  const statusStyle = STATUS_STYLES[course.status] ?? STATUS_STYLES["à apprendre"];

  return (
    <Link
      href={`/courses/${course.id}`}
      className="flex items-center justify-between rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-5 py-4 hover:border-[var(--color-nature-500)] hover:shadow-sm transition-all"
    >
      <div>
        <h3 className="font-medium text-[var(--color-text)]">{course.title}</h3>
        <span className={`inline-block mt-1 text-xs rounded-full px-2 py-0.5 ${statusStyle}`}>
          {course.status}
        </span>
      </div>
      <span className="text-[var(--color-text-muted)]" aria-hidden>
        →
      </span>
    </Link>
  );
}
