"use client";

import { useState, useEffect } from "react";

export default function MorphingTitle() {
  const [isVisible, setIsVisible] = useState(false);
  const introText = "HI, I'M ";
  const nameText = "ALVIN MUTIE.";

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className={`flex flex-col md:flex-row md:items-baseline gap-3 leading-none transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
      <span className="text-white/60 font-medium tracking-normal">{introText}</span>
      <span className="text-white font-black tracking-tighter uppercase drop-shadow-[0_10px_40px_rgba(255,255,255,0.15)]">
        {nameText}
      </span>
    </div>
  );
}
