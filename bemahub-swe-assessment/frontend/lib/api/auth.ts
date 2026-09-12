import { get, post } from "@/lib/api/http";
import type { Earnings, LoginResponse } from "@/lib/types/api";

export function login(email: string, password: string) {
  return post<LoginResponse, { email: string; password: string }>(
    "/auth/login",
    { email, password },
  );
}

export function getEarnings() {
  return get<Earnings>("/me/earnings");
}