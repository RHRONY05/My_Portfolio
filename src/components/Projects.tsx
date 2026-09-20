"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Code2,
  ExternalLink,
} from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { SectionLabel } from "@/components/SectionLabel";
import { projectsContent } from "@/data/content";
import { type Project, type ProjectCategory, projects } from "@/data/projects";

const categoryClass: Record<
  ProjectCategory,
  { text: string; tagBg: string; tagBorder: string }
> = {
  "Full Stack": {
    text: "text-cat-fullstack",
    tagBg: "bg-cat-fullstack/10",
    tagBorder: "border-cat-fullstack/30",
  },
  Automation: {
    text: "text-cat-automation",
    tagBg: "bg-cat-automation/10",
    tagBorder: "border-cat-automation/30",
  },
  "AI/RAG": {
    text: "text-cat-ai",
    tagBg: "bg-cat-ai/10",
    tagBorder: "border-cat-ai/30",
  },
};

export function Projects() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const total = projects.length;

  const go = useCallback(
    (next: number) => {
      setDirection(next > index ? 1 : -1);
      setIndex((next + total) % total);
    },
    [index, total]
  );

  const next = useCallback(() => go(index + 1), [go, index]);
  const prev = useCallback(() => go(index - 1), [go, index]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, prev]);

  const project = projects[index];

  return (
    <section
      id="projects"
      className="relative mx-auto w-full max-w-[1200px] px-6 py-24 md:px-12"
    >
      <header className="mb-8 flex items-center justify-between">
        <div className="w-16" aria-hidden />
        <SectionLabel>{projectsContent.label}</SectionLabel>
        <div className="text-mono text-muted">
          {String(index + 1).padStart(2, "0")}{" "}
          <span className="opacity-50">/ {String(total).padStart(2, "0")}</span>
        </div>
      </header>

      <div className="relative flex items-center gap-6">
        <NavArrow side="left" onClick={prev} />

        <div className="group relative w-full overflow-hidden rounded-lg border border-line bg-canvas p-2 md:p-6 lg:p-8">
          <div
            aria-hidden
            className="absolute inset-0 -z-10 opacity-30 [background-image:radial-gradient(rgba(48,54,61,0.4)_1px,transparent_1px)] [background-size:16px_16px]"
          />

          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={project.id}
              custom={direction}
              initial={{ opacity: 0, x: direction * 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction * -40 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="grid grid-cols-1 gap-6 lg:grid-cols-12"
            >
              <BrowserMockup project={project} />
              <ProjectDetails project={project} />
            </motion.div>
          </AnimatePresence>
        </div>

        <NavArrow side="right" onClick={next} />
      </div>

      <div className="mt-6 flex items-center justify-center gap-3">
        {projects.map((p, i) => (
          <button
            key={p.id}
            type="button"
            onClick={() => go(i)}
            aria-label={`Go to project ${i + 1}: ${p.title}`}
            aria-current={i === index}
            className={
              i === index
                ? "size-2 rounded-full bg-accent shadow-[0_0_8px_rgba(0,255,148,0.6)] transition-all"
                : "size-2 rounded-full bg-line transition-all hover:bg-muted"
            }
          />
        ))}
      </div>
    </section>
  );
}

function NavArrow({
  side,
  onClick,
}: {
  side: "left" | "right";
  onClick: () => void;
}) {
  const Icon = side === "left" ? ChevronLeft : ChevronRight;
  const position = side === "left" ? "-left-16" : "-right-16";
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={side === "left" ? "Previous project" : "Next project"}
      className={`absolute ${position} z-20 hidden size-12 items-center justify-center rounded-full border border-line bg-canvas text-muted transition-colors hover:border-accent hover:text-accent md:flex`}
    >
      <Icon className="size-5" aria-hidden />
    </button>
  );
}

