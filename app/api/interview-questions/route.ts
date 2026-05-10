import { NextResponse } from "next/server";
import { genAI } from "@/lib/gemini";
import { getInterviewGeneratorPrompt } from "@/lib/prompts";
import { rateLimit } from "@/lib/rate-limit";
import { AnalyzeRequestSchema } from "@/lib/validators";
import { InterviewResponse } from "@/types";

export const maxDuration = 60;
export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    const ip = req.headers.get("x-forwarded-for") ?? "127.0.0.1";
    if (!rateLimit(ip)) {
      return NextResponse.json({ error: "Rate limit exceeded" }, { status: 429 });
    }

    const body = await req.json();
    const result = AnalyzeRequestSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: "Invalid input", details: result.error.format() },
        { status: 400 }
      );
    }

    const { resume, jobDescription } = result.data;
    const prompt = getInterviewGeneratorPrompt(resume, jobDescription);

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
      generationConfig: {
        responseMimeType: "application/json",
      },
    });

    const response = await model.generateContent(prompt);
    let text = response.response.text();
    text = text.replace(/```json/gi, '').replace(/```/gi, '').trim();

    try {
      const parsedData: InterviewResponse = JSON.parse(text);
      return NextResponse.json(parsedData);
    } catch (e) {
      console.error("Failed to parse Gemini response", text);
      return NextResponse.json(
        { error: "Failed to parse AI response" },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Interview Generator Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
