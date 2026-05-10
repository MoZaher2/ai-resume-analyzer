import { ThemeToggle } from "./ThemeToggle";
import { FileText, Sparkles } from "lucide-react";
import Link from "next/link";
import { GithubIcon } from "@/components/ui/customIcons"
import logo from "@/public/logo.png"
import Image from "next/image";
export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-20 items-center px-4 md:px-8">
        <div className="mr-4 flex flex-1 items-center space-x-2">
          {/* <Sparkles className="h-6 w-6 text-primary" /> */}
          <Image
            src={logo}
            alt="logo"
            width={50}
            height={50}
          />
          <span className="hidden sm:inline-block font-bold text-lg md:text-xl lg:text-2xl tracking-tight transition-all duration-300 bg-gradient-to-r from-rose-800 to-stone-600 bg-clip-text text-transparent">
            AI Resume Analyzer
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <Link
            href="https://github.com/MoZaher2/ai-resume-analyzer"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex h-10 w-10 items-center justify-center rounded-md border border-transparent text-muted-foreground transition-all duration-300 hover:bg-neutral-100 hover:text-neutral-900 dark:hover:bg-neutral-800 dark:hover:text-white"
          >
            <span className="sr-only">GitHub</span>
            <GithubIcon className="h-6 w-6 transition-transform duration-300 group-hover:scale-110" aria-hidden="true" />
          </Link>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
