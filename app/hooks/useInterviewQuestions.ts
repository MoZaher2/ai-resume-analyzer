import { useMutation } from "@tanstack/react-query";
import { AnalyzeRequest, InterviewResponse } from "@/types";

export function useInterviewQuestions() {
  return useMutation<InterviewResponse, Error, AnalyzeRequest>({
    mutationFn: async (data: AnalyzeRequest) => {
      const response = await fetch("/api/interview-questions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.error || "Failed to generate interview questions");
      }

      return response.json();
    },
  });
}
