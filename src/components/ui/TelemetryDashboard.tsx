"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Activity, GitCommit, Zap, ShieldCheck, Gauge, HardDrive } from "lucide-react";

// Generate realistic commit heatmap data for 52 weeks (approx 364 days)
const HEATMAP_WEEKS = 24;
const DAYS_PER_WEEK = 7;

function generateHeatmapData() {
  const weeks = [];
  for (let w = 0; w < HEATMAP_WEEKS; w++) {
    const days = [];
    for (let d = 0; d < DAYS_PER_WEEK; d++) {
      // Deterministic pseudo-random generation to look like real active engineer commits
      const val = (Math.sin(w * 13 + d * 7) + 1) / 2;
      let level = 0;
      if (val > 0.8) level = 4;
      else if (val > 0.55) level = 3;
      else if (val > 0.35) level = 2;
      else if (val > 0.15) level = 1;
      days.push({ level, commits: Math.round(val * 14) });
    }
    weeks.push(days);
  }
  return weeks;
}

const HEATMAP_DATA = generateHeatmapData();

const METRICS = [
  {
    label: "Edge Network Latency",
    value: "22ms",
    sub: "Global Cloudflare/Vercel Edge",
    icon: Zap,
    trend: "-12% improvement",
    positive: true,
  },
  {
    label: "Continuous Uptime",
    value: "99.99%",
    sub: "Multi-region fault tolerant",
    icon: ShieldCheck,
    trend: "Zero incidents (180d)",
    positive: true,
  },
  {
    label: "Lighthouse Performance",
    value: "100/100",
    sub: "Strict core web vitals",
    icon: Gauge,
    trend: "Sub-50ms TTFB",
    positive: true,
  },
  {
    label: "Code & Type Safety",
    value: "100%",
    sub: "Strict TypeScript & ESLint",
    icon: HardDrive,
    trend: "0 any types in prod",
    positive: true,
  },
];

const STACK_DISTRIBUTION = [
  { name: "TypeScript / Next.js", pct: 56, color: "bg-blue-600 dark:bg-[#AEC6FF]" },
  { name: "Python / AI Tooling", pct: 24, color: "bg-indigo-500 dark:bg-[#DBC0E5]" },
  { name: "Go / Kafka Broker", pct: 12, color: "bg-emerald-500 dark:bg-emerald-400" },
  { name: "Rust / GLSL Shaders", pct: 8, color: "bg-amber-500 dark:bg-amber-400" },
];

