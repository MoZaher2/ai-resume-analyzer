"use client";

import { motion, AnimatePresence } from "framer-motion";

import { Card, CardContent } from "@/components/ui/card";

import { QuestionCard } from "./QuestionCard";

import { Sparkles } from "lucide-react";

interface InterviewQuestionsProps {
  displayQuestions: Array<{
    question: string;
    answer: string;
  }>;
}

export function InterviewQuestions({
  displayQuestions,
}: InterviewQuestionsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="w-full max-w-6xl mx-auto px-4 space-y-8"
    >
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-primary/10">
            <Sparkles className="w-6 h-6 text-primary" />
          </div>

          <div>
            <h2 className="text-3xl font-bold tracking-tight">
              Interview Preparation
            </h2>

            <p className="text-muted-foreground mt-1">
              Realistic questions tailored to your resume and
              job description
            </p>
          </div>
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key="questions"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="space-y-6"
        >
          <div className="flex items-center gap-2 py-4">
            <div className="h-px bg-border flex-1" />

            <span className="text-muted-foreground font-medium uppercase tracking-wider text-sm">
              Interview Questions (
              {displayQuestions.length})
            </span>

            <div className="h-px bg-border flex-1" />
          </div>

          <div className="space-y-4">
            {displayQuestions.map((q, index) => (
              <QuestionCard
                key={index}
                question={q.question}
                answer={q.answer}
                index={index}
              />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Card className="border-border/50 bg-gradient-to-br from-muted/50 to-muted/20 backdrop-blur">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-3">
                  Interview Tips
                </h3>

                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>
                    ✓ Practice these answers before your
                    interview
                  </li>

                  <li>
                    ✓ Use the STAR method for behavioral
                    questions
                  </li>

                  <li>
                    ✓ Keep answers concise and to the point
                  </li>

                  <li>
                    ✓ Research the company thoroughly
                  </li>

                  <li>
                    ✓ Prepare specific examples from your
                    experience
                  </li>
                </ul>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}