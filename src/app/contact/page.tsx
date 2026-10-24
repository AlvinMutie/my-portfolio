"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Mail, Github, Linkedin, ArrowLeft, ArrowRight, Clock, MapPin, Sparkles } from "lucide-react";

export default function ContactPage() {
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
          <span>Contact Portal Under Construction</span>
        </div>

        {/* Heading */}
        <div className="space-y-3 max-w-2xl">
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-zinc-900 dark:text-white">
            Let&apos;s Connect Directly
          </h1>
          <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
            The interactive messaging form is currently being overhauled. In the meantime, you can connect directly through email or professional channels.
          </p>
        </div>

        {/* Direct Contact Cards */}
        <div className="w-full max-w-lg grid grid-cols-1 sm:grid-cols-2 gap-3 text-left">
          <a
            href="mailto:alvinmutie.dev@gmail.com"
            className="group p-5 rounded-2xl border border-black/10 dark:border-white/10 bg-white/60 dark:bg-white/[0.02] backdrop-blur-md hover:border-blue-500/30 transition-all flex flex-col justify-between"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-600 dark:text-[#AEC6FF]">
                <Mail className="size-5" />
              </div>
              <ArrowRight className="size-4 text-zinc-400 group-hover:translate-x-1 transition-transform" />
            </div>
            <div>
              <p className="text-xs font-mono text-zinc-400">Direct Email</p>
              <p className="text-sm font-semibold text-zinc-900 dark:text-white truncate">alvinmutie.dev@gmail.com</p>
            </div>
          </a>

          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="group p-5 rounded-2xl border border-black/10 dark:border-white/10 bg-white/60 dark:bg-white/[0.02] backdrop-blur-md hover:border-sky-500/30 transition-all flex flex-col justify-between"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-2.5 rounded-xl bg-sky-500/10 text-sky-600 dark:text-sky-400">
                <Linkedin className="size-5" />
              </div>
              <ArrowRight className="size-4 text-zinc-400 group-hover:translate-x-1 transition-transform" />
            </div>
            <div>
              <p className="text-xs font-mono text-zinc-400">Network</p>
              <p className="text-sm font-semibold text-zinc-900 dark:text-white">LinkedIn Profile</p>
            </div>
          </a>
        </div>

        {/* Status / Availability Note */}
        <div className="flex items-center gap-6 text-xs font-mono text-zinc-500 dark:text-zinc-400">
          <div className="flex items-center gap-1.5">
            <span className="size-2 rounded-full bg-emerald-500" />
            <span>Available for new projects</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock className="size-3.5" />
            <span>Response &lt; 24h</span>
          </div>
        </div>

        {/* Return Button */}
        <div className="pt-2">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-semibold bg-zinc-900 text-white dark:bg-white dark:text-zinc-950 hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-all shadow-sm active:scale-95"
          >
            <ArrowLeft className="size-3.5" />
            <span>Return Home</span>
          </Link>
        </div>
      </motion.div>
    </main>
  );
}
