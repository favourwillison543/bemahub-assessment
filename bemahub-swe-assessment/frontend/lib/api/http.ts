// lib/api/http.ts

import api from "@/lib/api/client";

export async function get<T>(url: string): Promise<T> {
  const response = await api.get<T>(url);
  return response.data;
}

export async function post<TResponse, TBody>(
  url: string,
  body: TBody,
): Promise<TResponse> {
  const response = await api.post<TResponse>(url, body);
  return response.data;
}