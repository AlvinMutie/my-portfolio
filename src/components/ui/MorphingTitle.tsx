"use client";

import { useState, useEffect } from "react";

const customFonts = [
  "Arial, sans-serif", "'Arial Black', sans-serif", "'Comic Sans MS', cursive, sans-serif",
  "Impact, sans-serif", "'Lucida Sans Unicode', sans-serif", "Tahoma, sans-serif",
  "'Trebuchet MS', sans-serif", "Verdana, sans-serif", "'Courier New', Courier, monospace",
  "'Lucida Console', Monaco, monospace", "Georgia, serif", "'Palatino Linotype', 'Book Antiqua', Palatino, serif",
  "'Times New Roman', Times, serif", "fantasy", "monospace", "cursive"
];
export default function MorphingTitle() {
  const [fontIndex, setFontIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const introText = "HI, I'M ";
  const nameText = "ALVIN MUTIE.";

  useEffect(() => {
    setIsVisible(true);
    
    // Rapid font morphing every 150ms
    const timer = setInterval(() => {
        setFontIndex((prev) => (prev + 1) % customFonts.length);
    }, 150);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className={`flex flex-col md:flex-row md:items-baseline gap-3 leading-none transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
      <span className="text-white/60 font-medium tracking-normal" style={{ fontFamily: 'inherit' }}>{introText}</span>
      <span 
        className="text-white drop-shadow-[0_10px_40px_rgba(255,255,255,0.4)]"
        style={{ 
            fontFamily: customFonts[fontIndex],
            minWidth: '400px', // Prevent layout shifts as fonts change widths
            display: 'inline-block'
        }}
      >
        {nameText}
      </span>
    </div>
  );
}
