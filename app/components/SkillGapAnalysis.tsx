import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, XCircle } from "lucide-react";
import { motion } from "framer-motion";

interface SkillGapAnalysisProps {
  matchedSkills: string[];
  missingSkills: string[];
}

export function SkillGapAnalysis({ matchedSkills, missingSkills }: SkillGapAnalysisProps) {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };
  
  const item = {
    hidden: { opacity: 0, scale: 0.9 },
    show: { opacity: 1, scale: 1 }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
      <Card className="border-green-200 dark:border-green-900 bg-green-50/50 dark:bg-green-950/20">
        <CardHeader className="pb-3">
          <CardTitle className="text-green-700 dark:text-green-400 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5" />
            Matched Skills
          </CardTitle>
        </CardHeader>
        <CardContent>
          <motion.div 
            variants={container}
            initial="hidden"
            animate="show"
            className="flex flex-wrap gap-2"
          >
            {matchedSkills.length > 0 ? matchedSkills.map((skill, index) => (
              <motion.span
                key={index}
                variants={item}
                className="px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100 shadow-sm transition-transform hover:scale-105 cursor-default"
              >
                {skill}
              </motion.span>
            )) : (
              <p className="text-sm text-green-600 dark:text-green-400">No matching skills found.</p>
            )}
          </motion.div>
        </CardContent>
      </Card>

      <Card className="border-red-200 dark:border-red-900 bg-red-50/50 dark:bg-red-950/20">
        <CardHeader className="pb-3">
          <CardTitle className="text-red-700 dark:text-red-400 flex items-center gap-2">
            <XCircle className="w-5 h-5" />
            Missing Skills
          </CardTitle>
        </CardHeader>
        <CardContent>
          <motion.div 
            variants={container}
            initial="hidden"
            animate="show"
            className="flex flex-wrap gap-2"
          >
            {missingSkills.length > 0 ? missingSkills.map((skill, index) => (
              <motion.span
                key={index}
                variants={item}
                className="px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100 shadow-sm transition-transform hover:scale-105 cursor-default"
              >
                {skill}
              </motion.span>
            )) : (
              <p className="text-sm text-red-600 dark:text-red-400">Great! No missing required skills.</p>
            )}
          </motion.div>
        </CardContent>
      </Card>
    </div>
  );
}
