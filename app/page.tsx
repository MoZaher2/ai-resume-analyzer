"use client";

import { useState } from "react";
import { Hero } from "./components/Hero";
import { ResumeAnalyzer } from "./components/ResumeAnalyzer";
import { useAnalyzeResume } from "./hooks/useAnalyzeResume";
import { AnalyzeRequest } from "@/types";
import { MatchScoreCard } from "./components/MatchScoreCard";
import { SkillGapAnalysis } from "./components/SkillGapAnalysis";
import { KeywordHighlighter } from "./components/KeywordHighlighter";
import { CoverLetterGenerator } from "./components/CoverLetterGenerator";
import { ResumeImprover } from "./components/ResumeImprover";
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
      {/* Tab Switcher */}
      <div className="flex justify-center mt-8 mb-12">
        <div className="inline-flex items-center p-1 bg-muted/50 rounded-xl border border-border/50 backdrop-blur-xl">
          <button
            onClick={() => setActiveTab("analyzer")}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-medium transition-all duration-300 ${activeTab === "analyzer"
                ? "bg-background shadow-sm text-primary"
                : "text-muted-foreground hover:text-foreground"
              }`}
          >
            <LineChart className="w-4 h-4" />
            Resume Analyzer
          </button>
          <button
            onClick={() => setActiveTab("improver")}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-medium transition-all duration-300 ${activeTab === "improver"
                ? "bg-background shadow-sm text-primary"
                : "text-muted-foreground hover:text-foreground"
              }`}
          >
            <Wand2 className="w-4 h-4" />
            AI Resume Improver
          </button>
        </div>
      </div>

      {activeTab === "analyzer" ? (
        <motion.div
          key="analyzer"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4 }}
        >
          <ResumeAnalyzer onSubmit={handleSubmit} isLoading={isPending} />

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
      ) : (
        <motion.div
          key="improver"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4 }}
        >
          <ResumeImprover />
        </motion.div>
      )}
    </div>
  );
}
