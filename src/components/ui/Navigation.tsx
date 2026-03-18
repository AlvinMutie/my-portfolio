"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useStore } from "@/lib/store";

const navItems = [
  { name: "About", href: "#about" },
  { name: "Work", href: "#projects" },
  { name: "Experience", href: "#experience" },
  { name: "Contact", href: "#contact" },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const currentSection = useStore((state) => state.currentSection);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className="fixed top-0 z-[100] w-full px-8 py-6 flex justify-center pointer-events-none">
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className={`
          flex items-center gap-2 px-6 py-2 rounded-full pointer-events-auto transition-all duration-500
          ${scrolled ? "bg-surface/80 backdrop-blur-xl border border-white/10 shadow-2xl" : "bg-white/5 backdrop-blur-sm border border-white/5"}
        `}
      >
        <div className="flex items-center gap-8 mr-8">
          <span className="text-xl font-black tracking-tighter text-gradient">AM.</span>
        </div>
        
        <div className="flex gap-2">
          {navItems.map((item, i) => {
            const isActive = 
              (item.name === "About" && currentSection === 0) ||
              (item.name === "Work" && currentSection === 1) ||
              (item.name === "Experience" && currentSection === 2) ||
              (item.name === "Contact" && currentSection === 3);

            return (
              <a
                key={item.name}
                href={item.href}
                className="relative px-4 py-2 text-[10px] font-black uppercase tracking-widest transition-colors group"
              >
                <span className={`relative z-10 ${isActive ? "text-primary" : "text-zinc-400 group-hover:text-foreground"}`}>
                  {item.name}
                </span>
                {isActive && (
                  <motion.div
                    layoutId="nav-pill"
                    className="absolute inset-0 bg-primary/10 rounded-full"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </a>
            );
          })}
        </div>
      </motion.div>
    </nav>
  );
}
