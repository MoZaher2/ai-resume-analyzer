"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface CircularProgressProps {
  score: number;
}

export function CircularProgress({ score }: CircularProgressProps) {
  const [currentScore, setCurrentScore] = useState(0);

  useEffect(() => {
    const duration = 1500;
    const steps = 60;
    const stepTime = duration / steps;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      setCurrentScore(Math.round((score / steps) * currentStep));
      if (currentStep >= steps) {
        clearInterval(timer);
        setCurrentScore(score);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [score]);

  let colorClass = "text-red-500";
  if (score >= 75) colorClass = "text-green-500";
  else if (score >= 50) colorClass = "text-yellow-500";

  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div className="relative flex items-center justify-center w-40 h-40">
      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 140 140">
        <circle
          cx="70"
          cy="70"
          r={radius}
          className="stroke-muted fill-none"
          strokeWidth="10"
        />
        <motion.circle
          cx="70"
          cy="70"
          r={radius}
          className={`fill-none ${colorClass} transition-colors duration-1000`}
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />
      </svg>
      <div className="absolute flex flex-col items-center justify-center">
        <span className={`text-4xl font-bold ${colorClass}`}>{currentScore}%</span>
        <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider mt-1">Match</span>
      </div>
    </div>
  );
}
