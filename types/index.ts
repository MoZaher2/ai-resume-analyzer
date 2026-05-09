export interface AnalysisResponse {
  matchScore: number;
  matchedSkills: string[];
  missingSkills: string[];
  matchedKeywords: string[];
  jdRequirements: string[];
  strengths: string[];
  weaknesses: string[];
  summary: string;
}

export interface AnalyzeRequest {
  resume: string;
  jobDescription: string;
}
