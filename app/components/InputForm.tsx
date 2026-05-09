"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnalyzeRequestSchema } from "@/lib/validators";
import { AnalyzeRequest } from "@/types";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2, FileText, UploadCloud } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";

interface InputFormProps {
  onSubmit: (data: AnalyzeRequest) => void;
  isLoading: boolean;
}

export function InputForm({ onSubmit, isLoading }: InputFormProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [pdfFileName, setPdfFileName] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isValid },
  } = useForm<AnalyzeRequest>({
    resolver: zodResolver(AnalyzeRequestSchema),
    mode: "onChange",
  });

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
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
        throw new Error(errorData.error || "Failed to parse PDF");
      }

      const data = await response.json();
      setValue("resume", data.text, { shouldValidate: true, shouldDirty: true });
      setPdfFileName(file.name);
      toast.success("Resume parsed successfully!");
    } catch (error: any) {
      toast.error(error.message || "Error reading PDF. Please try again.");
    } finally {
      setIsUploading(false);
      // Reset the input value so the same file can be selected again if needed
      e.target.value = '';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="w-full max-w-6xl mx-auto px-4"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="border-border/50 bg-background/50 backdrop-blur">
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <label className="text-lg font-semibold block">Your Resume</label>
                <p className="text-sm text-muted-foreground">Upload your current resume as a PDF file.</p>
              </div>
              <div className="flex flex-col items-center justify-center border-2 border-dashed border-muted-foreground/25 rounded-md p-8 min-h-[300px] bg-background/50 relative transition-colors hover:bg-muted/50 group">
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
                    <p className="text-sm font-medium">Extracting text...</p>
                  </div>
                ) : pdfFileName ? (
                  <div className="flex flex-col items-center text-center">
                    <FileText className="h-10 w-10 text-primary mb-2 group-hover:scale-110 transition-transform" />
                    <p className="text-sm font-medium truncate max-w-[200px]">{pdfFileName}</p>
                    <p className="text-xs text-muted-foreground mt-1 cursor-pointer">Click or drag to replace</p>
                  </div>
                ) : (
                  <div className="flex flex-col items-center text-center">
                    <UploadCloud className="h-10 w-10 text-muted-foreground mb-2 group-hover:scale-110 transition-transform" />
                    <p className="text-sm font-medium">Click or drag PDF to upload</p>
                    <p className="text-xs text-muted-foreground mt-1">Maximum file size: 5MB</p>
                  </div>
                )}
              </div>
              <input type="hidden" {...register("resume")} />
              {errors.resume && (
                <p className="text-sm text-destructive">{errors.resume.message}</p>
              )}
            </CardContent>
          </Card>

          <Card className="border-border/50 bg-background/50 backdrop-blur">
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <label htmlFor="jobDescription" className="text-lg font-semibold block">Job Description</label>
                <p className="text-sm text-muted-foreground">Paste the target job description here.</p>
              </div>
              <Textarea
                id="jobDescription"
                placeholder="Seeking a Frontend Developer experienced with React..."
                className="min-h-[300px] resize-y bg-background focus-visible:ring-1"
                {...register("jobDescription")}
              />
              {errors.jobDescription && (
                <p className="text-sm text-destructive">{errors.jobDescription.message}</p>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="flex justify-center">
          <Button
            type="submit"
            size="lg"
            className="w-full max-w-md h-12 text-lg font-semibold shadow-lg transition-all hover:scale-105"
            disabled={!isValid || isLoading || isUploading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Analyzing Match...
              </>
            ) : (
              "Analyze Resume"
            )}
          </Button>
        </div>
      </form>
    </motion.div>
  );
}
