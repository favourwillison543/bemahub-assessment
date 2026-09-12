import { CoursesList } from "@/components/courselist";


export default function CoursesPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-10">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold tracking-tight text-text-primary">
          Courses
        </h1>
        <p className="mt-2 text-sm text-text-secondary">
          Explore available courses and start learning.
        </p>
      </div>

      <CoursesList />
    </div>
  );
}