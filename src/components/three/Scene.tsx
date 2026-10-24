"use client";

import BackgroundPaths from "@/components/ui/BackgroundPaths";

export default function Scene() {
  return (
    <div className="fixed inset-0 -z-20 h-screen w-full bg-[#0B0D0F] overflow-hidden pointer-events-none">
      <BackgroundPaths
        className="h-full w-full bg-transparent text-[#AEC6FF] dark:bg-transparent dark:text-[#AEC6FF]"
        children={null}
      />
      {/* Cinematic Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,transparent_0%,rgba(0,0,0,0.5)_100%)] pointer-events-none" />
    </div>
  );
}
