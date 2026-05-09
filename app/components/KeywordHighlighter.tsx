import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { highlightKeywords } from "@/lib/highlight";

interface KeywordHighlighterProps {
  jobDescription: string;
  matchedKeywords: string[];
}

export function KeywordHighlighter({ jobDescription, matchedKeywords }: KeywordHighlighterProps) {
  const highlightedHtml = highlightKeywords(jobDescription, matchedKeywords);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Job Description Keyword Match</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="bg-muted p-4 rounded-md">
          <p 
            className="text-sm leading-relaxed max-w-full overflow-hidden whitespace-pre-wrap"
            dangerouslySetInnerHTML={{ __html: highlightedHtml }} 
          />
        </div>
      </CardContent>
    </Card>
  );
}
