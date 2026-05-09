import { NextResponse } from "next/server";
import { rateLimit } from "@/lib/rate-limit";
// @ts-ignore
import PDFParser from "pdf2json";

export async function POST(req: Request) {
  try {
    const ip = req.headers.get("x-forwarded-for") ?? "127.0.0.1";
    if (!rateLimit(ip)) {
      return NextResponse.json({ error: "Rate limit exceeded" }, { status: 429 });
    }

    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No PDF file provided" }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const text = await new Promise<string>((resolve, reject) => {
      const pdfParser = new PDFParser(null, true);

      pdfParser.on("pdfParser_dataError", (errData: any) => {
        reject(errData.parserError || new Error("Failed to parse PDF"));
      });

      pdfParser.on("pdfParser_dataReady", () => {
        resolve(pdfParser.getRawTextContent());
      });

      pdfParser.parseBuffer(buffer);
    });

    if (!text || text.trim() === "") {
      return NextResponse.json({ error: "Could not extract text from PDF. It may be scanned or empty." }, { status: 400 });
    }
    return NextResponse.json({ text });
  } catch (error: any) {
    console.error("PDF Parsing Error:", error);
    return NextResponse.json({ error: error.message || "Failed to parse PDF" }, { status: 500 });
  }
}
