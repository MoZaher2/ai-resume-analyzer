import { ThemeToggle } from "./ThemeToggle";
import { FileText, Sparkles } from "lucide-react";
import Link from "next/link";
import { GithubIcon } from "@/components/ui/customIcons"

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-14 items-center px-4 md:px-8">
        <div className="mr-4 flex flex-1 items-center space-x-2">
          <Sparkles className="h-6 w-6 text-primary" />
          <span className="hidden font-bold sm:inline-block text-lg">
            AI Resume Analyzer
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <Link
            href="https://github.com/MoZaher2/ai-resume-analyzer"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex h-9 w-9 items-center justify-center rounded-md border border-transparent text-muted-foreground transition-all duration-300 hover:bg-neutral-100 hover:text-neutral-900 dark:hover:bg-neutral-800 dark:hover:text-white"
          >
            <span className="sr-only">GitHub</span>
            <GithubIcon className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" aria-hidden="true" />
          </Link>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
