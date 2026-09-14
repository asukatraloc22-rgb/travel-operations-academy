// modules/courses/CourseStatusToggle.tsx
//
// "use client": needs onChange + a network call on interaction.
// Optimistic-ish pattern kept simple: we update Supabase, then
// router.refresh() so the Server Component (the module page) re-fetches
// fresh counts — that's what makes the progress bar move.

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/core/supabase/client";
import { COURSE_STATUSES, type CourseStatus } from "@/modules/courses/status";

type CourseStatusToggleProps = {
  courseId: string;
  status: string;
};

export function CourseStatusToggle({ courseId, status }: CourseStatusToggleProps) {
  const router = useRouter();
  const [isUpdating, setIsUpdating] = useState(false);

  async function handleChange(newStatus: CourseStatus) {
    setIsUpdating(true);
    const { error } = await supabase
      .from("courses")
      .update({ status: newStatus })
      .eq("id", courseId);
    setIsUpdating(false);

    if (error) {
      console.error("Error updating course status:", error.message);
      return;
    }

    router.refresh();
  }

  return (
    <select
      value={status}
      disabled={isUpdating}
      onChange={(e) => handleChange(e.target.value as CourseStatus)}
      className="text-xs rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] px-2 py-0.5 text-[var(--color-text-secondary)] disabled:opacity-50"
    >
      {COURSE_STATUSES.map((s) => (
        <option key={s} value={s}>
          {s}
        </option>
      ))}
    </select>
  );
}
