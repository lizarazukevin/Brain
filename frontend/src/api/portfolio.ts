import { apiClient } from "./client";
import { profileSchema, workExperienceListSchema } from "./schema";

/**
 * Fetches the singleton portfolio profile.
 * @param signal - Optional AbortSignal for request cancellation.
 * @returns A promise resolving to the validated Profile object.
 */
export function getProfile(signal?: AbortSignal) {
  return apiClient("/portfolio/profile/", { schema: profileSchema, signal });
}

/**
 * Fetches the list of work experiences.
 * @param signal - Optional AbortSignal for request cancellation.
 * @returns A promise resolving to an array of validated WorkExperience objects.
 */
export function getWorkExperiences(signal?: AbortSignal) {
  return apiClient("/portfolio/work-experience/", { schema: workExperienceListSchema, signal });
}

/**
 * Returns the full URL for downloading the résumé file.
 * Does not perform a fetch; can be used directly in an anchor tag.
 * @returns Absolute URL string to the résumé file.
 */
export function getResumeUrl(): string {
  return `${import.meta.env.VITE_API_BASE_URL}/portfolio/resume/`;
}
