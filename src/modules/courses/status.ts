// modules/courses/status.ts
//
// Single source of truth for the fixed set of course statuses. Both the
// creation form's default and the status toggle read from here, so they
// can never drift out of sync.

export const COURSE_STATUSES = ["à apprendre", "en cours", "terminé"] as const;
export type CourseStatus = (typeof COURSE_STATUSES)[number];
