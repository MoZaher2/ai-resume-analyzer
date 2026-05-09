"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useCoverLetter } from "@/app/hooks/useCoverLetter";
import { AnalyzeRequest } from "@/types";
import { Copy, RefreshCw, PenLine } from "lucide-react";
import { toast } from "sonner";

interface CoverLetterGeneratorProps {
  requestData: AnalyzeRequest;
}

export function CoverLetterGenerator({ requestData }: CoverLetterGeneratorProps) {
  const { content, generate, isGenerating, error } = useCoverLetter();
  const [hasGenerated, setHasGenerated] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [content]);

  const handleGenerate = () => {
    setHasGenerated(true);
    generate(requestData);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    toast.success("Cover letter copied to clipboard!");
  };

  if (!hasGenerated) {
    return (
      <Card className="w-full flex flex-col items-center justify-center p-12 bg-muted/40 border-dashed">
        <PenLine className="w-12 h-12 text-muted-foreground mb-4" />
        <h3 className="text-xl font-semibold mb-2">Generate a Cover Letter</h3>
        <p className="text-muted-foreground text-center max-w-md mb-6">
          Use AI to write a personalized, 3-paragraph cover letter tailored to this specific job description.
        </p>
        <Button onClick={handleGenerate} size="lg">
          Generate Cover Letter
        </Button>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>AI Cover Letter</CardTitle>
        <div className="space-x-2">
          {content && (
            <Button variant="outline" size="icon" onClick={handleCopy} disabled={isGenerating}>
              <Copy className="w-4 h-4" />
            </Button>
          )}
          <Button variant="outline" size="icon" onClick={handleGenerate} disabled={isGenerating}>
            <RefreshCw className={`w-4 h-4 ${isGenerating ? "animate-spin" : ""}`} />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {error ? (
          <div className="p-4 bg-red-50 text-red-600 rounded-md">
            {error}
          </div>
        ) : (
          <div 
            ref={scrollRef}
            className="w-full bg-background border p-6 rounded-md min-h-[300px] max-h-[500px] overflow-y-auto whitespace-pre-wrap text-sm leading-relaxed relative"
          >
            {content || <span className="opacity-50">Generating...</span>}
            {isGenerating && (
              <span className="inline-block w-2 h-4 bg-primary ml-1 animate-pulse" />
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
