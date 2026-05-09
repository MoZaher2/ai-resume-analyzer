"use client";

import { useState } from "react";
import { Hero } from "./components/Hero";
import { InputForm } from "./components/InputForm";
import { useAnalyzeResume } from "./hooks/useAnalyzeResume";
import { AnalyzeRequest } from "@/types";
import { MatchScoreCard } from "./components/MatchScoreCard";
import { SkillGapAnalysis } from "./components/SkillGapAnalysis";
import { KeywordHighlighter } from "./components/KeywordHighlighter";
import { CoverLetterGenerator } from "./components/CoverLetterGenerator";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { Wand2, LineChart } from "lucide-react";

export default function Home() {
  const { mutate: analyze, isPending, data: analysis, error } = useAnalyzeResume();
  const [requestData, setRequestData] = useState<AnalyzeRequest | null>(null);
  const [activeTab, setActiveTab] = useState<"analyzer" | "improver">("analyzer");

  const handleSubmit = (data: AnalyzeRequest) => {
    setRequestData(data);
    analyze(data, {
      onError: (err) => {
        toast.error(err.message || "Failed to analyze resume.");
      },
      onSuccess: () => {
        toast.success("Analysis Complete!");
      }
    });
  };

  return (
    <div className="container mx-auto py-8">
      <Hero />
      <motion.div
        key="analyzer"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.4 }}
      >
        <InputForm onSubmit={handleSubmit} isLoading={isPending} />

        <AnimatePresence>
          {analysis && requestData && (
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="w-full max-w-6xl mx-auto px-4 mt-16 space-y-8 pb-20"
            >
              <div className="flex items-center gap-4 py-4 w-full">
                <div className="h-px bg-border flex-1" />
                <span className="text-muted-foreground font-medium uppercase tracking-wider text-sm">
                  Analysis Results
                </span>
                <div className="h-px bg-border flex-1" />
              </div>

              <MatchScoreCard
                score={analysis.matchScore}
                strengths={analysis.strengths}
                weaknesses={analysis.weaknesses}
                summary={analysis.summary}
              />

              <SkillGapAnalysis
                matchedSkills={analysis.matchedSkills}
                missingSkills={analysis.missingSkills}
              />

              <KeywordHighlighter
                jobDescription={requestData.jobDescription}
                matchedKeywords={analysis.matchedKeywords}
              />

              <div className="pt-8">
                <CoverLetterGenerator requestData={requestData} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

    </div>
  );
}
