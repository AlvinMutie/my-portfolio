"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const fonts = [
  "font-sans",
  "font-mono",
  "font-serif",
  "tracking-tighter font-black",
  "italic font-serif",
  "uppercase tracking-[0.5em] font-light",
  "font-bold italic tracking-tight",
  "font-light uppercase",
  "font-black tracking-widest",
  "font-medium tracking-normal",
];

export default function MorphingTitle() {
  const [fontIndex, setFontIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const fullText = "HI, I'M ";
  const nameText = "ALVIN MUTIE.";

  useEffect(() => {
    // Typing effect for "HI, I'M "
    const typingTimer = setTimeout(() => setIsTyping(false), 1500);
    
    // Font morphing effect for "ALVIN MUTIE."
    const morphTimer = setInterval(() => {
      setFontIndex((prev) => (prev + 1) % fonts.length);
    }, 1000);

    return () => {
      clearTimeout(typingTimer);
      clearInterval(morphTimer);
    };
  }, []);

  return (
    <div className="flex flex-col md:flex-row md:items-baseline gap-4 leading-none h-[1.2em]">
      <span className="text-white opacity-80">{fullText}</span>
      <div className="relative inline-block min-w-[300px]">
        <AnimatePresence mode="wait">
          <motion.span
            key={fontIndex}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.2 }}
            className={`inline-block text-gradient ${fonts[fontIndex]}`}
          >
            {nameText}
          </motion.span>
        </AnimatePresence>
      </div>
    </div>
  );
}
