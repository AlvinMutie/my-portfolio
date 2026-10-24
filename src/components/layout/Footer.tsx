"use client";

import Link from "next/link";
import { Watcher } from "@/components/ui/Watcher";
import { Github, Linkedin, Mail, ArrowUpRight } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative border-t border-black/5 dark:border-white/10 bg-surface/50 dark:bg-[#07090b] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 py-14 sm:py-20 md:px-12 flex flex-col items-center">
        {/* Watcher Companion Section */}
        <div className="flex flex-col items-center justify-center text-center space-y-4 mb-12">
          <div className="relative p-2 rounded-3xl bg-black/[0.02] dark:bg-white/[0.02] border border-black/5 dark:border-white/5 backdrop-blur-sm">
            <Watcher
              follow={65}
              bounce={35}
              size={96}
              shape="Cube"
              eyes="Slant"
            />
          </div>
          <p className="text-xs font-mono tracking-wider text-zinc-500 dark:text-zinc-400 uppercase">
            Click to interact • Watching your cursor
          </p>
        </div>

        {/* Footer Nav & Social Links */}
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-8 py-8 border-y border-black/5 dark:border-white/10 items-center text-center md:text-left">
          {/* Column 1: Info */}
          <div>
            <span className="text-lg font-black tracking-tight text-zinc-900 dark:text-white">
              Alvin Mutie<span className="text-blue-600 dark:text-[#AEC6FF]">.</span>
            </span>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 max-w-xs mx-auto md:mx-0">
              Full Stack Software Engineer building high-performance web applications, intelligent systems & interactive digital experiences.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div className="flex justify-center items-center gap-6 text-sm font-medium">
            <Link
              href="/"
              className="text-zinc-600 hover:text-blue-600 dark:text-zinc-400 dark:hover:text-[#AEC6FF] transition-colors"
            >
              Home
            </Link>
            <Link
              href="/projects"
              className="text-zinc-600 hover:text-blue-600 dark:text-zinc-400 dark:hover:text-[#AEC6FF] transition-colors"
            >
              Projects
            </Link>
            <Link
              href="/contact"
              className="text-zinc-600 hover:text-blue-600 dark:text-zinc-400 dark:hover:text-[#AEC6FF] transition-colors"
            >
              Contact
            </Link>
          </div>

          {/* Column 3: Socials */}
          <div className="flex justify-center md:justify-end items-center gap-4">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Profile"
              className="p-2 rounded-xl text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
            >
              <Github className="size-4" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn Profile"
              className="p-2 rounded-xl text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
            >
              <Linkedin className="size-4" />
            </a>
            <Link
              href="/contact"
              aria-label="Email Alvin"
              className="p-2 rounded-xl text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
            >
              <Mail className="size-4" />
            </Link>
          </div>
        </div>

        {/* Copyright */}
        <div className="w-full flex flex-col sm:flex-row items-center justify-between pt-8 text-xs text-zinc-400 dark:text-zinc-500 gap-4">
          <p>© {new Date().getFullYear()} Alvin Mutie. All rights reserved.</p>
          <div className="flex items-center gap-2">
            <span className="inline-block size-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Available for remote opportunities & contracts</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
