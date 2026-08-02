import { useQuery } from "@tanstack/react-query";
import { getProfile, getWorkExperiences } from "../api/portfolio";

export function useProfile() {
  return useQuery({
    queryKey: ["profile"],
    queryFn: ({ signal }) => getProfile(signal),
  });
}

export function useWorkExperiences() {
  return useQuery({
    queryKey: ["workExperiences"],
    queryFn: ({ signal }) => getWorkExperiences(signal),
  });
}
