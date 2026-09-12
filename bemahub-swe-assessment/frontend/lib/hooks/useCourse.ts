import { useQuery } from "@tanstack/react-query";
import { getCourses } from "@/lib/api/courses";

export function useCourses() {
  return useQuery({
    queryKey: ["courses"],
    queryFn: getCourses,
    staleTime: (query) => {
      const expiresInSeconds =
        query.state.data?.previewExpiresInSeconds;

      return expiresInSeconds ? expiresInSeconds * 1000 : 0;
    },
  });
}