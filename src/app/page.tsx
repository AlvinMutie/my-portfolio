"use client";

import Link from "next/link";
import BackgroundPaths from "@/components/ui/BackgroundPaths";
import AsciiTerminal from "@/components/ui/AsciiTerminal";
import TelemetryDashboard from "@/components/ui/TelemetryDashboard";
import { motion } from "framer-motion";
import { ArrowRight, Code2, Sparkles, Terminal } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-white dark:selection:text-black overflow-x-hidden transition-colors duration-300">
      {/* Hero Section */}
      <section className="relative min-h-screen w-full flex items-center justify-center">
        <BackgroundPaths className="min-h-screen w-full">
          <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 max-w-4xl space-y-6 pt-16">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-4"
            >
              <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-zinc-900 dark:text-white leading-tight">
                Hi. I am{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-sky-500 dark:from-white dark:via-[#AEC6FF] dark:to-[#DBC0E5]">
                  Alvin Mutie
                </span>
                <span className="text-blue-600 dark:text-[#AEC6FF]">,</span>
              </h1>

              <p className="text-sm sm:text-base md:text-lg text-zinc-600 dark:text-zinc-400 font-medium tracking-wide">
                (welcome to my portfolio)
              </p>
            </motion.div>

            {/* Quick Links / Actions */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-wrap items-center justify-center gap-3 pt-2"
            >
              <Link
                href="/projects"
                className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold bg-zinc-900 text-white dark:bg-white dark:text-zinc-950 hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-all shadow-sm active:scale-95"
              >
                <span>View Projects</span>
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium border border-black/10 dark:border-white/10 bg-white/60 dark:bg-white/[0.05] text-zinc-800 dark:text-zinc-200 hover:bg-black/5 dark:hover:bg-white/10 backdrop-blur-md transition-all active:scale-95"
              >
                <span>Get in touch</span>
              </Link>
            </motion.div>
          </div>
        </BackgroundPaths>
      </section>

      {/* ASCII Terminal Screen (Powered by Asciify) */}
      <section className="relative px-6 md:px-12 -mt-16 z-20">
        <AsciiTerminal />
      </section>

      {/* Core Engineering Disciplines */}
      <section className="relative py-16 px-6 md:px-12 max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <p className="text-xs font-mono font-semibold uppercase tracking-wider text-blue-600 dark:text-[#AEC6FF] mb-2">
              Capabilities & Focus
            </p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-zinc-900 dark:text-white">
              Engineering with precision & craft.
            </h2>
          </div>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 max-w-md">
            Architecting modern digital products with modern TypeScript, reactive state, resilient backends, and fluid animations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl border border-black/5 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.02] backdrop-blur-sm hover:border-black/15 dark:hover:border-white/20 transition-all">
            <div className="size-10 rounded-xl bg-blue-500/10 dark:bg-[#AEC6FF]/10 text-blue-600 dark:text-[#AEC6FF] flex items-center justify-center mb-4">
              <Code2 className="size-5" />
            </div>
            <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-2">
              Full Stack Web Architecture
            </h3>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Production-grade React, Next.js, Node.js, and serverless architectures engineered for speed, SEO, and developer ergonomics.
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-black/5 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.02] backdrop-blur-sm hover:border-black/15 dark:hover:border-white/20 transition-all">
            <div className="size-10 rounded-xl bg-indigo-500/10 dark:bg-[#DBC0E5]/10 text-indigo-600 dark:text-[#DBC0E5] flex items-center justify-center mb-4">
              <Sparkles className="size-5" />
            </div>
            <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-2">
              Interactive Design & Motion
            </h3>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Crafting micro-interactions, spring physics, canvas visuals, and smooth view transitions that make interfaces feel alive.
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-black/5 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.02] backdrop-blur-sm hover:border-black/15 dark:hover:border-white/20 transition-all">
            <div className="size-10 rounded-xl bg-sky-500/10 dark:bg-sky-400/10 text-sky-600 dark:text-sky-300 flex items-center justify-center mb-4">
              <Terminal className="size-5" />
            </div>
            <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-2">
              Intelligent Tools & Systems
            </h3>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Building AI-assisted tooling, real-time data pipelines, and clean API integrations with rigorous type safety.
            </p>
          </div>
        </div>
      </section>

      {/* Telemetry & Velocity Dashboard (Powered by Bklit UI) */}
      <section className="relative px-6 md:px-12 pb-16">
        <TelemetryDashboard />
      </section>
    </main>
  );
}
