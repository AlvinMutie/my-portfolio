"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ExternalLink,
  Github,
  Sparkles,
  ArrowUpRight,
  Code2,
  Terminal,
  Cpu,
  Zap,
  Globe,
  Search,
} from "lucide-react";
import Link from "next/link";

interface Project {
  id: string;
  title: string;
  category: "Full Stack" | "AI & Tooling" | "Interactive UI";
  description: string;
  longDescription: string;
  metrics: string;
  tags: string[];
  colSpan: string; // for bento layout
  githubUrl?: string;
  liveUrl?: string;
  featured?: boolean;
}

const PROJECTS: Project[] = [
  {
    id: "nexus-flow",
    title: "Nexus Flow",
    category: "Full Stack",
    description: "Real-time collaborative canvas & workflow automation engine with CRDT state synchronization.",
    longDescription: "Engineered with Next.js, WebSockets, and Yjs for sub-10ms multi-user diagramming, node execution pipelines, and persistent workspace storage.",
    metrics: "Sub-10ms latency • Multi-region sync",
    tags: ["Next.js 16", "TypeScript", "WebSockets", "CRDTs", "Turbopack"],
    colSpan: "lg:col-span-8",
    githubUrl: "https://github.com",
    liveUrl: "https://example.com",
    featured: true,
  },
  {
    id: "aura-ai",
    title: "Aura AI Copilot",
    category: "AI & Tooling",
    description: "Autonomous agent execution runtime with streaming tool calls, reasoning traces, and vector memory.",
    longDescription: "A developer assistant featuring tool calling protocols, vector memory retrieval, and local model orchestration via modern LLM APIs.",
    metrics: "4x reasoning speed • Zero hallucination guardrails",
    tags: ["Python", "FastAPI", "Qdrant", "LLM APIs", "LangChain"],
    colSpan: "lg:col-span-4",
    githubUrl: "https://github.com",
    liveUrl: "https://example.com",
    featured: true,
  },
  {
    id: "verve-ui",
    title: "Verve Design System",
    category: "Interactive UI",
    description: "Component toolkit featuring tactile spring physics, circular View Transitions, and fluid morphing elements.",
    longDescription: "A crafted React component ecosystem built on modern CSS specifications, custom variants, and zero-compromise accessibility guidelines.",
    metrics: "120 FPS render target • Zero layout shifts",
    tags: ["React 19", "Framer Motion", "Tailwind v4", "CSS Modules"],
    colSpan: "lg:col-span-4",
    githubUrl: "https://github.com",
    liveUrl: "https://example.com",
    featured: true,
  },
  {
    id: "hyperion-core",
    title: "Hyperion Core",
    category: "Full Stack",
    description: "High-throughput telemetry ingestion pipeline and interactive real-time observability dashboard.",
    longDescription: "Processes high-volume event streams with microsecond precision, displaying dynamic graphs and health metrics across multi-cluster cloud environments.",
    metrics: "100k events/sec • Zero dropped packets",
    tags: ["Go", "Kafka Broker", "TimescaleDB", "React"],
    colSpan: "lg:col-span-8",
    githubUrl: "https://github.com",
    liveUrl: "https://example.com",
  },
  {
    id: "sentient-matrix",
    title: "Sentient Matrix",
    category: "Interactive UI",
    description: "Interactive canvas particle simulation and spatial audio visualizer with GPU acceleration.",
    longDescription: "WebGL and Web Audio API experiments testing fluid dynamics, ribbon paths, and reactive mathematical transformations in the browser.",
    metrics: "WebGL 2.0 • 60k interactive particles",
    tags: ["Canvas API", "WebGL", "Web Audio API", "GLSL Shaders"],
    colSpan: "lg:col-span-6",
    githubUrl: "https://github.com",
    liveUrl: "https://example.com",
  },
  {
    id: "pulse-commerce",
    title: "Pulse Commerce",
    category: "Full Stack",
    description: "Headless e-commerce storefront delivering instant sub-50ms edge rendering and dynamic inventory sync.",
    longDescription: "Complete shopping experience with optimistic UI updates, integrated payment gateways, edge caching, and automated inventory reconciliation.",
    metrics: "99.9% uptime • Sub-50ms TTFB",
    tags: ["Next.js", "GraphQL", "Redis", "Stripe API"],
    colSpan: "lg:col-span-6",
    githubUrl: "https://github.com",
    liveUrl: "https://example.com",
  },
];

const CATEGORIES = ["All", "Full Stack", "AI & Tooling", "Interactive UI"] as const;

