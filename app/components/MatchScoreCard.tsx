import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CircularProgress } from "./CircularProgress";

interface MatchScoreCardProps {
  score: number;
  strengths: string[];
  weaknesses: string[];
  summary: string;
}

export function MatchScoreCard({ score, strengths, weaknesses, summary }: MatchScoreCardProps) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>ATS Analysis Results</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col md:flex-row gap-8 items-center md:items-start">
        <div className="flex-shrink-0">
          <CircularProgress score={score} />
        </div>
        <div className="flex-1 space-y-6">
          <div>
            <h3 className="font-semibold text-lg mb-2">Summary</h3>
            <p className="text-muted-foreground">{summary}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium text-green-600 mb-2">Strengths</h4>
              <ul className="space-y-1">
                {strengths.map((s, i) => (
                  <li key={i} className="text-sm flex items-start gap-2">
                    <span className="text-green-500 mt-0.5">•</span>
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-red-600 mb-2">Areas to Improve</h4>
              <ul className="space-y-1">
                {weaknesses.map((w, i) => (
                  <li key={i} className="text-sm flex items-start gap-2">
                    <span className="text-red-500 mt-0.5">•</span>
                    <span>{w}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
