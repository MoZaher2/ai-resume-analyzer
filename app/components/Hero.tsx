"use client";

import { motion } from "framer-motion";

export function Hero() {
  return (
    <section className="mx-auto flex max-w-[980px] flex-col items-center gap-2 py-8 md:py-12 md:pb-8 lg:py-24 lg:pb-20">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center text-3xl font-extrabold leading-tight tracking-tighter md:text-5xl lg:text-6xl lg:leading-[1.1]"
      >
        Optimize your Resume with{" "}
        <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
          AI Precision
        </span>
      </motion.h1>
      <motion.span
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="max-w-[750px] mt-4 text-center text-lg text-muted-foreground sm:text-xl"
      >
        Instantly match your resume to job descriptions, uncover skill gaps, and generate tailored cover letters using advanced ATS scoring.
      </motion.span>
    </section>
  );
}
