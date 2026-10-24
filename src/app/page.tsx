"use client";

import BackgroundPaths from "@/components/ui/BackgroundPaths";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0B0D0F] text-[#FDFDFF] selection:bg-primary selection:text-black overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen w-full flex items-center justify-center">
        <BackgroundPaths className="min-h-screen w-full bg-[#0B0D0F] text-[#AEC6FF]">
          <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 max-w-4xl space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-4"
            >
              <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-white leading-tight">
                Hi. I am{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#AEC6FF] to-[#DBC0E5]">
                  Alvin Mutie
                </span>
                <span className="text-primary">,</span>
              </h1>

              <p className="text-sm sm:text-base md:text-lg text-zinc-400 font-medium tracking-wide">
                (welcome to my portfolio)
              </p>
            </motion.div>
          </div>
        </BackgroundPaths>
      </section>
    </main>
  );
}
