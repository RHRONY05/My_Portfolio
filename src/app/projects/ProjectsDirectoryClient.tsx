"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FolderGit2 } from "lucide-react";
import type { Project, ProjectCategory } from "@/data/projects";
import { ProjectCard } from "@/components/projects/ProjectCard";

type FilterTab = "all" | ProjectCategory;

const filterTabs: { id: FilterTab; label: string; shortLabel: string }[] = [
  { id: "all", label: "All Projects", shortLabel: "All" },
  { id: "AI/RAG", label: "AI & Agents", shortLabel: "AI" },
  { id: "Full Stack", label: "Full Stack", shortLabel: "Full Stack" },
  { id: "Frontend", label: "Frontend", shortLabel: "Frontend" },
  { id: "Automation", label: "Automation", shortLabel: "Automation" },
];

const spans = [
  "md:col-span-12 lg:col-span-7",
  "md:col-span-12 lg:col-span-5",
  "md:col-span-12 lg:col-span-5",
  "md:col-span-12 lg:col-span-7",
];

interface ProjectsDirectoryClientProps {
  projects: readonly Project[];
}

export function ProjectsDirectoryClient({ projects }: ProjectsDirectoryClientProps) {
  const [activeTab, setActiveTab] = useState<FilterTab>("all");

  const isMatch = (p: Project, cat: FilterTab) => {
    if (cat === "all") return true;
    return p.categories ? p.categories.includes(cat) : p.category === cat;
  };

  const counts = useMemo(() => {
    const map: Record<string, number> = {
      all: projects.length,
      "AI/RAG": projects.filter((p) => isMatch(p, "AI/RAG")).length,
      "Full Stack": projects.filter((p) => isMatch(p, "Full Stack")).length,
      Frontend: projects.filter((p) => isMatch(p, "Frontend")).length,
      Automation: projects.filter((p) => isMatch(p, "Automation")).length,
    };
    return map;
  }, [projects]);

  const filteredProjects = useMemo(() => {
    if (activeTab === "all") return projects;
    return projects.filter((p) => isMatch(p, activeTab));
  }, [projects, activeTab]);

  return (
    <div className="w-full">
      {/* Category Filter Bar - Directly Placed on Page Background, Non-Sticky */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 sm:mb-12">
        {/* Filter Chips */}
        <div
          role="tablist"
          aria-label="Filter projects by category"
          className="flex items-center gap-2 overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden max-w-full py-1"
        >
          {filterTabs.map((tab) => {
            const isActive = activeTab === tab.id;
            const count = counts[tab.id] || 0;

            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveTab(tab.id)}
                className={`inline-flex items-center gap-2 rounded-full px-4 py-2 font-mono text-xs font-bold transition-all cursor-pointer select-none whitespace-nowrap border ${
                  isActive
                    ? "bg-accent text-on-accent border-accent shadow-sm"
                    : "bg-card/40 text-muted border-line hover:border-accent/60 hover:text-fg hover:bg-card/70"
                }`}
              >
                <span>
                  <span className="sm:hidden">{tab.shortLabel}</span>
                  <span className="hidden sm:inline">{tab.label}</span>
                </span>

                <span
                  className={`rounded-full px-1.5 py-0.2 font-mono text-[10px] ${
                    isActive
                      ? "bg-on-accent/20 text-on-accent font-black"
                      : "bg-canvas border border-line text-muted"
                  }`}
                >
                  {count.toString().padStart(2, "0")}
                </span>
              </button>
            );
          })}
        </div>

        {/* Right-Side Telemetry Indicator */}
        <div className="hidden md:flex items-center gap-2 font-mono text-xs text-muted shrink-0">
          <span className="size-1.5 rounded-full bg-accent animate-pulse" />
          <span className="tracking-wider uppercase">
            {filteredProjects.length} OF {projects.length} WORKS
          </span>
        </div>
      </div>

      {/* Projects Grid */}
      <AnimatePresence mode="popLayout">
        {filteredProjects.length > 0 ? (
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8"
          >
            {filteredProjects.map((project, idx) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.22, delay: idx * 0.03 }}
                className={spans[idx % spans.length]}
              >
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="mx-auto max-w-md rounded-2xl border border-dashed border-line p-10 text-center bg-card/40">
            <FolderGit2 className="mx-auto size-10 text-muted" />
            <h4 className="mt-4 font-sans text-lg font-bold text-fg">
              No projects in this category
            </h4>
            <p className="mt-1 text-xs text-muted">
              Select another category to view projects.
            </p>
            <button
              type="button"
              onClick={() => setActiveTab("all")}
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-accent px-4 py-2 font-mono text-xs font-bold text-on-accent hover:bg-secondary cursor-pointer"
            >
              Reset to All
            </button>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