function BrowserMockup({ project }: { project: Project }) {
  const cat = categoryClass[project.category];
  return (
    <div className="relative z-10 lg:col-span-7">
      <div
        aria-hidden
        className="absolute inset-0 rounded-lg bg-accent/5 blur-xl transition-colors duration-500 group-hover:bg-accent/10"
      />
      <div className="relative flex h-full min-h-[300px] flex-col overflow-hidden rounded-lg border border-line bg-[#0a0e14] shadow-2xl lg:min-h-[450px]">
        <div className="flex items-center gap-2 border-b border-line bg-[#1c2128] px-4 py-3">
          <span className="size-3 rounded-full bg-[#FF5F56]" />
          <span className="size-3 rounded-full bg-[#FFBD2E]" />
          <span className="size-3 rounded-full bg-[#27C93F]" />
          <span className="ml-4 truncate text-mono text-muted/80">
            rony.dev/projects/{project.id}
          </span>
        </div>
        <div className="relative flex flex-1 items-center justify-center overflow-hidden bg-card">
          {/* TODO: drop a screenshot at /public/projects/{project.id}.png and replace this block with <Image ... fill /> */}
          <div
            aria-hidden
            className="absolute inset-0 opacity-40"
            style={{
              backgroundImage: `radial-gradient(circle at 30% 20%, ${cssVarFromCategory(project.category)} 0%, transparent 60%)`,
            }}
          />
          <div className="relative flex flex-col items-center gap-3 px-6 text-center">
            <span
              className={`text-mono uppercase tracking-widest ${cat.text}`}
            >
              {project.category}
            </span>
            <span className="text-h2 text-fg">{project.title}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function cssVarFromCategory(category: ProjectCategory) {
  switch (category) {
    case "Full Stack":
      return "rgba(0, 255, 148, 0.25)";
    case "Automation":
      return "rgba(108, 99, 255, 0.25)";
    case "AI/RAG":
      return "rgba(0, 217, 255, 0.25)";
  }
}

function ProjectDetails({ project }: { project: Project }) {
  const cat = categoryClass[project.category];
  const features = project.features.filter(Boolean);
  const stack = project.stack.filter(Boolean);

  return (
    <div className="z-10 flex flex-col justify-center gap-3 py-4 lg:col-span-5 lg:py-0 lg:pl-4">
      <div>
        <span
          className={`mb-4 inline-block rounded border px-3 py-1 text-mono ${cat.tagBg} ${cat.tagBorder} ${cat.text}`}
        >
          {project.category}
        </span>
        <h3 className="mb-2 text-h1 text-fg">{project.title}</h3>
        {project.description ? (
          <p className="mb-6 text-body text-muted">{project.description}</p>
        ) : (
          <p className="mb-6 text-body italic text-muted/60">
            Description coming soon.
          </p>
        )}
      </div>

      {features.length > 0 && (
        <div className="mb-6 flex flex-col gap-2">
          <h4 className="mb-2 text-mono uppercase text-fg">What I built</h4>
          {features.map((feat) => (
            <div key={feat} className="flex items-start gap-3">
              <CheckCircle2
                className="mt-0.5 size-[18px] shrink-0 text-accent"
                aria-hidden
              />
              <span className="text-caption text-muted">{feat}</span>
            </div>
          ))}
        </div>
      )}

      {stack.length > 0 && (
        <ul className="mb-8 flex flex-wrap gap-2">
          {stack.map((tech) => (
            <li
              key={tech}
              className="rounded border border-line bg-card px-2.5 py-1 text-caption text-muted"
            >
              {tech}
            </li>
          ))}
        </ul>
      )}

      <div className="mt-auto flex flex-wrap items-center gap-4">
        {project.live ? (
          <a
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded bg-accent px-5 py-2.5 text-mono text-on-accent transition-opacity hover:opacity-90"
          >
            <ExternalLink className="size-[18px]" aria-hidden />
            Live Demo
          </a>
        ) : null}
        {project.github ? (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded border border-line bg-transparent px-5 py-2.5 text-mono text-fg transition-colors hover:border-fg"
          >
            <Code2 className="size-[18px]" aria-hidden />
            View Code
          </a>
        ) : null}
      </div>
    </div>
  );
}
