"use client";

import BackgroundPaths from "@/components/ui/BackgroundPaths";
import SwitchButton from "@/components/ui/SwitchButton";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-white dark:selection:text-black overflow-x-hidden transition-colors duration-300">
      {/* Top Header with Theme Switcher */}
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-5 md:px-12 pointer-events-none">
        <div className="pointer-events-auto flex items-center gap-2">
          <span className="text-lg font-black tracking-tighter text-zinc-900 dark:text-white">
            AM<span className="text-primary">.</span>
          </span>
        </div>

        <div className="pointer-events-auto">
          <SwitchButton size="default" showLabel={false} />
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative min-h-screen w-full flex items-center justify-center">
        <BackgroundPaths className="min-h-screen w-full">
          <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 max-w-4xl space-y-4">
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
                <span className="text-primary">,</span>
              </h1>

              <p className="text-sm sm:text-base md:text-lg text-zinc-600 dark:text-zinc-400 font-medium tracking-wide">
                (welcome to my portfolio)
              </p>
            </motion.div>
          </div>
        </BackgroundPaths>
      </section>
    </main>
  );
}
