"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AnswerCollapseProps {
  answer: string;
}

export function AnswerCollapse({ answer }: AnswerCollapseProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="space-y-3">
      <Button
        onClick={() => setIsOpen(!isOpen)}
        variant="outline"
        className="w-full justify-between group"
      >
        <span className="text-sm font-medium">
          {isOpen ? "Hide Answer" : "Show Answer"}
        </span>
        <ChevronDown
          className={`w-4 h-4 transition-transform duration-300 group-hover:text-primary ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </Button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="p-4 bg-gradient-to-br from-primary/5 via-primary/2 to-transparent border border-primary/20 rounded-lg"
            >
              <p className="text-sm leading-relaxed text-foreground whitespace-pre-wrap">
                {answer}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
