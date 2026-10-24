"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getFeaturedProjects, getAllProjects } from "@/data/projects";
import { ProjectCard } from "./ProjectCard";

const spanPattern = [
  "md:col-span-12 lg:col-span-7",
  "md:col-span-12 lg:col-span-5",
  "md:col-span-12 lg:col-span-5",
  "md:col-span-12 lg:col-span-7",
];

export function ProjectsSection() {
  const featured = getFeaturedProjects();
  const allProjectsCount = getAllProjects().length;

  return (
    <section
      id="projects"
      className="relative z-10 isolate mx-auto flex w-full max-w-7xl flex-col px-4 pt-20 sm:pt-28 lg:pt-32 pb-16 md:pb-24 sm:px-6 lg:px-8 scroll-mt-20"
    >
      {/* Clean Minimal Header */}
      <div className="flex items-end justify-between gap-3 sm:gap-4 border-b border-line/60 pb-4 sm:pb-5 mb-8 sm:mb-12">
        <div className="min-w-0">
          <span className="font-mono text-[10px] sm:text-xs font-semibold tracking-widest text-muted uppercase">
            PROJECTS // SELECTED
          </span>
          <h2 className="mt-1 font-sans text-xl sm:text-2xl md:text-3xl font-black tracking-tight text-fg truncate">
            Featured Projects
          </h2>
        </div>

        <Link
          href="/projects"
          className="inline-flex shrink-0 items-center gap-1.5 font-mono text-[11px] sm:text-xs font-bold text-accent hover:text-secondary transition-colors whitespace-nowrap pb-0.5"
        >
          <span>ALL PROJECTS ({allProjectsCount})</span>
          <ArrowRight className="size-3.5" />
        </Link>
      </div>

      {/* 12-Column Asymmetrical Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8">
        {featured.map((project, idx) => (
          <ProjectCard
            key={project.id}
            project={project}
            priority={idx < 2}
            className={spanPattern[idx % spanPattern.length]}
          />
        ))}
      </div>

      {/* Clean View More Button */}
      <div className="mt-10 sm:mt-14 flex justify-center">
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 rounded-xl border border-line bg-card px-6 py-3 font-mono text-xs font-bold text-fg transition-all hover:border-accent hover:text-accent hover:bg-card/80 active:scale-95 shadow-sm"
        >
          <span>VIEW MORE PROJECTS ({allProjectsCount})</span>
          <ArrowRight className="size-3.5" />
        </Link>
      </div>
    </section>
  );
}
