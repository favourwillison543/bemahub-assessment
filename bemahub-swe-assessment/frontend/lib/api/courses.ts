// lib/api/courses.ts

import { get } from "@/lib/api/http";
import type { CourseListResponse } from "@/lib/types/api";

export function getCourses() {
  return get<CourseListResponse>("/courses");
}