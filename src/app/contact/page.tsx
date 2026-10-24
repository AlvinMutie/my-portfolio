"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  Send,
  CheckCircle2,
  MapPin,
  Clock,
  Sparkles,
  Github,
  Linkedin,
  MessageSquare,
  ArrowRight,
} from "lucide-react";

export default function ContactPage() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "General Inquiry",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.message) return;

    setLoading(true);
    // Simulate seamless form dispatch
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 900);
  };

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
            Initiate Contact
          </span>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-zinc-900 dark:text-white mt-1">
            Let&apos;s build something great together.
          </h1>
          <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 mt-3 leading-relaxed">
            Interested in collaborating on a web application, intelligent tooling, or looking for a full stack engineer? Drop a note below or reach out directly.
          </p>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left Column: Interactive Contact Form */}
        <div className="lg:col-span-7">
          <div className="p-8 sm:p-10 rounded-3xl border border-black/5 dark:border-white/10 bg-white/60 dark:bg-white/[0.02] backdrop-blur-md shadow-sm">
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-12 flex flex-col items-center text-center space-y-4"
              >
                <div className="size-14 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
                  <CheckCircle2 className="size-8" />
                </div>
                <h3 className="text-2xl font-bold text-zinc-900 dark:text-white">
                  Message Dispatched!
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 max-w-sm">
                  Thank you for reaching out, <span className="font-semibold text-zinc-800 dark:text-zinc-200">{formState.name}</span>. Alvin will review your message and reply back within 24 hours.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormState({ name: "", email: "", subject: "General Inquiry", message: "" });
                  }}
                  className="mt-4 px-6 py-2.5 rounded-full text-xs font-semibold border border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
                >
                  Send another message
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-mono font-medium text-zinc-700 dark:text-zinc-300">
                      Your Name <span className="text-blue-500">*</span>
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="Jane Doe"
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-black/10 dark:border-white/10 bg-white/70 dark:bg-black/30 text-sm text-zinc-900 dark:text-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-mono font-medium text-zinc-700 dark:text-zinc-300">
                      Your Email <span className="text-blue-500">*</span>
                    </label>
                    <input
                      required
                      type="email"
                      placeholder="jane@example.com"
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-black/10 dark:border-white/10 bg-white/70 dark:bg-black/30 text-sm text-zinc-900 dark:text-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-mono font-medium text-zinc-700 dark:text-zinc-300">
                    Project Focus / Subject
                  </label>
                  <select
                    value={formState.subject}
                    onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-black/10 dark:border-white/10 bg-white/70 dark:bg-black/30 text-sm text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all cursor-pointer"
                  >
                    <option value="General Inquiry">General Inquiry</option>
                    <option value="New Web Project">New Web Application / MVP</option>
                    <option value="AI / LLM Integration">AI / Autonomous Tooling</option>
                    <option value="Contract / Consultation">Contract / Engineering Consulting</option>
                    <option value="Full-time Opportunity">Full-time Engineering Role</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-mono font-medium text-zinc-700 dark:text-zinc-300">
                    Your Message <span className="text-blue-500">*</span>
                  </label>
                  <textarea
                    required
                    rows={5}
                    placeholder="Tell me about your goals, timelines, or questions..."
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-black/10 dark:border-white/10 bg-white/70 dark:bg-black/30 text-sm text-zinc-900 dark:text-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full text-sm font-semibold bg-zinc-900 text-white dark:bg-white dark:text-zinc-950 hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-all shadow-sm active:scale-95 disabled:opacity-50"
                >
                  {loading ? (
                    <span>Transmitting...</span>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <Send className="size-4" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Right Column: Direct Info & Availability */}
        <div className="lg:col-span-5 space-y-6">
          {/* Availability Card */}
          <div className="p-6 rounded-3xl border border-black/5 dark:border-white/10 bg-white/60 dark:bg-white/[0.02] backdrop-blur-md space-y-4">
            <div className="flex items-center gap-2">
              <span className="size-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-mono font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                Current Availability
              </span>
            </div>
            <h3 className="text-lg font-bold text-zinc-900 dark:text-white">
              Open for New Engagements
            </h3>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Available for high-impact full-stack development, distributed architecture, and consulting engagements with agile teams worldwide.
            </p>
            <div className="pt-2 flex items-center gap-4 text-xs font-mono text-zinc-500 dark:text-zinc-400">
              <div className="flex items-center gap-1.5">
                <Clock className="size-3.5" />
                <span>Response &lt; 24h</span>
              </div>
              <div className="flex items-center gap-1.5">
                <MapPin className="size-3.5" />
                <span>Remote / Global</span>
              </div>
            </div>
          </div>

          {/* Direct Contact Channels */}
          <div className="p-6 rounded-3xl border border-black/5 dark:border-white/10 bg-white/60 dark:bg-white/[0.02] backdrop-blur-md space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
              Direct Channels
            </h4>

            <a
              href="mailto:alvinmutie.dev@gmail.com"
              className="group flex items-center justify-between p-3 rounded-2xl hover:bg-black/5 dark:hover:bg-white/5 transition-colors border border-transparent hover:border-black/5 dark:hover:border-white/5"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-blue-500/10 text-blue-600 dark:text-[#AEC6FF]">
                  <Mail className="size-4" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-zinc-900 dark:text-white">Email</p>
                  <p className="text-[11px] text-zinc-500">alvinmutie.dev@gmail.com</p>
                </div>
              </div>
              <ArrowRight className="size-4 text-zinc-400 group-hover:translate-x-1 transition-transform" />
            </a>

            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between p-3 rounded-2xl hover:bg-black/5 dark:hover:bg-white/5 transition-colors border border-transparent hover:border-black/5 dark:hover:border-white/5"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-zinc-500/10 text-zinc-800 dark:text-zinc-200">
                  <Github className="size-4" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-zinc-900 dark:text-white">GitHub</p>
                  <p className="text-[11px] text-zinc-500">Repositories & Open Source</p>
                </div>
              </div>
              <ArrowRight className="size-4 text-zinc-400 group-hover:translate-x-1 transition-transform" />
            </a>

            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between p-3 rounded-2xl hover:bg-black/5 dark:hover:bg-white/5 transition-colors border border-transparent hover:border-black/5 dark:hover:border-white/5"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-sky-500/10 text-sky-600 dark:text-sky-400">
                  <Linkedin className="size-4" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-zinc-900 dark:text-white">LinkedIn</p>
                  <p className="text-[11px] text-zinc-500">Professional Network</p>
                </div>
              </div>
              <ArrowRight className="size-4 text-zinc-400 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
