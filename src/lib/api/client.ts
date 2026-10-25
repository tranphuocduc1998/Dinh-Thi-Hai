// src/lib/api/client.ts
// Lớp giao tiếp cơ bản với FastAPI

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8000';

type HttpMethod = 'GET' | 'POST';

interface RequestOptions {
  method?: HttpMethod;
  body?: unknown;
}

// ============================================================
// BASE FETCH — xử lý lỗi tập trung
// ============================================================

async function apiFetch<T>(
  endpoint: string,
  options: RequestOptions = {}
): Promise<T> {
  const { method = 'GET', body } = options;

  const config: RequestInit = {
    method,
    headers: { 'Content-Type': 'application/json' },
    ...(body ? { body: JSON.stringify(body) } : {}),
  };

  const response = await fetch(`${API_BASE_URL}${endpoint}`, config);

  if (!response.ok) {
    // Đọc message lỗi từ FastAPI
    const errorData = await response.json().catch(() => ({}));
    throw new Error(
      errorData?.detail ?? `API Error ${response.status}: ${response.statusText}`
    );
  }

  return response.json() as Promise<T>;
}

export const apiClient = {
  get:  <T>(endpoint: string) =>
    apiFetch<T>(endpoint),
  post: <T>(endpoint: string, body: unknown) =>
    apiFetch<T>(endpoint, { method: 'POST', body }),
};