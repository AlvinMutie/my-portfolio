"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useStore } from "@/lib/store";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function useScrollSync() {
  const setProgress = useStore((state) => state.setProgress);
  const setCurrentSection = useStore((state) => state.setCurrentSection);
  const setMouse = useStore((state) => state.setMouse);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      setMouse(x, y);
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Create a smooth scroll trigger for the entire page
    const trigger = ScrollTrigger.create({
      trigger: "main",
      start: "top top",
      end: "bottom bottom",
      scrub: true,
      onUpdate: (self) => {
        setProgress(self.progress);
      },
    });

    // Individual sections for "Chapter" tracking + Fade-in reveals
    const sections = gsap.utils.toArray<HTMLElement>("section");
    sections.forEach((section, index) => {
      // Chapter Tracking
      ScrollTrigger.create({
        trigger: section,
        start: "top center",
        end: "bottom center",
        onEnter: () => setCurrentSection(index),
        onEnterBack: () => setCurrentSection(index),
      });

      // Fade-in Reveal (Targeting .reveal utility class)
      gsap.fromTo(section.querySelectorAll(".reveal"), 
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power3.out",
          stagger: 0.2,
          scrollTrigger: {
            trigger: section,
            start: "top 85%",
            toggleActions: "play none none none",
          }
        }
      );
    });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      trigger.kill();
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, [setProgress, setCurrentSection, setMouse]);
}
