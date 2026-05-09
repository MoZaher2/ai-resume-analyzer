import { useMutation } from "@tanstack/react-query";
import { AnalyzeRequest, AnalysisResponse } from "@/types";

export function useAnalyzeResume() {
  return useMutation<AnalysisResponse, Error, AnalyzeRequest>({
    mutationFn: async (data: AnalyzeRequest) => {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.error || "Failed to analyze resume");
      }

      return response.json();
    },
  });
}
