
"use client";

import Link from "next/link";


import { CourseCard } from "@/components/coursecard";
import { StatusMessage } from "@/components/StatusMessage";
import { useCourses } from "@/lib/hooks/useCourse";

export function CoursesSection() {
  const { data, isLoading, isError, error } = useCourses();

  const courses = data?.courses
    .filter((course) => course.isPublished)
    .slice(0, 4);

  return (
    <section className="mx-auto max-w-7xl px-6 py-16">
      <div className="mb-8 flex items-end justify-between gap-6">
        <div>
    
          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-text-primary">
            Learn something new
          </h2>

          <p className="mt-2 max-w-xl text-sm leading-6 text-text-secondary">
            Explore practical courses designed to help you build useful skills
            and keep growing.
          </p>
        </div>

        <Link
          href="/courses"
          className="shrink-0 text-sm font-semibold text-accent transition-colors hover:text-accent-hover"
        >
          See all
        </Link>
      </div>

      {isLoading && <StatusMessage state="loading" />}

      {isError && (
        <StatusMessage
          state="error"
          message={
            error instanceof Error
              ? error.message
              : "Could not load courses."
          }
        />
      )}

      {!isLoading && !isError && (!courses || courses.length === 0) && (
        <StatusMessage
          state="empty"
          message="No courses available yet."
        />
      )}

      {!isLoading && !isError && courses && courses.length > 0 && (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {courses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      )}
    </section>
  );
}

