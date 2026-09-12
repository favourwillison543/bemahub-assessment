import { CoursesList } from "@/components/courselist";
import { CoursesSection } from "@/components/landing/courses-section";
import { Hero } from "@/components/landing/hero";

export default function Home() {
  return (
    <main className="min-h-screen ">
     
      <Hero />

      <div className="mx-auto max-w-7xl px-6 py-12">
        <CoursesSection />
      </div>

      {/* <div className="mx-auto max-w-6xl space-y-4 border-t border-border px-6 py-8">
        <p className="text-text-secondary">
          Assessment environment. Start with the tasks in <code>docs/</code>.
        </p>
        <ul className="list-disc space-y-1 pl-5">
          <li>
            <Link className="text-accent underline" href="/courses">
              Courses (Task 1)
            </Link>
          </li>
          <li>
            <Link className="text-accent underline" href="/login">
              Sign in (Task 2)
            </Link>
          </li>
          <li>
            <Link className="text-accent underline" href="/earnings">
              Earnings &amp; withdrawal (Tasks 2-3)
            </Link>
          </li>
        </ul>
      </div> */}
    </main>
  );
}