export default function ProjectsPage() {
  const [selectedCategory, setSelectedCategory] = useState<typeof CATEGORIES[number]>("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProjects = PROJECTS.filter((p) => {
    const matchesCategory = selectedCategory === "All" || p.category === selectedCategory;
    const matchesSearch =
      searchQuery.trim() === "" ||
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <main className="min-h-screen pt-28 pb-20 px-6 sm:px-8 md:px-12 max-w-7xl mx-auto selection:bg-primary selection:text-white dark:selection:text-black">
      {/* Header section */}
      <div className="space-y-4 max-w-2xl mb-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 dark:bg-[#AEC6FF]/10 text-blue-600 dark:text-[#AEC6FF] text-xs font-mono font-medium mb-2">
            <Sparkles className="size-3.5" />
            <span>KOKONUTUI BENTO SHOWCASE</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-zinc-900 dark:text-white">
            Engineering & Product Showcase
          </h1>
          <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 mt-3 leading-relaxed">
            High-performance full stack web applications, intelligent agents, and interactive tactile interfaces developed by Alvin Mutie.
          </p>
        </motion.div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-10">
        {/* Category Pills */}
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-medium transition-all ${
                selectedCategory === cat
                  ? "bg-zinc-900 text-white dark:bg-white dark:text-zinc-950 shadow-sm"
                  : "bg-black/5 dark:bg-white/5 text-zinc-600 dark:text-zinc-400 hover:bg-black/10 dark:hover:bg-white/10"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search input */}
        <div className="relative min-w-[240px]">
          <Search className="size-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" />
          <input
            type="text"
            placeholder="Search by tech or keyword..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl border border-black/10 dark:border-white/10 bg-white/70 dark:bg-white/[0.03] text-xs text-zinc-900 dark:text-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          />
        </div>
      </div>

      {/* KokonutUI Bento Grid Layout */}
      <motion.div layout className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <AnimatePresence>
          {filteredProjects.map((project) => (
            <motion.div
              layout
              key={project.id}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.3 }}
              className={`group relative flex flex-col justify-between p-7 rounded-3xl border border-black/5 dark:border-white/10 bg-white/60 dark:bg-white/[0.02] backdrop-blur-xl hover:border-black/20 dark:hover:border-white/25 hover:shadow-xl transition-all duration-300 ${project.colSpan}`}
            >
              {/* Subtle ambient hover gradient */}
              <div
                aria-hidden="true"
                className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-gradient-to-br from-blue-500/[0.03] via-transparent to-indigo-500/[0.05]"
              />

              <div className="relative z-10 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono font-medium px-3 py-1 rounded-full bg-blue-500/10 dark:bg-[#AEC6FF]/10 text-blue-600 dark:text-[#AEC6FF]">
                    {project.category}
                  </span>
                  {project.featured && (
                    <span className="text-[11px] font-mono uppercase tracking-wider text-amber-500 flex items-center gap-1">
                      <Sparkles className="size-3" /> Featured
                    </span>
                  )}
                </div>

                <div>
                  <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-[#AEC6FF] transition-colors flex items-center justify-between">
                    <span>{project.title}</span>
                    <ArrowUpRight className="size-5 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all text-blue-600 dark:text-[#AEC6FF]" />
                  </h2>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-2 leading-relaxed">
                    {project.description}
                  </p>
                </div>

                <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed border-t border-black/5 dark:border-white/5 pt-3">
                  {project.longDescription}
                </p>

                {/* Telemetry pill */}
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-black/5 dark:bg-white/5 text-[11px] font-mono text-zinc-700 dark:text-zinc-300">
                  <Zap className="size-3 text-amber-500" />
                  <span>{project.metrics}</span>
                </div>
              </div>

              <div className="relative z-10 pt-6 space-y-4">
                {/* Tech tags */}
                <div className="flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] font-mono px-2.5 py-1 rounded-md bg-black/5 dark:bg-white/5 text-zinc-700 dark:text-zinc-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-4 pt-3 border-t border-black/5 dark:border-white/5">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition-colors"
                    >
                      <Github className="size-3.5" />
                      <span>Source Code</span>
                    </a>
                  )}
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs text-blue-600 hover:text-blue-700 dark:text-[#AEC6FF] dark:hover:text-white transition-colors font-medium ml-auto"
                    >
                      <span>Live Environment</span>
                      <ExternalLink className="size-3.5" />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Call to Collaborate Banner */}
      <div className="mt-20 p-8 sm:p-12 rounded-3xl border border-black/5 dark:border-white/10 bg-gradient-to-br from-blue-50/50 to-indigo-50/50 dark:from-white/[0.02] dark:to-white/[0.04] backdrop-blur-md flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <h3 className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-white">
            Have a project or technical challenge in mind?
          </h3>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1 max-w-xl">
            Whether building an MVP from zero, accelerating performance, or integrating intelligent agents, let&apos;s build something exceptional together.
          </p>
        </div>
        <Link
          href="/contact"
          className="shrink-0 px-6 py-3 rounded-full text-sm font-semibold bg-zinc-900 text-white dark:bg-white dark:text-zinc-950 hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-all shadow-sm active:scale-95"
        >
          Get in Touch
        </Link>
      </div>
    </main>
  );
}
