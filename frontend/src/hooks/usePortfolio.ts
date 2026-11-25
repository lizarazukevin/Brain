import { useQuery, queryOptions } from "@tanstack/react-query";
import {
  getEducation,
  getProfile,
  getProjects,
  getStats,
  getWorkExperiences,
} from "#/api/portfolio";

const STALE_TIME = 30 * 60 * 1000;

function resourceQueryOptions<T>(key: string, fetcher: (signal?: AbortSignal) => Promise<T>) {
  return queryOptions({
    queryKey: [key],
    queryFn: ({ signal }) => fetcher(signal),
    staleTime: STALE_TIME,
  });
}

export const profileQueryOptions = () => resourceQueryOptions("profile", getProfile);
export const workExperiencesQueryOptions = () =>
  resourceQueryOptions("workExperiences", getWorkExperiences);
export const projectsQueryOptions = () => resourceQueryOptions("projects", getProjects);
export const educationQueryOptions = () => resourceQueryOptions("education", getEducation);
export const statsQueryOptions = () => resourceQueryOptions("stats", getStats);

export function useProfile() {
  return useQuery(profileQueryOptions());
}

export function useStats() {
  return useQuery(statsQueryOptions());
}

export function useWorkExperiences() {
  return useQuery(workExperiencesQueryOptions());
}

export function useProjects() {
  return useQuery(projectsQueryOptions());
}

export function useEducation() {
  return useQuery(educationQueryOptions());
}
