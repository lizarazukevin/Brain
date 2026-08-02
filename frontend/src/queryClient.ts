import { QueryClient } from "@tanstack/react-query";
import { ApiError, ApiValidationError } from "./api/errors";

/**
 * Custom retry logic for TanStack Query.
 * Retries only transient errors (network drops, 5xx, 429) up to a maximum of 2 retries.
 * Never retries client errors (4xx) or validation errors.
 */
function shouldRetry(failureCount: number, error: unknown): boolean {
  if (error instanceof ApiValidationError) return false;

  if (error instanceof ApiError) {
    // 0        -> network drop / our own timeout
    // 5xx/429  -> server-side, may recover
    // 4xx      -> client-side, fails every time
    const isTransient = error.status === 0 || error.status >= 500 || error.status === 429;
    if (!isTransient) return false;
  }

  return failureCount < 2;
}

/**
 * Global QueryClient instance.
 */
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      /** Custom retry function. */
      retry: shouldRetry,
      /** Exponential backoff: 1s, 2s, 4s, … capped at 30s. */
      retryDelay: (attempt) => Math.min(1000 * 2 ** attempt, 30_000),
      /** Data is considered fresh for 5 minutes before a background refetch. */
      staleTime: 5 * 60 * 1000,
    },
  },
});
