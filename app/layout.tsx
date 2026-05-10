import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { QueryProvider } from "./providers/QueryProvider";
import { ThemeProvider } from "./components/theme-provider";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AI Resume Analyzer | ATS Optimization & Resume Improvement",
  description:
    "Boost your chances of getting hired with AI-powered resume analysis. Get ATS score, skill gap insights, keyword optimization, and personalized resume improvements instantly.",

  keywords: [
    "AI resume analyzer",
    "ATS resume checker",
    "resume optimization",
    "AI cover letter generator",
    "resume improvement tool",
    "job application AI",
    "CV analysis",
    "skill gap analysis",
    "resume keywords optimization",
    "career tools AI",
  ],

  authors: [{ name: "Mohamed Zaher Taha" }],
  creator: "Mohamed Zaher Taha",

  metadataBase: new URL("https://ai-resume-analyzer-beryl-theta.vercel.app/"),

  openGraph: {
    title: "AI Resume Analyzer | Improve Your CV with AI",
    description:
      "Analyze your resume against job descriptions, get ATS score, identify missing skills, and improve your CV with AI instantly.",
    url: "https://ai-resume-analyzer-beryl-theta.vercel.app/",
    siteName: "AI Resume Analyzer",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "AI Resume Analyzer Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "AI Resume Analyzer",
    description:
      "Optimize your resume with AI, improve ATS score, and land more interviews.",
    images: ["/og-image.png"],
  },

  icons: {
    icon: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <QueryProvider>
            <div className="min-h-screen flex flex-col">
              <Navbar />
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
          </QueryProvider>
          <Toaster position="top-right" />
        </ThemeProvider>
      </body>
    </html>
  );
}
