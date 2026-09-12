"use client";

import { StatusMessage } from "@/components/StatusMessage";

import { CourseCard } from "./coursecard";
import { useCourses } from "@/lib/hooks/useCourse";

export function CoursesList() {
  const { data, isLoading, isError, error } = useCourses();

  if (isLoading) {
    return <StatusMessage state="loading" />;
  }

  if (isError) {
    return (
      <StatusMessage
        state="error"
        message={
          error instanceof Error
            ? error.message
            : "Could not load courses."
        }
      />
    );
  }

  if (!data || data.courses.length === 0) {
    return (
      <StatusMessage
        state="empty"
        message="No courses available yet."
      />
    );
  }

  const publishedCourses = data.courses.filter(
    (course) => course.isPublished
  );

  if (publishedCourses.length === 0) {
    return (
      <StatusMessage
        state="empty"
        message="No courses available yet."
      />
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {publishedCourses.map((course) => (
        <CourseCard key={course.id} course={course} />
      ))}
    </div>
  );
}