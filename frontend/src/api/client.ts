import { z } from "zod";

import { ApiError, ApiValidationError } from "./errors";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const DEFAULT_TIMEOUT_MS = 8000;

interface ApiClientOptions<T> extends RequestInit {
  schema?: z.ZodType<T>;
  timeoutMs?: number;
}

export async function apiClient<T>(
  endpoint: string,
  options: ApiClientOptions<T> = {},
): Promise<T> {
  const { schema, timeoutMs = DEFAULT_TIMEOUT_MS, signal: callerSignal, ...fetchOptions } = options;
  const url = `${API_BASE_URL}${endpoint}`;

  // Marks the abort as our timeout
  const timeoutController = new AbortController();
  let timedOut = false;
  const timeoutId = setTimeout(() => {
    timedOut = true;
    timeoutController.abort();
  }, timeoutMs);

  // Merge external signal (e.g. TanStack Query cancellation) with timeout.
  // AbortSignal.any() fires when either signal aborts – no race condition.
  const signal = callerSignal
    ? AbortSignal.any([callerSignal, timeoutController.signal])
    : timeoutController.signal;

  let response: Response;
  try {
    response = await fetch(url, {
      headers: { "Content-Type": "application/json", ...fetchOptions?.headers },
      ...fetchOptions,
      signal,
    });
  } catch (err: any) {
    if (err instanceof DOMException && err.name === "AbortError") {
      if (timedOut) {
        throw new ApiError(0, `Request timed out after ${timeoutMs}ms`);
      }
      throw err;
    }
    throw new ApiError(0, err.message || "Network error, check your connection");
  } finally {
    clearTimeout(timeoutId);
  }

  if (!response.ok) {
    throw new ApiError(response.status, `API error: ${response.statusText} (${response.status})`);
  }

  const data = await response.json();
  if (!schema) return data as T;

  const parsed = schema.safeParse(data);
  if (!parsed.success) throw new ApiValidationError(parsed.error.issues);

  return parsed.data;
}
