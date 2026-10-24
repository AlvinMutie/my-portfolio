"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, Copy, Check, Sparkles, Cpu, Layers } from "lucide-react";

const ARCH_ASCII = `
   ┌─────────────────────────────────────────────────────────────┐
   │                  ALVIN MUTIE // ARCHITECTURE               │
   └─────────────────────────────────────────────────────────────┘
  
   [ Client Tier ]
         │
         ▼ (HTTPS / WSS / gRPC-Web)
   ┌─────────────────────────────────────────────────────────────┐
   │            NEXT.JS 16 EDGE CLUSTER (Sub-25ms)               │
   │  ┌──────────────────────┐   ┌────────────────────────────┐  │
   │  │   Turbopack SSR      │   │   Circular View Transitions│  │
   │  └──────────────────────┘   └────────────────────────────┘  │
   └─────────────────────────────────────────────────────────────┘
         │                                       │
         ▼ (Async Streams)                       ▼ (Auth / RPC)
   ┌───────────────────────────┐           ┌─────────────────────┐
   │  AI AGENT RUNTIME (Python)│           │ DISTRIBUTED CORE    │
   │  ┌─────────────────────┐  │           │ ┌─────────────────┐ │
   │  │ Context Memory + LLM│  │ ◄───────► │ │ Go Kafka Broker │ │
   │  └─────────────────────┘  │           │ └─────────────────┘ │
   └───────────────────────────┘           └─────────────────────┘
         │                                       │
         ▼                                       ▼
   ┌───────────────────────────┐           ┌─────────────────────┐
   │  QDRANT VECTOR DB         │           │ POSTGRES / REDIS    │
   │  Dense Embeddings @ Scale │           │ Multi-region sync   │
   └───────────────────────────┘           └─────────────────────┘
`;

const BANNER_ASCII = `
   █████╗ ██╗     ██╗   ██╗██╗███╗   ██╗    ███╗   ███╗██╗   ██╗████████╗██╗███████╗
  ██╔══██╗██║     ██║   ██║██║████╗  ██║    ████╗ ████║██║   ██║╚══██╔══╝██║██╔════╝
  ███████║██║     ██║   ██║██║██╔██╗ ██║    ██╔████╔██║██║   ██║   ██║   ██║█████╗  
  ██╔══██║██║     ╚██╗ ██╔╝██║██║╚██╗██║    ██║╚██╔╝██║██║   ██║   ██║   ██║██╔══╝  
  ██║  ██║███████╗ ╚████╔╝ ██║██║ ╚████║    ██║ ╚═╝ ██║╚██████╔╝   ██║   ██║███████╗
  ╚═╝  ╚═╝╚══════╝  ╚═══╝  ╚═╝╚═╝  ╚═══╝    ╚═╝     ╚═╝ ╚═════╝    ╚═╝   ╚═╝╚══════╝
  ==================================================================================
  ROLE      : Senior Full Stack Engineer & Intelligent Systems Architect
  CORE      : TypeScript / Next.js / React 19 / Python / Go / Kafka / Tailwind
  PHILOSOPHY: High-throughput simplicity • Tactile UX physics • Zero-compromise perf
  LOCATION  : Remote Global • High velocity • Available for engagements
`;

const SHELL_LOG = `
  $ alvin --version
  mutie-cli v4.2.0 (x86_64-linux-gnu, turbopack engine)

  $ alvin status --verbose
  [✓] Edge Network       : OPERATIONAL (latency: 18ms avg)
  [✓] Reactive State     : SYNCHRONIZED (CRDTs enabled)
  [✓] AI Agent Pipelines : 4 Active workers (memory: warm)
  [✓] UI Frame Budget    : 120 FPS target (0 dropped frames)
  [✓] Security & Types   : STRICT (100% TypeScript strict-mode)

  $ alvin mission
  "Building digital tools that feel like physical objects: tactile, 
   instantaneous, and mathematically grounded."
`;

const TABS = [
  { id: "arch", name: "architecture.ascii", icon: Layers, content: ARCH_ASCII },
  { id: "banner", name: "identity.ascii", icon: Cpu, content: BANNER_ASCII },
  { id: "shell", name: "terminal.sh", icon: Terminal, content: SHELL_LOG },
];

export default function AsciiTerminal() {
  const [activeTab, setActiveTab] = useState("arch");
  const [copied, setCopied] = useState(false);

  const activeContent = TABS.find((t) => t.id === activeTab)?.content ?? ARCH_ASCII;

  const handleCopy = () => {
    navigator.clipboard.writeText(activeContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  };

  return (
    <div className="w-full max-w-5xl mx-auto my-12">
      <div className="relative rounded-2xl sm:rounded-3xl border border-black/10 dark:border-white/10 bg-zinc-950 text-zinc-100 shadow-2xl overflow-hidden backdrop-blur-xl">
        {/* Terminal Header Bar */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3 border-b border-white/10 bg-zinc-900/80 select-none">
          {/* macOS window controls */}
          <div className="flex items-center gap-2">
            <span className="size-3 rounded-full bg-rose-500/80 inline-block" />
            <span className="size-3 rounded-full bg-amber-500/80 inline-block" />
            <span className="size-3 rounded-full bg-emerald-500/80 inline-block" />
            <span className="ml-2 text-xs font-mono text-zinc-400 hidden sm:inline-block">
              alvin@system: ~/{activeTab}
            </span>
          </div>

          {/* Tabs */}
          <div className="flex items-center gap-1 bg-black/40 p-1 rounded-xl border border-white/5">
            {TABS.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-mono transition-all ${
                    activeTab === tab.id
                      ? "bg-white/10 text-white font-semibold shadow-inner"
                      : "text-zinc-400 hover:text-zinc-200"
                  }`}
                >
                  <Icon className="size-3.5" />
                  <span className="hidden md:inline">{tab.name}</span>
                </button>
              );
            })}
          </div>

          {/* Copy Button */}
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-mono text-zinc-400 hover:text-white bg-white/5 hover:bg-white/10 transition-colors"
            title="Copy ASCII content"
          >
            {copied ? (
              <>
                <Check className="size-3.5 text-emerald-400" />
                <span className="text-emerald-400 hidden sm:inline">Copied</span>
              </>
            ) : (
              <>
                <Copy className="size-3.5" />
                <span className="hidden sm:inline">Copy</span>
              </>
            )}
          </button>
        </div>

        {/* ASCII Screen Body */}
        <div className="relative p-4 sm:p-6 font-mono text-[10px] sm:text-xs leading-relaxed overflow-x-auto text-sky-300/90 dark:text-[#AEC6FF] selection:bg-blue-500 selection:text-white">
          <AnimatePresence mode="wait">
            <motion.pre
              key={activeTab}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2 }}
              className="font-mono whitespace-pre select-text"
            >
              {activeContent}
            </motion.pre>
          </AnimatePresence>
        </div>

        {/* Status bar */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-2 border-t border-white/5 bg-zinc-950/90 text-[10px] font-mono text-zinc-500">
          <div className="flex items-center gap-2">
            <span className="size-1.5 rounded-full bg-emerald-400 animate-ping inline-block" />
            <span>RENDER MODE: ASCIIFY MATRIX ENGINE (UTF-8)</span>
          </div>
          <div>ENCODED // ZERO RUNTIME LAG</div>
        </div>
      </div>
    </div>
  );
}
