import { apiClient } from "./client";
import {
  profileSchema,
  workExperienceListSchema,
  projectListSchema,
  educationListSchema,
} from "./schema";

/** Fetches the singleton portfolio profile. */
export function getProfile(signal?: AbortSignal) {
  return apiClient("/portfolio/profile/", { schema: profileSchema, signal });
}

/** Fetches all work experiences. */
export function getWorkExperiences(signal?: AbortSignal) {
  return apiClient("/portfolio/work-experience/", { schema: workExperienceListSchema, signal });
}

/** Fetches all projects. */
export function getProjects(signal?: AbortSignal) {
  return apiClient("/portfolio/project/", { schema: projectListSchema, signal });
}

/** Fetches all education degrees. */
export function getEducation(signal?: AbortSignal) {
  return apiClient("/portfolio/education/", { schema: educationListSchema, signal });
}

/** Absolute URL for the résumé download; usable directly in an anchor href. */
export function getResumeUrl(): string {
  return `${import.meta.env.VITE_API_BASE_URL}/portfolio/profile/resume/`;
}
