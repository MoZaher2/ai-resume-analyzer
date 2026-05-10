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
import { InterviewQuestions } from "./components/InterviewQuestions";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { Wand2, LineChart, MessageSquare } from "lucide-react";
import { InterviewGenerator } from "./components/InterviewGenerator";
import { useInterviewQuestions } from "./hooks/useInterviewQuestions";

export default function Home() {
  const { mutate: analyze, isPending, data: analysis, error } = useAnalyzeResume();
  const [requestData, setRequestData] = useState<AnalyzeRequest | null>(null);
  const [activeTab, setActiveTab] = useState<"analyzer" | "improver" | "interview">("analyzer");

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
      <div className="flex justify-center mt-8 mb-12 px-2">
        <div className="flex flex-col sm:flex-row w-full sm:w-auto items-stretch sm:items-center gap-2 p-2 bg-muted/50 rounded-2xl border border-border/50 backdrop-blur-xl">

          <button
            onClick={() => setActiveTab("analyzer")}
            className={`flex items-center justify-center gap-2 px-4 sm:px-6 py-3 rounded-xl text-sm font-medium transition-all duration-300 w-full sm:w-auto ${activeTab === "analyzer"
              ? "bg-background shadow-sm text-primary"
              : "text-muted-foreground hover:text-foreground hover:bg-background/50"
              }`}
          >
            <LineChart className="w-4 h-4 shrink-0" />
            <span className="truncate">Resume Analyzer</span>
          </button>

          <button
            onClick={() => setActiveTab("improver")}
            className={`flex items-center justify-center gap-2 px-4 sm:px-6 py-3 rounded-xl text-sm font-medium transition-all duration-300 w-full sm:w-auto ${activeTab === "improver"
              ? "bg-background shadow-sm text-primary"
              : "text-muted-foreground hover:text-foreground hover:bg-background/50"
              }`}
          >
            <Wand2 className="w-4 h-4 shrink-0" />
            <span className="truncate">Resume Improver</span>
          </button>

          <button
            onClick={() => setActiveTab("interview")}
            className={`flex items-center justify-center gap-2 px-4 sm:px-6 py-3 rounded-xl text-sm font-medium transition-all duration-300 w-full sm:w-auto ${activeTab === "interview"
              ? "bg-background shadow-sm text-primary"
              : "text-muted-foreground hover:text-foreground hover:bg-background/50"
              }`}
          >
            <MessageSquare className="w-4 h-4 shrink-0" />
            <span className="truncate">Interview Generator</span>
          </button>

        </div>
      </div>
      {/* Feature Description */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.35 }}
          className="max-w-3xl mx-auto text-center mb-12 px-4"
        >
          {activeTab === "analyzer" && (
            <div>
              <h2 className="text-2xl font-bold mb-3">
                AI Resume Analyzer
              </h2>

              <p className="text-muted-foreground leading-relaxed">
                Analyze your resume against a job description using AI.
                Get a match score, discover missing skills, highlight
                important keywords, and receive personalized feedback
                to improve your chances of getting hired.
              </p>
            </div>
          )}

          {activeTab === "improver" && (
            <div>
              <h2 className="text-2xl font-bold mb-3">
                AI Resume Improver
              </h2>

              <p className="text-muted-foreground leading-relaxed">
                Enhance your resume with AI-powered suggestions.
                Improve wording, structure, clarity, and professionalism
                to create a stronger and more attractive resume for recruiters.
              </p>
            </div>
          )}

          {activeTab === "interview" && (
            <div>
              <h2 className="text-2xl font-bold mb-3">
                AI Interview Generator
              </h2>

              <p className="text-muted-foreground leading-relaxed">
                Generate realistic interview questions tailored to your
                resume and target job description. Practice technical
                and behavioral questions with AI-generated sample answers.
              </p>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
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
      ) : activeTab === "improver" ? (
        <motion.div
          key="improver"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4 }}
        >
          <ResumeImprover />
        </motion.div>
      ) : (
        <motion.div
          key="interview"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4 }}
        >
          <InterviewGenerator />
        </motion.div>
      )}
    </div>
  );
}
