import { getResumeImprovementPrompt } from "@/lib/prompts";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { resume, jobDescription } = await req.json();

    if (!resume || !jobDescription) {
      return NextResponse.json(
        { error: "Resume and job description are required" },
        { status: 400 }
      );
    }

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        { error: "GEMINI_API_KEY is not set" },
        { status: 500 }
      );
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const prompt = getResumeImprovementPrompt(resume, jobDescription);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const streamingResp = await model.generateContentStream(prompt);

    const readableStream = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of streamingResp.stream) {
            controller.enqueue(chunk.text());
          }
          controller.close();
        } catch (error) {
          controller.error(error);
        }
      },
    });

    return new Response(readableStream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-cache",
        "Connection": "keep-alive",
      },
    });
  } catch (error: any) {
    console.error("Resume improvement error:", error);
    return NextResponse.json(
      { error: "Failed to improve resume" },
      { status: 500 }
    );
  }
}
