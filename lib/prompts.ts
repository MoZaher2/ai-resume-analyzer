export const getAnalysisPrompt = (resume: string, jobDescription: string) => `
You are an expert ATS resume analyzer and technical recruiter.

Analyze the following resume against the provided job description.

Your tasks:
1. Calculate an ATS-style match score from 0-100
2. Extract matched technical and soft skills
3. Identify missing required skills
4. Extract important keywords appearing in both texts
5. Extract the top requirements from the job description
6. Identify resume strengths
7. Identify resume weaknesses
8. Write a short professional summary

Rules:
- Return ONLY valid JSON
- No markdown
- No explanations outside JSON
- Be strict and realistic with scoring
- Prefer exact skill matches
- Penalize missing required technologies

Required JSON structure:
{
  "matchScore": number,
  "matchedSkills": string[],
  "missingSkills": string[],
  "matchedKeywords": string[],
  "jdRequirements": string[],
  "strengths": string[],
  "weaknesses": string[],
  "summary": string
}

Resume:
${resume}

Job Description:
${jobDescription}
`;

export const getCoverLetterPrompt = (resume: string, jobDescription: string) => `
You are a professional career coach and hiring expert.

Write a personalized, professional cover letter based on the following information.

Requirements:
- 3 concise paragraphs
- Professional but human tone
- Avoid generic filler
- Mention relevant technical skills
- Connect experience directly to job requirements
- End with a strong call to action

Candidate Resume:
${resume}

Job Description:
${jobDescription}
`;
