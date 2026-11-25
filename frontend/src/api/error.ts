import { z } from "zod";

/** Request failed before a usable response: network error, timeout, or non-2xx status. */
export class ApiError extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

/** Response decoded as JSON but failed zod schema validation. */
export class ApiValidationError extends Error {
  issues: z.ZodIssue[];

  constructor(issues: z.ZodIssue[], message = "API response failed validation") {
    super(message);
    this.name = "ApiValidationError";
    this.issues = issues;
  }
}
