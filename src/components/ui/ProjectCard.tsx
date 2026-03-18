import { motion } from "framer-motion";
import { ExternalLink, Github, Star, Code2 } from "lucide-react";
import { GitHubRepo } from "@/lib/github";
import { cn } from "@/lib/utils";

export function ProjectCard({ project, index }: { project: GitHubRepo; index: number }) {
  const tags = [project.language, ...(project.topics || [])].filter(Boolean).slice(0, 6);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      viewport={{ once: true }}
      className="group relative"
    >
      <div className="absolute inset-0 bg-primary/5 translate-x-2 translate-y-2 -z-10 transition-transform group-hover:translate-x-4 group-hover:translate-y-4" />
      <div className="relative p-10 bg-surface border-2 border-white/5 group-hover:border-primary/40 transition-all duration-500 flex flex-col min-h-[460px]">
        <div className="flex justify-between items-start mb-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-primary/60">
              <Code2 size={12} />
              <span>Tech Stack</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag, j) => (
                <span 
                  key={j} 
                  className="px-3 py-1 text-[9px] font-black uppercase tracking-widest bg-white/5 border border-white/10 group-hover:border-primary/40 transition-colors"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <div className="flex gap-4 text-zinc-500 group-hover:text-primary transition-colors pt-1">
            {project.stargazers_count > 0 && (
              <div className="flex items-center gap-1 bg-white/5 px-2 py-1 rounded">
                <Star size={14} className="fill-current" />
                <span className="text-[10px] font-black">{project.stargazers_count}</span>
              </div>
            )}
            <a href={project.html_url} target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform">
              <Github size={22} strokeWidth={2.5} />
            </a>
          </div>
        </div>

        <div className="space-y-4 mb-auto">
          <h3 className="text-4xl font-black tracking-tighter leading-none group-hover:text-primary transition-colors uppercase">
            {project.name.replace(/-/g, " ")}
          </h3>
          <p className="text-base text-zinc-400 leading-relaxed font-medium line-clamp-4">
            {project.description || "Sophisticated system architecture and high-performance code craft."}
          </p>
        </div>

        <div className="pt-12 mt-auto">
          <a 
            href={project.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 text-xs font-black uppercase tracking-widest group-hover:gap-6 transition-all"
          >
            <span>Explore Codebase</span>
            <div className="h-[2px] w-8 bg-primary/30 group-hover:w-16 group-hover:bg-primary transition-all" />
          </a>
        </div>
      </div>
    </motion.div>
  );
}