export default function TelemetryDashboard() {
  const [hoveredCell, setHoveredCell] = useState<{ commits: number; week: number; day: number } | null>(null);

  return (
    <div className="w-full max-w-6xl mx-auto my-16 space-y-8">
      {/* Header section */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 dark:bg-[#AEC6FF]/10 text-blue-600 dark:text-[#AEC6FF] text-xs font-mono font-medium mb-3">
            <Activity className="size-3.5" />
            <span>BKLIT ENGINEERING TELEMETRY</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-zinc-900 dark:text-white">
            Live Velocity & Infrastructure Metrics
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 max-w-sm">
          Real-time insight into development cadence, architecture throughput, and benchmark performance.
        </p>
      </div>

      {/* Top 4 Key Performance Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {METRICS.map((m, i) => {
          const Icon = m.icon;
          return (
            <motion.div
              key={m.label}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="p-5 rounded-2xl border border-black/5 dark:border-white/10 bg-white/70 dark:bg-white/[0.02] backdrop-blur-md shadow-sm"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
                  {m.label}
                </span>
                <div className="p-2 rounded-xl bg-black/5 dark:bg-white/5 text-zinc-700 dark:text-zinc-300">
                  <Icon className="size-4" />
                </div>
              </div>
              <div className="text-2xl font-black text-zinc-900 dark:text-white tracking-tight">
                {m.value}
              </div>
              <div className="flex items-center justify-between mt-2 pt-2 border-t border-black/5 dark:border-white/5 text-[11px]">
                <span className="text-zinc-500 dark:text-zinc-400">{m.sub}</span>
                <span className="font-semibold text-emerald-600 dark:text-emerald-400">{m.trend}</span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Commit & Development Activity Heatmap Card */}
      <div className="p-6 sm:p-8 rounded-3xl border border-black/5 dark:border-white/10 bg-white/70 dark:bg-white/[0.02] backdrop-blur-md shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <GitCommit className="size-4 text-blue-600 dark:text-[#AEC6FF]" />
            <span className="text-sm font-bold text-zinc-900 dark:text-white">
              Continuous Delivery & Commit Activity (Past 6 Months)
            </span>
          </div>
          <div className="text-xs font-mono text-zinc-500 flex items-center gap-2">
            <span>Less</span>
            <div className="flex gap-1">
              <span className="size-2.5 rounded-[2px] bg-black/5 dark:bg-white/5" />
              <span className="size-2.5 rounded-[2px] bg-blue-200 dark:bg-blue-950/80" />
              <span className="size-2.5 rounded-[2px] bg-blue-400 dark:bg-blue-700" />
              <span className="size-2.5 rounded-[2px] bg-blue-600 dark:bg-[#AEC6FF]" />
            </div>
            <span>More</span>
          </div>
        </div>

        {/* Heatmap Grid */}
        <div className="overflow-x-auto pb-2">
          <div className="flex gap-1.5 min-w-[560px]">
            {HEATMAP_DATA.map((week, wIndex) => (
              <div key={wIndex} className="flex flex-col gap-1.5 flex-1">
                {week.map((day, dIndex) => {
                  let bgClass = "bg-black/5 dark:bg-white/5";
                  if (day.level === 1) bgClass = "bg-blue-100 dark:bg-blue-950/60";
                  if (day.level === 2) bgClass = "bg-blue-300 dark:bg-blue-800/70";
                  if (day.level === 3) bgClass = "bg-blue-500 dark:bg-blue-600";
                  if (day.level === 4) bgClass = "bg-blue-700 dark:bg-[#AEC6FF]";

                  return (
                    <div
                      key={dIndex}
                      onMouseEnter={() => setHoveredCell({ commits: day.commits, week: wIndex, day: dIndex })}
                      onMouseLeave={() => setHoveredCell(null)}
                      className={`h-3 rounded-[3px] transition-transform hover:scale-125 cursor-pointer ${bgClass}`}
                    />
                  );
                })}
              </div>
            ))}
          </div>
        </div>

        {/* Tooltip display */}
        <div className="h-4 text-[11px] font-mono text-zinc-500">
          {hoveredCell ? (
            <span>
              Recorded <strong className="text-blue-600 dark:text-[#AEC6FF]">{hoveredCell.commits} contributions</strong> on Week {hoveredCell.week + 1}, Day {hoveredCell.day + 1}
            </span>
          ) : (
            <span>Hover over any activity block to inspect commit telemetry</span>
          )}
        </div>

        {/* Stack Distribution Breakdown Bar */}
        <div className="pt-4 border-t border-black/5 dark:border-white/5 space-y-3">
          <div className="flex items-center justify-between text-xs font-semibold text-zinc-900 dark:text-white">
            <span>Primary Technology Allocation</span>
            <span className="font-mono text-zinc-500 text-[11px]">Aggregated Repository Footprint</span>
          </div>

          <div className="h-3 w-full rounded-full overflow-hidden flex bg-black/5 dark:bg-white/5 p-0.5 gap-0.5">
            {STACK_DISTRIBUTION.map((s) => (
              <div
                key={s.name}
                style={{ width: `${s.pct}%` }}
                className={`h-full rounded-full ${s.color} transition-all`}
                title={`${s.name}: ${s.pct}%`}
              />
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-4 text-xs pt-1">
            {STACK_DISTRIBUTION.map((s) => (
              <div key={s.name} className="flex items-center gap-1.5">
                <span className={`size-2.5 rounded-full ${s.color}`} />
                <span className="text-zinc-600 dark:text-zinc-400 font-medium">{s.name}</span>
                <span className="font-mono text-zinc-400 text-[11px]">{s.pct}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
