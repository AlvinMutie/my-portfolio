"use client";

import { useState, useEffect } from "react";

const customFonts = [
  "Abadi MT Condensed Light", "Albertus Extra Bold", "Albertus Medium", "Antique Olive",
  "Arial", "Arial Black", "Arial MT", "Arial Narrow", "Bazooka", "Book Antiqua",
  "Bookman Old Style", "Boulder", "Calisto MT", "Calligrapher", "Century Gothic",
  "Century Schoolbook", "Cezanne", "CG Omega", "CG Times", "Charlesworth", "Chaucer",
  "Clarendon Condensed", "Comic Sans MS", "Copperplate Gothic Bold", "Copperplate Gothic Light",
  "Cornerstone", "Coronet", "Courier", "Courier New", "Cuckoo", "Dauphin", "Denmark",
  "Fransiscan", "Garamond", "Geneva", "Haettenschweiler", "Heather", "Helvetica", "Herald",
  "Impact", "Jester", "Letter Gothic", "Lithograph", "Lithograph Light", "Long Island",
  "Lucida Console", "Lucida Handwriting", "Lucida Sans", "Lucida Sans Unicode", "Marigold",
  "Market", "Matisse ITC", "MS LineDraw", "News GothicMT", "OCR A Extended", "Old Century",
  "Pegasus", "Pickwick", "Poster", "Pythagoras", "Sceptre", "Sherwood", "Signboard",
  "Socket", "Steamer", "Storybook", "Subway", "Tahoma", "Technical", "Teletype",
  "Tempus Sans ITC", "Times", "Times New Roman", "Times New Roman PS", "Trebuchet MS",
  "Tristan", "Tubular", "Unicorn", "Univers", "Univers Condensed", "Vagabond", "Verdana",
  "Westminster"
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
            fontFamily: `"${customFonts[fontIndex]}", sans-serif`,
            minWidth: '400px', // Prevent layout shifts as fonts change widths
            display: 'inline-block'
        }}
      >
        {nameText}
      </span>
    </div>
  );
}
