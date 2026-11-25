import { z } from "zod";

import { ApiError, ApiValidationError } from "./error";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const DEFAULT_TIMEOUT_MS = 8000;

interface ApiClientOptions<T> extends RequestInit {
  /** Optional zod schema used to validate the decoded response body. */
  schema?: z.ZodType<T>;
  /** Overrides the default request timeout (8s). */
  timeoutMs?: number;
}

/**
 * Thin fetch wrapper for the portfolio API.
 *
 * - Joins `endpoint` onto `VITE_API_BASE_URL` and sends JSON headers.
 * - Aborts automatically after `timeoutMs`, and cancels instantly when the
 *   caller passes its own `signal` (e.g. React Query stale-time cancellation).
 * - When `schema` is provided, the response body is validated with zod and the
 *   parsed result is returned instead of the raw JSON.
 *
 * Throws `ApiError` for timeouts, network failures, and non-2xx responses;
 * `ApiValidationError` when the body doesn't match `schema`; or rethrows a
 * caller-triggered `AbortError` unchanged.
 */
export async function apiClient<T>(
  endpoint: string,
  options: ApiClientOptions<T> = {},
): Promise<T> {
  const {
    schema,
    timeoutMs = DEFAULT_TIMEOUT_MS,
    signal: callerSignal,
    headers: callerHeaders,
    ...fetchOptions
  } = options;
  const url = `${API_BASE_URL}${endpoint}`;

  // Own abort controller purely for the timeout. `timedOut` lets the catch
  // below tell "we aborted the request" apart from "the caller did".
  const timeoutController = new AbortController();
  let timedOut = false;
  const timeoutId = setTimeout(() => {
    timedOut = true;
    timeoutController.abort();
  }, timeoutMs);

  // AbortSignal.any() fans out a single signal from both sources, so fetch
  // aborts as soon as either fires — a caller cancellation wins immediately
  // instead of racing the timeout timer.
  const signal = callerSignal
    ? AbortSignal.any([callerSignal, timeoutController.signal])
    : timeoutController.signal;

  let response: Response;
  try {
    response = await fetch(url, {
      headers: { "Content-Type": "application/json", ...callerHeaders },
      ...fetchOptions,
      signal,
    });
  } catch (err: unknown) {
    if (err instanceof DOMException && err.name === "AbortError") {
      // Timeouts become ApiError; caller aborts are rethrown so the consumer
      // (e.g. React Query) can treat a cancelled request as a non-error.
      if (timedOut) {
        throw new ApiError(0, `Request timed out after ${timeoutMs}ms`);
      }
      throw err;
    }
    const message = err instanceof Error ? err.message : "Network error, check your connection";
    throw new ApiError(0, message);
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
