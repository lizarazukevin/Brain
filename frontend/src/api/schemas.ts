import { z } from "zod";

export const skillSchema = z.object({
  id: z.number(),
  name: z.string(),
  category: z.string(),
});

export const profileSchema = z.object({
  id: z.number(),
  name: z.string(),
  tagline: z.string(),
  bio: z.string(),
  avatar: z.string().nullable(),
  resume: z.string().nullable(),
  linkedin_url: z.string(),
  github_url: z.string(),
});

export const workExperienceSchema = z.object({
  id: z.number(),
  company: z.string(),
  location: z.string(),
  role: z.string(),
  start_date: z.string(),
  end_date: z.string().nullable(),
  description: z.string(),
  order: z.number(),
  skills: z.array(skillSchema),
});

export const workExperienceListSchema = z.array(workExperienceSchema);

export type Skill = z.infer<typeof skillSchema>;
export type Profile = z.infer<typeof profileSchema>;
export type WorkExperience = z.infer<typeof workExperienceSchema>;
