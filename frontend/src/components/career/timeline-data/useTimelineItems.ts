import { useMemo } from "react";
import { useWorkExperiences, useProjects, useEducation } from "#/hooks/usePortfolio";
import { adaptWorkExperience, adaptProject, adaptEducation } from "./types";

export function useTimelineItems() {
  const { data: experiences } = useWorkExperiences();
  const { data: projects } = useProjects();
  const { data: education } = useEducation();

  return useMemo(
    () => [
      ...(experiences ?? []).map(adaptWorkExperience),
      ...(projects ?? []).map(adaptProject),
      ...(education ?? []).map(adaptEducation),
    ],
    [experiences, projects, education],
  );
}
