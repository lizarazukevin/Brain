import { z } from "zod";

export class ApiError extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

export class ApiValidationError extends Error {
  issues: z.ZodIssue[];

  constructor(issues: z.ZodIssue[], message = "API response failed validation") {
    super(message);
    this.name = "ApiValidationError";
    this.issues = issues;
  }
}
