"use client";

import Link from "next/link";
import { Mail, MessageCircle, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { GithubIcon, LinkedinIcon } from "@/components/ui/customIcons";
import logo from "@/public/logo.png"
import Image from "next/image";


const socialLinks = [
  {
    name: "LinkedIn",
    icon: LinkedinIcon,
    href: "https://www.linkedin.com/in/mohamed-zaher-83678a316/",
    color: "hover:text-blue-500 hover:border-blue-500/50 hover:bg-blue-500/10",
  },
  {
    name: "GitHub",
    icon: GithubIcon,
    href: "https://github.com/MoZaher2",
    color: "hover:text-neutral-900 dark:hover:text-white hover:border-neutral-900/50 dark:hover:border-white/50 hover:bg-neutral-900/10 dark:hover:bg-white/10",
  },
  {
    name: "Email",
    icon: Mail,
    href: "mailto:mohamedzahertaha@gmail.com",
    color: "hover:text-red-500 hover:border-red-500/50 hover:bg-red-500/10",
  },
  {
    name: "WhatsApp",
    icon: MessageCircle,
    href: "https://wa.me/201005138370",
    color: "hover:text-green-500 hover:border-green-500/50 hover:bg-green-500/10",
  },
];

export function Footer() {
  return (
    <footer className="relative border-t border-border/50 bg-background/50 backdrop-blur-xl overflow-hidden">
      {/* Decorative gradients */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary/5 rounded-full blur-3xl opacity-50" />
        <div className="absolute top-12 -right-24 w-96 h-96 bg-primary/5 rounded-full blur-3xl opacity-50" />
      </div>

      <div className="mx-auto max-w-7xl px-6 pb-8 pt-16 sm:pt-24 lg:px-8 relative z-10">
        <div className="flex flex-col items-center justify-center text-center">
          {/* Brand Section */}
          <Link href="/" className="flex items-center gap-2 group mb-6">
            <div className="relative flex items-center justify-center transition-all duration-300 group-hover:scale-105">
              <Image
                src={logo}
                alt="logo"
                width={60}
                height={60}
              />
            </div>
            <span className="bg-gradient-to-r from-rose-800 to-stone-600 bg-clip-text text-transparent text-2xl font-bold text-transparent tracking-tight">
              AI Resume Analyzer
            </span>

          </Link>
          <p className="text-sm leading-6 text-muted-foreground max-w-md mx-auto mb-8">
            AI-powered resume analysis and cover letter generation platform. Elevate your career with data-driven insights.
          </p>
          <div className="flex gap-x-4 justify-center">
            {socialLinks.map((item) => {
              const Icon = item.icon;
              return (
                <motion.a
                  key={item.name}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-background/50 text-muted-foreground transition-all duration-300 ${item.color}`}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="sr-only">{item.name}</span>
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </motion.a>
              );
            })}
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-16 border-t border-border/50 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs leading-5 text-muted-foreground">
            &copy; {new Date().getFullYear()} AI Resume Analyzer. Built by <a href="https://mo-zaher-portfolio.vercel.app/" target="_blank" rel="noopener noreferrer" className="font-semibold text-foreground">Mohamed Zaher</a>.
          </p>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            Built with
            <span className="font-medium text-foreground">Next.js</span>,
            <span className="font-medium text-foreground">Gemini AI</span>,
            <span className="font-medium text-foreground">shadcn/ui</span> &
            <span className="font-medium text-foreground">Tailwind CSS</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
