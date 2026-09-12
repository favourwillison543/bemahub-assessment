import { useQuery } from "@tanstack/react-query";
import { getEarnings } from "@/lib/api/auth";

export function useEarnings() {
  return useQuery({
    queryKey: ["earnings"],
    queryFn: getEarnings,
  });
}