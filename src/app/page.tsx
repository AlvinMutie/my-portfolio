"use client";

import { useEffect, useState } from "react";
import Scene from "@/components/three/Scene";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { motion } from "framer-motion";
import { useScrollSync } from "@/hooks/useScrollSync";
import Navigation from "@/components/ui/Navigation";
import TechOrb from "@/components/three/TechOrb";
import PhysicsSandbox from "@/components/three/PhysicsSandbox";
import MorphingTitle from "@/components/ui/MorphingTitle";
import { Canvas } from "@react-three/fiber";
import { fetchGitHubRepos, GitHubRepo } from "@/lib/github";

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [githubProjects, setGithubProjects] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    setMounted(true);
    const getProjects = async () => {
      const repos = await fetchGitHubRepos("AlvinMutie");
      setGithubProjects(repos);
      setLoading(false);
    };
    getProjects();
  }, []);

  return (
    <main className="relative min-h-screen selection:bg-primary selection:text-black overflow-x-hidden">
      {/* 3D Core Layer */}
      {mounted && <ScrollSyncManager />}
      <Scene />
      
      <Navigation />

      <div className="container mx-auto px-6 md:px-24">
        {/* Hero Section */}
        <section id="about" className="min-h-screen flex flex-col justify-center pt-32 md:pt-20">
          <div className="reveal space-y-12 md:space-y-16">
            <div className="space-y-4">
              <h2 className="text-sm font-black uppercase tracking-[0.4em] text-primary"> / Discovery </h2>
              <motion.h1 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-[10vw] md:text-7xl font-black tracking-tighter leading-[0.9] uppercase py-4"
              >
                <MorphingTitle />
              </motion.h1>
            </div>

            <div className="flex flex-col md:flex-row gap-12 md:items-end justify-between">
              <motion.p 
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="max-w-2xl text-xl md:text-3xl text-zinc-400 font-medium leading-relaxed"
              >
                I'm a <span className="text-foreground">Full Stack Engineer</span> specialized in developing 
                high-performance digital tools and intelligent systems. I bridge the gap between 
                complex backend logic and <span className="text-primary">immersive 3D interfaces</span>.
              </motion.p>

              <motion.div 
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex gap-4 pt-8 md:pt-0"
              >
                <a href="#projects" className="px-10 py-5 bg-foreground text-background font-black uppercase tracking-widest hover:bg-primary transition-all active:scale-95">
                  Explore Work
                </a>
              </motion.div>
            </div>
          </div>
        </section>

        <div className="section-divider my-24 md:my-40" />

        {/* Projects Section */}
        <section id="projects" className="space-y-24 md:space-y-32">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-l-4 border-primary pl-8 md:pl-10 reveal">
            <div className="space-y-2">
              <h2 className="text-sm font-black uppercase tracking-[0.4em] text-primary"> / Work </h2>
              <h2 className="text-5xl md:text-8xl font-black tracking-tighter leading-[0.9] uppercase"> 
                SYSTEM <br/> <span className="text-zinc-600">ARCHITECTURE</span> 
              </h2>
            </div>
            <div className="text-zinc-600 font-black text-[10px] md:text-xs tracking-widest uppercase pb-2">
              {mounted ? "© 2024—2026 / FULL STACK" : "© 2024-2026"}
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-24">
            {loading ? (
              [...Array(4)].map((_, i) => <ProjectSkeleton key={i} />)
            ) : githubProjects.length > 0 ? (
              githubProjects.map((project, i) => (
                <ProjectCard key={i} project={project} index={i} />
              ))
            ) : (
              <p className="text-zinc-500 text-lg italic">Connecting to system core... No repos found.</p>
            )}
          </div>
        </section>

        <div className="section-divider my-24 md:my-40" />

        {/* Experience / Education Section */}
        <section id="experience" className="space-y-24 md:space-y-32 py-24 md:py-32 px-6 md:px-24 reveal">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-l-4 border-primary pl-8 md:pl-10 reveal">
            <div className="space-y-2">
              <h2 className="text-sm font-black uppercase tracking-[0.4em] text-primary"> / Experience </h2>
              <h2 className="text-5xl md:text-8xl font-black tracking-tighter leading-[0.9] uppercase"> 
                REAL-WORLD <br/> <span className="text-zinc-600">IMPACT</span> 
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24">
            <div className="space-y-12 md:space-y-16">
              <div className="space-y-4 reveal">
                <div className="text-primary font-black text-xs tracking-widest uppercase">2023 — 2025</div>
                <h3 className="text-3xl md:text-4xl font-black tracking-tighter uppercase">JKUAT UNIVERSITY</h3>
                <p className="text-zinc-500 text-lg leading-relaxed font-medium">
                  Diploma in Computer Science. Specialized in Full Stack Development, 
                  Modern Web Architectures, and System Design. Focused on building 
                  efficient, user-centric solutions.
                </p>
              </div>

              <div className="space-y-4 reveal">
                <div className="text-primary font-black text-xs tracking-widest uppercase">3 Months Internship</div>
                <h3 className="text-3xl md:text-4xl font-black tracking-tighter uppercase">CITY HALL, NAIROBI</h3>
                <p className="text-zinc-500 text-lg leading-relaxed font-medium">
                  ICT Department. Assisted in network management, system maintenance, 
                  and digital transformation initiatives. Gained firsthand experience in 
                  large-scale infrastructure.
                </p>
              </div>
              
              <div className="space-y-4 reveal">
                <div className="text-primary font-black text-xs tracking-widest uppercase">Ongoing</div>
                <h3 className="text-3xl md:text-4xl font-black tracking-tighter uppercase">Full Stack Mastery</h3>
                <p className="text-zinc-500 text-lg leading-relaxed font-medium">
                  Deep diving into high-fidelity 3D development, AI-integrated systems, 
                  and performance-driven cloud architectures.
                </p>
              </div>
            </div>

            <div className="relative h-[400px] md:h-auto min-h-[400px] md:min-h-[600px]">
              <div className="absolute inset-0 bg-primary/5 blur-3xl rounded-full" />
              <div className="absolute inset-0 z-10">
                <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
                   <ambientLight intensity={0.5} />
                   <TechOrb />
                </Canvas>
              </div>
              <div className="relative glass p-8 md:p-12 space-y-6 md:space-y-8 z-20 h-full flex flex-col justify-center">
                <h4 className="text-[10px] md:text-xs font-black uppercase tracking-[0.3em] text-primary">Core Philosophy</h4>
                <p className="text-xl md:text-2xl font-medium leading-relaxed italic text-zinc-300">
                  "Software should be an extension of the mind—fluid, intelligent, and visually striking. I build to inspire."
                </p>
                <div className="flex flex-wrap gap-3 md:gap-4">
                  {["Architecture", "Design Systems", "3D Web"].map(tech => (
                    <span key={tech} className="px-3 md:px-4 py-1.5 md:py-2 bg-white/5 border border-white/10 rounded-full text-[9px] md:text-[10px] font-black uppercase tracking-widest text-zinc-400">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="section-divider my-24 md:my-40" />

        {/* Contact Section */}
        <section id="contact" className="min-h-[80vh] py-24 md:py-32 px-6 md:px-24 flex flex-col items-center justify-center text-center space-y-16 md:space-y-24 bg-black/20 backdrop-blur-[2px]">
          <div className="reveal space-y-4">
            <h2 className="text-sm font-black uppercase tracking-[0.4em] text-primary"> / Contact </h2>
            <h2 className="text-5xl md:text-8xl font-black tracking-tighter leading-[0.9] uppercase"> 
              LET&apos;S BUILD <br/> <span className="text-zinc-600">TOGETHER</span> 
            </h2>
          </div>

          <div className="flex flex-col items-center gap-12 reveal">
            <a href="mailto:mutiealvin0@gmail.com" className="group text-2xl md:text-5xl font-black tracking-tighter hover:text-primary transition-all border-b-2 md:border-b-4 border-transparent hover:border-primary pb-2 break-all px-4">
              mutiealvin0@gmail.com
            </a>
            
            <div className="flex flex-wrap justify-center gap-8 md:gap-12 text-[10px] md:text-xs font-black uppercase tracking-[0.3em] text-zinc-500">
              <a href="https://github.com/AlvinMutie" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-all">Github</a>
              <a href="#" className="hover:text-primary transition-all">LinkedIn</a>
              <a href="#" className="hover:text-primary transition-all">Twitter</a>
            </div>
          </div>
        </section>
      </div>

      <PhysicsSandbox />

      <footer className="py-16 md:py-20 border-t border-white/5 bg-surface/30">
        <div className="container mx-auto px-6 md:px-24 flex flex-col md:flex-row justify-between items-center gap-8 text-[9px] md:text-[10px] font-black tracking-[0.3em] uppercase text-zinc-600">
          <div>{mounted ? "ALVIN MUTIE / 2026" : "ALVIN MUTIE"}</div>
          <div className="text-center md:text-left">{mounted ? "DESIGNED & DEVELOPED WITH PASSION" : ""}</div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            AVAILABLE FOR NEW PROJECTS
          </div>
        </div>
      </footer>
    </main>
  );
}

function ProjectSkeleton() {
  return (
    <div className="relative p-10 bg-surface border-2 border-white/5 flex flex-col min-h-[420px] animate-pulse">
      <div className="flex justify-between items-start mb-12">
        <div className="w-24 h-6 bg-white/10 rounded" />
        <div className="w-12 h-12 bg-white/10 rounded" />
      </div>
      <div className="w-3/4 h-12 bg-white/10 rounded mb-4" />
      <div className="w-full h-24 bg-white/10 rounded mb-auto" />
      <div className="w-32 h-6 bg-white/10 rounded mt-12" />
    </div>
  );
}

function ScrollSyncManager() {
  useScrollSync();
  return null;
}
