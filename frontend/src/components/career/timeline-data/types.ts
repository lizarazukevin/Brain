import type { WorkExperience, Project, Education, Skill } from "#/api/schema";

export type TimelineType = "experience" | "project" | "education";

export const EMPLOYMENT_LABELS: Record<string, string> = {
  full_time: "Full-Time",
  part_time: "Part-Time",
  internship: "Internship",
  design_team: "Design Team",
  research: "Research",
  executive: "Executive",
};

export type TimelineFilter = TimelineType | "all";

export const GLOW_BY_TYPE: Record<TimelineType, string> = {
  experience: "#d16834",
  project: "#ad8b5c",
  education: "#f5f5f0",
};

const GLOW_BY_COMPANY: Record<string, string> = {
  aws: "#FF9900",
  rubrik: "#00B2A9",
  mitre: "#4285F4",
  codepath: "#00C385",
  "virginia tech": "#861F41",
  gitkord: "#5865f2",
  wakefield: "#4CBB17",
  codepath: "#00C385",
  "shpe @ virginia tech": "#72A9BE",
  "rocksat-x @ virginia tech": "#F3E81B",
};

export interface TimelineItem {
  id: string;
  type: TimelineType;
  title: string;
  subtitle: string;
  startDate: string;
  endDate: string | null;
  location: string;
  summary: string;
  description: string;
  skills: Skill[];
  employmentType?: string;
  glowColor: string;
  logoUrl: string | null;
  details?: { label: string; value: string }[];
}

export function adaptWorkExperience(exp: WorkExperience): TimelineItem {
  return {
    id: `exp-${exp.id}`,
    type: "experience",
    title: exp.role,
    subtitle: exp.company,
    startDate: exp.start_date,
    endDate: exp.end_date,
    location: exp.location,
    summary: exp.objective,
    description: exp.description,
    skills: exp.skills,
    employmentType: EMPLOYMENT_LABELS[exp.employment_type],
    glowColor: GLOW_BY_COMPANY[exp.company.toLowerCase()] ?? GLOW_BY_TYPE.experience,
    logoUrl: exp.logo_url,
  };
}

export function adaptProject(proj: Project): TimelineItem {
  return {
    id: `proj-${proj.id}`,
    type: "project",
    title: "Founder",
    subtitle: proj.name,
    startDate: proj.start_date,
    endDate: proj.end_date,
    location: "Remote",
    summary: proj.objective,
    description: proj.description,
    skills: proj.skills,
    employmentType: "Project",
    glowColor: GLOW_BY_COMPANY[proj.name.toLowerCase()] ?? GLOW_BY_TYPE.project,
    logoUrl: proj.logo_url,
  };
}

export function adaptEducation(edu: Education): TimelineItem {
  return {
    id: `edu-${edu.id}`,
    type: "education",
    title: edu.degree_title,
    subtitle: edu.institution,
    startDate: edu.start_date,
    endDate: edu.end_date,
    location: edu.location,
    summary: "",
    description: edu.description,
    skills: [],
    employmentType: "Degree",
    glowColor: GLOW_BY_COMPANY[edu.institution.toLowerCase()] ?? GLOW_BY_TYPE.education,
    logoUrl: edu.logo_url,
    details:
      edu.major && edu.minor
        ? [
            { label: "Major", value: edu.major },
            { label: "Minor", value: edu.minor },
            { label: "GPA", value: edu.gpa.toFixed(2) },
          ]
        : undefined,
  };
}
