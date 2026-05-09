import { z } from "zod";

export const AnalyzeRequestSchema = z.object({
  resume: z.string().min(50, "Resume must be at least 50 characters").max(20000, "Resume is too long"),
  jobDescription: z.string().min(50, "Job description must be at least 50 characters").max(20000, "Job description is too long"),
});
