"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { AnswerCollapse } from "./AnswerCollapse";
import { MessageCircle, Zap, Brain, CheckCircle, Target } from "lucide-react";

interface QuestionCardProps {
  question: string;
  answer: string;
  index: number;
}

const questionIcons = [
  { icon: MessageCircle, label: "Behavioral", color: "text-blue-500" },
  { icon: Zap, label: "Technical", color: "text-yellow-500" },
  { icon: Brain, label: "Problem Solving", color: "text-purple-500" },
  { icon: CheckCircle, label: "Experience-based", color: "text-green-500" },
  { icon: Target, label: "Realistic", color: "text-orange-500" },
];

export function QuestionCard({ question, answer, index }: QuestionCardProps) {
  const iconData = questionIcons[index % questionIcons.length];
  const Icon = iconData.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      whileHover={{ y: -4 }}
    >
      <Card className="border-border/50 bg-gradient-to-br from-background via-background to-muted/30 backdrop-blur hover:shadow-lg transition-all duration-300 overflow-hidden group">
        <CardContent className="p-6 space-y-4">
          <div className="flex items-start gap-3">
            <div className={`p-2 rounded-lg bg-muted/50 group-hover:bg-primary/10 transition-colors ${iconData.color}`}>
              <Icon className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-primary/70 uppercase tracking-wider mb-1">
                Question {index + 1} • {iconData.label}
              </p>
              <p className="text-base font-medium leading-relaxed text-foreground break-words">
                {question}
              </p>
            </div>
          </div>

          <div className="pt-2 border-t border-border/30">
            <AnswerCollapse answer={answer} />
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
