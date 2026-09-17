import { notFound } from "next/navigation";
import Link from "next/link";
import { getCourseById } from "@/modules/courses/getCoursesByModule";
import { getModuleBySlug } from "@/core/config/modules";
import { CourseContent } from "@/modules/courses/CourseContent";
import { CourseStatusToggle } from "@/modules/courses/CourseStatusToggle";

type CoursePageProps = {
  params: Promise<{ id: string }>;
};

export default async function CoursePage({ params }: CoursePageProps) {
  const { id } = await params;
  const course = await getCourseById(id);

  if (!course) {
    notFound();
  }

  const module = getModuleBySlug(course.module_slug);

  return (
    <main className="max-w-3xl mx-auto px-6 py-16">
      <Link
        href={`/modules/${course.module_slug}`}
        className="text-sm text-[var(--color-text-secondary)] hover:underline"
      >
        ← Retour à {module ? module.title : "au module"}
      </Link>

      <div className="flex items-center justify-between mt-6">
        <h1 className="text-2xl font-bold">{course.title}</h1>
        <CourseStatusToggle courseId={course.id} status={course.status} />
      </div>

      <div className="mt-8">
        <CourseContent content={course.content} />
      </div>
    </main>
  );
}
