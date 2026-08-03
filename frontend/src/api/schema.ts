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
});

export const workExperienceSchema = z.object({
  id: z.number().int().positive(),
  company: z.string(),
  location: z.string(),
  role: z.string(),
  start_date: isoDate,
  end_date: isoDate.nullable(),
  description: z.string(),
  order: z.number().int().nonnegative(),
  skills: z.array(skillSchema),
});

export const workExperienceListSchema = z.array(workExperienceSchema);

export type Skill = z.infer<typeof skillSchema>;
export type Profile = z.infer<typeof profileSchema>;
export type WorkExperience = z.infer<typeof workExperienceSchema>;
