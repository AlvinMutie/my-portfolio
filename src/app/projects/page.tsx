"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Hammer, Sparkles, ArrowLeft, ArrowUpRight, Terminal, Github } from "lucide-react";

export default function ProjectsPage() {
  return (
    <main className="min-h-screen pt-32 pb-24 px-6 sm:px-8 md:px-12 max-w-4xl mx-auto flex flex-col items-center justify-center text-center selection:bg-primary selection:text-white dark:selection:text-black">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="w-full space-y-8 flex flex-col items-center"
      >
        {/* Status Pill */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-amber-500/20 bg-amber-500/10 text-amber-600 dark:text-amber-400 text-xs font-mono font-medium">
          <span className="size-2 rounded-full bg-amber-500 animate-pulse" />
          <span>Under Construction • Coming Soon</span>
        </div>

        {/* Heading */}
        <div className="space-y-3 max-w-2xl">
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-zinc-900 dark:text-white">
            Projects In The Workshop
          </h1>
          <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
            Alvin is currently refining and documenting production case studies, system architectures, and open-source experiments. This showcase will be unveiled soon.
          </p>
        </div>

        {/* Sneak Peek Terminal Card */}
        <div className="w-full max-w-lg text-left p-6 rounded-2xl border border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.02] backdrop-blur-md shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-black/5 dark:border-white/5 pb-3">
            <div className="flex items-center gap-2">
              <span className="size-2.5 rounded-full bg-rose-500/80 inline-block" />
              <span className="size-2.5 rounded-full bg-amber-500/80 inline-block" />
              <span className="size-2.5 rounded-full bg-emerald-500/80 inline-block" />
            </div>
            <span className="text-[11px] font-mono text-zinc-400">preview_manifest.json</span>
          </div>

          <div className="font-mono text-xs text-zinc-600 dark:text-zinc-400 space-y-2">
            <p className="text-zinc-400 dark:text-zinc-500">// Upcoming feature exhibits:</p>
            <div className="space-y-1.5 pl-2 border-l border-blue-500/30">
              <p><span className="text-blue-600 dark:text-[#AEC6FF] font-semibold">01.</span> Nexus Flow — Real-time CRDT Canvas Engine</p>
              <p><span className="text-blue-600 dark:text-[#AEC6FF] font-semibold">02.</span> Aura Copilot — Autonomous LLM Reasoning Agent</p>
              <p><span className="text-blue-600 dark:text-[#AEC6FF] font-semibold">03.</span> Hyperion Core — High-Throughput Telemetry Streamer</p>
              <p><span className="text-blue-600 dark:text-[#AEC6FF] font-semibold">04.</span> Verve UI — Motion & Spring Component Toolkit</p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-semibold bg-zinc-900 text-white dark:bg-white dark:text-zinc-950 hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-all shadow-sm active:scale-95"
          >
            <ArrowLeft className="size-3.5" />
            <span>Return Home</span>
          </Link>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-medium border border-black/10 dark:border-white/10 bg-white/60 dark:bg-white/[0.05] text-zinc-800 dark:text-zinc-200 hover:bg-black/5 dark:hover:bg-white/10 backdrop-blur-md transition-all active:scale-95"
          >
            <Github className="size-3.5" />
            <span>Browse GitHub</span>
            <ArrowUpRight className="size-3 text-zinc-400" />
          </a>
        </div>
      </motion.div>
    </main>
  );
}
