"use client";

import Image from "next/image";
import Link from "next/link";
import { ExternalLink, Eye } from "lucide-react";
import type { Project } from "@/data/projects";

interface ProjectCardProps {
  project: Project;
  className?: string;
  priority?: boolean;
}

export function ProjectCard({ project, className = "", priority = false }: ProjectCardProps) {
  return (
    <div
      className={`group/card relative flex h-[500px] sm:h-[540px] md:h-[580px] w-full flex-col overflow-hidden rounded-2xl border border-line bg-card shadow-lg transition-all duration-300 hover:border-[var(--color-card-hover-border)] hover:shadow-[0_20px_45px_var(--color-card-hover-glow)] select-none ${className}`}
    >
      {/* Top Minimal Browser Frame Bar */}
      <div className="flex h-10 shrink-0 items-center border-b border-line bg-canvas/90 px-4 backdrop-blur-sm z-20">
        <div className="flex items-center gap-1.5">
          <span className="size-2.5 rounded-full bg-[#FF5F56]/80" />
          <span className="size-2.5 rounded-full bg-[#FFBD2E]/80" />
          <span className="size-2.5 rounded-full bg-[#27C93F]/80" />
          <span className="ml-2.5 font-mono text-[10px] text-muted truncate max-w-[220px] sm:max-w-[300px]">
            rhrony05/projects/{project.id}
          </span>
        </div>
      </div>

      {/* Main Full-Height Viewport */}
      <div className="relative flex-1 w-full overflow-hidden bg-canvas">
        {project.image ? (
          <>
            {/* Viewport Image: Smoothly scrolls on desktop hover for long pages, or stays crisp with subtle scale for single-page cards */}
            <Image
              src={project.image}
              alt={project.title}
              width={1200}
              height={project.hasScroll === false ? 800 : 3500}
              priority={priority}
              loading={priority ? undefined : "lazy"}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 600px"
              className={`w-full object-cover object-top ${
                project.hasScroll === false
                  ? "h-full transition-transform duration-500 ease-out md:group-hover/card:scale-103"
                  : "h-auto md:transition-transform md:duration-[7500ms] md:ease-in-out md:group-hover/card:-translate-y-[calc(100%-520px)]"
              }`}
            />

            {/* Bottom Gradient Shelf (Title, Stack, and Direct Action Buttons on All Devices) */}
            <div className="absolute inset-x-0 bottom-0 flex flex-col justify-end bg-gradient-to-t from-canvas via-canvas/90 to-transparent p-4 sm:p-5 pt-16 z-20 pointer-events-none">
              <span className="font-mono text-[10px] font-bold tracking-widest text-accent uppercase drop-shadow-sm">
                {(project.categories ?? [project.category]).join(" // ")}
              </span>
              <h3 className="line-clamp-1 font-sans text-lg font-bold text-fg md:text-xl drop-shadow-sm mt-0.5">
                {project.title}
              </h3>

              {/* Tech Stack Pills */}
              <div className="mt-2 flex flex-wrap gap-1.5">
                {project.stack.slice(0, 3).map((tech) => (
                  <span
                    key={tech}
                    className="rounded border border-line bg-card/85 px-2 py-0.5 font-mono text-[9px] text-muted backdrop-blur-xs"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Direct Action Buttons */}
              <div className="mt-3 flex items-center gap-2 sm:gap-2.5 pointer-events-auto">
                <Link
                  href={`/projects/${project.id}`}
                  className="flex items-center gap-1.5 rounded-lg border border-line bg-card/90 px-3.5 py-1.5 font-mono text-xs font-bold text-fg shadow-md backdrop-blur-sm hover:border-[var(--color-card-hover-border)] hover:text-fg hover:bg-card transition-all cursor-pointer active:scale-95"
                >
                  <Eye className="size-3.5 text-accent" />
                  VIEW DETAILS
                </Link>

                {project.live ? (
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1.5 rounded-lg bg-accent px-3.5 py-1.5 font-mono text-xs font-bold text-on-accent shadow-[0_0_14px_rgba(var(--color-accent-rgb),0.3)] hover:opacity-90 transition-all cursor-pointer active:scale-95"
                  >
                    <ExternalLink className="size-3.5" />
                    LIVE DEMO
                  </a>
                ) : null}
              </div>
            </div>
          </>
        ) : (
          /* Clean Single-Layer Coming Soon UI (Zero layer overflow) */
          <div className="relative flex h-full w-full flex-col items-center justify-center p-6 sm:p-8 text-center select-none">
            {/* Subtle blueprint dot grid */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-15 [background-image:radial-gradient(rgba(var(--color-accent-rgb),0.25)_1px,transparent_1px)] [background-size:16px_16px]"
            />

            {/* Category tag */}
            <div className="relative z-10 mb-4 flex flex-wrap items-center gap-1.5">
              {(project.categories ?? [project.category]).map((cat) => (
                <span
                  key={cat}
                  className="rounded-full border border-line/80 bg-card/90 px-3 py-1 font-mono text-[11px] font-bold tracking-widest text-accent uppercase shadow-sm"
                >
                  {cat}
                </span>
              ))}
            </div>

            {/* Bold & Big Project Title */}
            <h3 className="relative z-10 font-sans text-2xl sm:text-3xl font-black tracking-tight text-fg max-w-[340px] leading-snug drop-shadow-sm">
              {project.title}
            </h3>

            {/* Bold and Big COMING SOON Text */}
            <div className="relative z-10 mt-6 flex items-center gap-2.5 rounded-xl border border-line/90 bg-card/95 px-6 py-3 shadow-xl backdrop-blur-sm">
              <span className="size-2.5 rounded-full bg-accent animate-pulse" />
              <span className="font-mono text-base sm:text-lg font-black tracking-widest text-accent uppercase">
                COMING SOON
              </span>
            </div>

            {/* Click to inspect planned specs */}
            <Link
              href={`/projects/${project.id}`}
              className="relative z-10 mt-6 flex items-center gap-2 rounded-lg border border-line/60 bg-card/60 px-4 py-2 font-mono text-xs font-semibold text-muted transition-all hover:border-[var(--color-card-hover-border)] hover:text-fg hover:bg-card shadow-sm cursor-pointer"
            >
              <Eye className="size-3.5" />
              VIEW SPECS
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
