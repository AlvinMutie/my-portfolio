"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Github, Layers, Sparkles, Terminal, Globe, ArrowUpRight } from "lucide-react";
import Link from "next/link";

interface Project {
  id: string;
  title: string;
  category: "Full Stack" | "AI & Tooling" | "Interactive UI";
  description: string;
  longDescription: string;
  tags: string[];
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
    longDescription: "Engineered with Next.js, WebSockets, and Yjs for low-latency multi-user diagramming, node execution pipelines, and persistent workspace storage.",
    tags: ["Next.js", "TypeScript", "WebSockets", "CRDT", "Tailwind CSS"],
    githubUrl: "https://github.com",
    liveUrl: "https://example.com",
    featured: true,
  },
  {
    id: "aura-ai",
    title: "Aura AI Copilot",
    category: "AI & Tooling",
    description: "Autonomous agent execution framework with streaming tool calls, reasoning traces, and contextual embeddings.",
    longDescription: "A developer assistant featuring tool calling protocols, vector memory retrieval, and local model orchestration via modern LLM APIs.",
    tags: ["React 19", "Python", "FastAPI", "Vector Search", "LLM APIs"],
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
    tags: ["Go", "Kafka", "TimescaleDB", "React", "Turbopack"],
    githubUrl: "https://github.com",
    liveUrl: "https://example.com",
  },
  {
    id: "verve-ui",
    title: "Verve Design System",
    category: "Interactive UI",
    description: "Component toolkit featuring tactile spring physics, circular View Transitions, and fluid morphing elements.",
    longDescription: "A crafted React component ecosystem built on modern CSS specifications, custom variants, and zero-compromise accessibility guidelines.",
    tags: ["Framer Motion", "Tailwind v4", "CSS Modules", "Radix UI"],
    githubUrl: "https://github.com",
    liveUrl: "https://example.com",
    featured: true,
  },
  {
    id: "sentient-matrix",
    title: "Sentient Matrix",
    category: "Interactive UI",
    description: "Interactive canvas particle simulation and spatial audio visualizer with GPU acceleration.",
    longDescription: "WebGL and Web Audio API experiments testing fluid dynamics, ribbon paths, and reactive mathematical transformations in the browser.",
    tags: ["Canvas API", "WebGL", "Web Audio", "GLSL Shaders"],
    githubUrl: "https://github.com",
    liveUrl: "https://example.com",
  },
  {
    id: "pulse-commerce",
    title: "Pulse Commerce",
    category: "Full Stack",
    description: "Headless e-commerce storefront delivering instant sub-50ms edge rendering and dynamic inventory sync.",
    longDescription: "Complete shopping experience with optimistic UI updates, integrated payment gateways, edge caching, and automated inventory reconciliation.",
    tags: ["Next.js", "GraphQL", "Redis", "Stripe API", "Edge Functions"],
    githubUrl: "https://github.com",
    liveUrl: "https://example.com",
  },
];

const CATEGORIES = ["All", "Full Stack", "AI & Tooling", "Interactive UI"] as const;

export default function ProjectsPage() {
  const [selectedCategory, setSelectedCategory] = useState<typeof CATEGORIES[number]>("All");

  const filteredProjects = selectedCategory === "All"
    ? PROJECTS
    : PROJECTS.filter((p) => p.category === selectedCategory);

  return (
    <main className="min-h-screen pt-28 pb-20 px-6 sm:px-8 md:px-12 max-w-7xl mx-auto selection:bg-primary selection:text-white dark:selection:text-black">
      {/* Page Header */}
      <div className="space-y-4 max-w-2xl mb-12">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-xs font-mono font-semibold uppercase tracking-wider text-blue-600 dark:text-[#AEC6FF]">
            Portfolio Showcase
          </span>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-zinc-900 dark:text-white mt-1">
            Selected Works & Experiments
          </h1>
          <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 mt-3 leading-relaxed">
            A curated collection of web applications, autonomous intelligent agents, developer tools, and interactive visual interfaces built by Alvin Mutie.
          </p>
        </motion.div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap gap-2 pt-4">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-1.5 rounded-xl text-xs font-medium transition-all ${
                selectedCategory === cat
                  ? "bg-zinc-900 text-white dark:bg-white dark:text-zinc-950 shadow-sm"
                  : "bg-black/5 dark:bg-white/5 text-zinc-600 dark:text-zinc-400 hover:bg-black/10 dark:hover:bg-white/10"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Grid */}
      <motion.div
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        <AnimatePresence>
          {filteredProjects.map((project) => (
            <motion.div
              layout
              key={project.id}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.3 }}
              className="group relative flex flex-col justify-between p-6 rounded-2xl border border-black/5 dark:border-white/10 bg-white/50 dark:bg-white/[0.02] backdrop-blur-md hover:border-black/20 dark:hover:border-white/20 hover:shadow-lg transition-all"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono px-2.5 py-1 rounded-md bg-blue-500/10 dark:bg-[#AEC6FF]/10 text-blue-600 dark:text-[#AEC6FF] font-medium">
                    {project.category}
                  </span>
                  {project.featured && (
                    <span className="text-[10px] uppercase font-bold tracking-wider text-amber-500 flex items-center gap-1">
                      <Sparkles className="size-3" /> Featured
                    </span>
                  )}
                </div>

                <div>
                  <h2 className="text-xl font-bold text-zinc-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-[#AEC6FF] transition-colors flex items-center justify-between">
                    <span>{project.title}</span>
                    <ArrowUpRight className="size-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </h2>
                  <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-2 leading-relaxed">
                    {project.description}
                  </p>
                </div>

                <p className="text-[11px] text-zinc-500 dark:text-zinc-400 leading-normal border-t border-black/5 dark:border-white/5 pt-3">
                  {project.longDescription}
                </p>
              </div>

              <div className="pt-6 space-y-4">
                {/* Tech tags */}
                <div className="flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-black/5 dark:bg-white/5 text-zinc-700 dark:text-zinc-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Action Links */}
                <div className="flex items-center gap-3 pt-2 border-t border-black/5 dark:border-white/5">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition-colors"
                    >
                      <Github className="size-3.5" />
                      <span>Code</span>
                    </a>
                  )}
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs text-blue-600 hover:text-blue-700 dark:text-[#AEC6FF] dark:hover:text-white transition-colors font-medium ml-auto"
                    >
                      <span>Live Demo</span>
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
