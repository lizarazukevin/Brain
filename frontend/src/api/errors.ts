import { z } from "zod";

export class ApiError extends Error {
  constructor(
    public status: number,
    message: string,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

export class ApiValidationError extends Error {
  constructor(
    public issue: z.ZodIssue[],
    message = "API response failed validation",
  ) {
    super(message);
    this.name = "ApiValidationError";
  }
}
