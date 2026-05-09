import { getCoverLetterPrompt } from "@/lib/prompts";
import { rateLimit } from "@/lib/rate-limit";
import { AnalyzeRequestSchema } from "@/lib/validators";
import { genAI } from "@/lib/gemini";
import { NextResponse } from "next/server";

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
    const prompt = getCoverLetterPrompt(resume, jobDescription);

    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    const streamingResp = await model.generateContentStream(prompt);

    const stream = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of streamingResp.stream) {
            controller.enqueue(chunk.text());
          }
          controller.close();
        } catch (err) {
          controller.error(err);
        }
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-cache",
        "Connection": "keep-alive",
      },
    });
  } catch (error) {
    console.error("Cover Letter Streaming Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
