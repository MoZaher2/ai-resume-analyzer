"use client";

import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { AnalyzeRequestSchema } from "@/lib/validators";
import { AnalyzeRequest } from "@/types";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";

import {
  Loader2,
  Copy,
  Download,
  RefreshCcw,
  Check,
  BriefcaseBusiness,
  Sparkles,
  FileText,
  UploadCloud,
  Wand2
} from "lucide-react";

import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";

import jsPDF from "jspdf";

interface ResumeImproverProps {
  improvedResume: string;
  setImprovedResume: React.Dispatch<React.SetStateAction<string>>;
}

export function ResumeImprover({
  improvedResume,
  setImprovedResume,
}: ResumeImproverProps) {
  // const [improvedResume, setImprovedResume] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [pdfFileName, setPdfFileName] = useState<string | null>(null);

  const resultContainerRef = useRef<HTMLDivElement>(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isValid },
  } = useForm<AnalyzeRequest>({
    resolver: zodResolver(AnalyzeRequestSchema),
    mode: "onChange",
  });

  const handleFileUpload = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (file.type !== "application/pdf") {
      toast.error("Please upload a valid PDF file.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("File size must be less than 5MB.");
      return;
    }

    setIsUploading(true);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("/api/parse-pdf", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();

        throw new Error(
          errorData.error || "Failed to parse PDF"
        );
      }

      const data = await response.json();

      setValue("resume", data.text, {
        shouldValidate: true,
        shouldDirty: true,
      });

      setPdfFileName(file.name);

      toast.success("Resume parsed successfully!");
    } catch (error: any) {
      toast.error(
        error.message || "Error reading PDF. Please try again."
      );
    } finally {
      setIsUploading(false);
      e.target.value = "";
    }
  };

  const handleImprove = async (data: AnalyzeRequest) => {
    setIsLoading(true);
    setImprovedResume("");
    setTimeout(() => {
      resultContainerRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 100);
    try {
      const response = await fetch("/api/improve-resume", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to improve resume.");
      }

      const reader = response.body?.getReader();

      const decoder = new TextDecoder();

      if (!reader) {
        throw new Error("Streaming not supported");
      }

      setTimeout(() => {
        resultContainerRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 100);

      while (true) {
        const { done, value } = await reader.read();

        if (done) break;

        const chunk = decoder.decode(value, {
          stream: true,
        });

        setImprovedResume((prev) => prev + chunk);
      }

      toast.success("Resume improved successfully!");
    } catch (error) {
      console.error(error);

      toast.error(
        "An error occurred while improving the resume."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = () => {
    if (!improvedResume) return;

    navigator.clipboard.writeText(improvedResume);

    setIsCopied(true);

    toast.success("Copied to clipboard!");

    setTimeout(() => setIsCopied(false), 2000);
  };

  const downloadPDF = () => {
    if (!improvedResume) {
      toast.error("No resume to download.");
      return;
    }

    toast.info("Generating PDF...");

    const doc = new jsPDF({
      unit: "pt",
      format: "a4",
    });

    const margin = 50;

    const pageWidth = doc.internal.pageSize.getWidth();

    const pageHeight = doc.internal.pageSize.getHeight();

    const maxLineWidth = pageWidth - margin * 2;

    doc.setFont("helvetica", "normal");

    doc.setFontSize(11);

    const lines = doc.splitTextToSize(
      improvedResume,
      maxLineWidth
    );

    let y = margin;

    const lineHeight = 16;

    lines.forEach((line: string) => {
      if (y + lineHeight > pageHeight - margin) {
        doc.addPage();

        y = margin;
      }

      doc.text(line, margin, y);

      y += lineHeight;
    });

    doc.save("Improved_Resume.pdf");

    toast.success("PDF downloaded successfully!");
  };

  return (
    <div className="w-full max-w-7xl mx-auto space-y-12">
      <form
        onSubmit={handleSubmit(handleImprove)}
        className="space-y-8"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <Card className="border-border/50 bg-background/50 backdrop-blur-xl shadow-lg relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              <CardContent className="p-6 space-y-6 relative z-10 ">
                {/* Resume Upload */}
                <div className="space-y-2">
                  <label className="text-lg font-semibold flex items-center gap-2">
                    <FileText className="h-5 w-5 text-primary" />
                    Your Resume
                  </label>

                  <p className="text-sm text-muted-foreground">
                    Upload your current resume as a PDF file.
                  </p>
                </div>

                <div className="flex flex-col items-center justify-center border-2 border-dashed border-muted-foreground/25 rounded-md p-8 min-h-[250px] bg-background/50 relative transition-colors hover:bg-muted/50 group">
                  <input
                    type="file"
                    accept=".pdf,application/pdf"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                    onChange={handleFileUpload}
                    disabled={isUploading}
                  />

                  {isUploading ? (
                    <div className="flex flex-col items-center">
                      <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />

                      <p className="text-sm font-medium">
                        Extracting text...
                      </p>
                    </div>
                  ) : pdfFileName ? (
                    <div className="flex flex-col items-center text-center">
                      <FileText className="h-10 w-10 text-primary mb-2 group-hover:scale-110 transition-transform" />

                      <p className="text-sm font-medium truncate max-w-[200px]">
                        {pdfFileName}
                      </p>

                      <p className="text-xs text-muted-foreground mt-1 cursor-pointer">
                        Click or drag to replace
                      </p>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center text-center">
                      <UploadCloud className="h-10 w-10 text-muted-foreground mb-2 group-hover:scale-110 transition-transform" />

                      <p className="text-sm font-medium">
                        Click or drag PDF to upload
                      </p>

                      <p className="text-xs text-muted-foreground mt-1">
                        Maximum file size: 5MB
                      </p>
                    </div>
                  )}
                </div>

                <input
                  type="hidden"
                  {...register("resume")}
                />

                {errors.resume && (
                  <p className="text-sm text-destructive">
                    {errors.resume.message}
                  </p>
                )}

                {/* Job Description */}
                <div className="space-y-2">
                  <label className="text-lg font-semibold flex items-center gap-2">
                    <BriefcaseBusiness className="h-5 w-5 text-primary" />
                    Job Description
                  </label>

                  <p className="text-sm text-muted-foreground">
                    Paste the description of the job you are applying for.
                  </p>

                  <Textarea
                    placeholder="We are looking for a highly skilled developer..."
                    className="min-h-[250px] resize-y bg-background/50 focus-visible:ring-primary/50"
                    {...register("jobDescription")}
                  />

                  {errors.jobDescription && (
                    <p className="text-sm text-destructive">
                      {errors.jobDescription.message}
                    </p>
                  )}
                </div>

                <Button
                  type="submit"
                  disabled={
                    !isValid ||
                    isLoading ||
                    isUploading ||
                    improvedResume.length > 0
                  }
                  className="w-full h-12 text-lg font-medium shadow-md transition-all hover:scale-[1.02]"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Improving Resume...
                    </>
                  ) : (
                    <>
                      <Wand2 className="w-4 h-4 shrink-0" />
                      Improve Resume
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          {/* Output Section */}
          <div
            ref={resultContainerRef}
            className="h-full"
          >
            <AnimatePresence mode="wait">
              {!improvedResume && !isLoading ? (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="h-full min-h-[500px] flex flex-col items-center justify-center text-center p-8 border-2 border-dashed border-border rounded-xl bg-muted/20"
                >
                  <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <Sparkles className="h-10 w-10 text-primary opacity-50" />
                  </div>

                  <h3 className="text-xl font-semibold mb-2">
                    Ready to Optimize
                  </h3>

                  <p className="text-muted-foreground max-w-sm">
                    Upload your resume and job description,
                    then click the button to see the AI magic
                    happen.
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  key="result"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  className="h-full flex flex-col space-y-4"
                >
                  <Card className="flex-1 border-border/50 bg-background/50 backdrop-blur-xl shadow-lg overflow-hidden flex flex-col">
                    <div className="flex flex-wrap items-center justify-between p-4 border-b border-border/50 bg-muted/30 gap-4">
                      <h3 className="font-semibold flex items-center gap-2">
                        <Sparkles className="h-4 w-4 text-primary" />
                        Optimized Resume
                      </h3>

                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={copyToClipboard}
                          disabled={
                            !improvedResume || isLoading
                          }
                        >
                          {isCopied ? (
                            <Check className="h-4 w-4 text-green-500" />
                          ) : (
                            <Copy className="h-4 w-4" />
                          )}
                        </Button>

                        <Button
                          variant="outline"
                          size="sm"
                          onClick={downloadPDF}
                          disabled={
                            !improvedResume || isLoading
                          }
                        >
                          <Download className="h-4 w-4" />
                        </Button>

                        <Button
                          variant="outline"
                          size="sm"
                          onClick={handleSubmit(handleImprove)}
                          disabled={isLoading}
                        >
                          <RefreshCcw
                            className={`h-4 w-4 ${isLoading
                              ? "animate-spin"
                              : ""
                              }`}
                          />
                        </Button>
                      </div>
                    </div>

                    <CardContent className="p-0 flex-1 relative bg-white dark:bg-neutral-950">
                      <div
                        className="p-8 min-h-[600px] whitespace-pre-wrap font-sans text-sm md:text-base leading-relaxed text-neutral-900 dark:text-neutral-100 max-w-full overflow-x-auto"
                      >
                        {improvedResume ? (
                          improvedResume
                        ) : (
                          // CV Skeleton UI
                          <div className="animate-pulse space-y-6">
                            {/* Header */}
                            <div className="border rounded-2xl space-y-3 text-center shadow-sm">
                              <div className="h-8 bg-muted rounded w-1/3" />
                              <div className="h-4 bg-muted rounded w-2/3" />
                            </div>

                            {/* CV Preview */}
                            <div className="p-6 space-y-6 bg-background shadow-sm">
                              {/* Name */}
                              <div className="space-y-2">
                                <div className="h-8 bg-muted rounded w-1/2" />
                                <div className="h-4 bg-muted rounded w-1/3" />
                              </div>

                              {/* Summary */}
                              <div className="space-y-2">
                                <div className="h-5 bg-muted rounded w-1/4 mb-3" />
                                <div className="h-4 bg-muted rounded w-full" />
                                <div className="h-4 bg-muted rounded w-11/12" />
                                <div className="h-4 bg-muted rounded w-10/12" />
                              </div>

                              {/* Experience */}
                              <div className="space-y-3">
                                <div className="h-5 bg-muted rounded w-1/4 mb-2" />

                                {[1, 2].map((item) => (
                                  <div key={item} className="space-y-2">
                                    <div className="flex justify-between">
                                      <div className="h-4 bg-muted rounded w-1/3" />
                                      <div className="h-4 bg-muted rounded w-20" />
                                    </div>

                                    <div className="h-4 bg-muted rounded w-1/4" />

                                    <div className="space-y-2 pt-1">
                                      <div className="h-3 bg-muted rounded w-full" />
                                      <div className="h-3 bg-muted rounded w-5/6" />
                                      <div className="h-3 bg-muted rounded w-4/6" />
                                    </div>
                                  </div>
                                ))}
                              </div>

                              {/* Skills */}
                              <div className="space-y-3">
                                <div className="h-5 bg-muted rounded w-1/5" />

                                <div className="flex flex-wrap gap-2">
                                  {[1, 2, 3, 4, 5, 6].map((item) => (
                                    <div
                                      key={item}
                                      className="h-8 bg-muted rounded-full w-24"
                                    />
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </form>
    </div>
  );
}