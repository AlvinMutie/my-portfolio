"use client";

import { useEffect, useState } from "react";

interface Stats {
  total_projects: number;
  total_stars: number;
  experience_years: number;
}

export default function Stats() {
  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    fetch("http://localhost:8080/api/stats")
      .then((res) => res.json())
      .then((data) => setStats(data))
      .catch(() => {
        // Fallback to mock data if Go backend is not running
        setStats({
          total_projects: 4,
          total_stars: 12,
          experience_years: 2,
        });
      });
  }, []);

  if (!stats) return null;

  return (
    <div className="grid grid-cols-3 gap-4 mt-12 w-full max-w-2xl mx-auto">
      <div className="p-4 glass text-center">
        <div className="text-3xl font-bold text-primary">{stats.total_projects}+</div>
        <div className="text-[10px] text-zinc-500 uppercase tracking-widest font-mono">Projects</div>
      </div>
      <div className="p-4 glass text-center">
        <div className="text-3xl font-bold text-primary">{stats.total_stars}</div>
        <div className="text-[10px] text-zinc-500 uppercase tracking-widest font-mono">Github Stars</div>
      </div>
      <div className="p-4 glass text-center">
        <div className="text-3xl font-bold text-primary">{stats.experience_years}</div>
        <div className="text-[10px] text-zinc-500 uppercase tracking-widest font-mono">Years Exp.</div>
      </div>
    </div>
  );
}
