import { z } from "zod";

const isoDate = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "expected YYYY-MM-DD");

export const skillSchema = z.object({
  id: z.number().int().positive(),
  name: z.string(),
  category: z.string(),
});

export const profileSchema = z.object({
  id: z.number().int().positive(),
  name: z.string(),
  tagline: z.string(),
  bio: z.string(),
  avatar: z.string().nullable(),
  resume: z.string().nullable(),
  linkedin_url: z.string(),
  github_url: z.string(),
  medium_url: z.string(),
  email: z.string(),
});

export const githubStatsSchema = z.object({
  repos: z.number().int().nullable(),
  prs: z.number().int().nullable(),
});

export const mediumStatsSchema = z.object({
  articles: z.number().int().nullable(),
});

export const statsSchema = z.object({
  github: githubStatsSchema.nullable(),
  medium: mediumStatsSchema.nullable(),
});

export const workExperienceSchema = z.object({
  id: z.number().int().positive(),
  company: z.string(),
  location: z.string(),
  role: z.string(),
  start_date: isoDate,
  end_date: isoDate.nullable(),
  objective: z.string(),
  description: z.string(),
  order: z.number().int().nonnegative(),
  skills: z.array(skillSchema),
  employment_type: z.string(),
  logo_url: z.string().nullable(),
});

export const workExperienceListSchema = z.array(workExperienceSchema);

export const projectSchema = z.object({
  id: z.number().int().positive(),
  name: z.string(),
  start_date: isoDate,
  end_date: isoDate.nullable(),
  objective: z.string(),
  description: z.string(),
  skills: z.array(skillSchema),
  order: z.number().int().nonnegative(),
  logo_url: z.string().nullable(),
});

export const projectListSchema = z.array(projectSchema);

export const educationSchema = z.object({
  id: z.number().int().positive(),
  institution: z.string(),
  description: z.string(),
  location: z.string(),
  degree_level: z.string(),
  degree_title: z.string(),
  major: z.string(),
  minor: z.string().nullable(),
  start_date: isoDate,
  end_date: isoDate.nullable(),
  gpa: z.float64(),
  order: z.number().int().nonnegative(),
  logo_url: z.string().nullable(),
});

export const educationListSchema = z.array(educationSchema);

export type Skill = z.infer<typeof skillSchema>;
export type Profile = z.infer<typeof profileSchema>;
export type GithubStats = z.infer<typeof githubStatsSchema>;
export type MediumStats = z.infer<typeof mediumStatsSchema>;
export type Stats = z.infer<typeof statsSchema>;
export type WorkExperience = z.infer<typeof workExperienceSchema>;
export type Project = z.infer<typeof projectSchema>;
export type Education = z.infer<typeof educationSchema>;
