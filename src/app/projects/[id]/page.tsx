import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  Code2,
  ExternalLink,
} from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import {
  projects,
  getProject,
  getAdjacentProjects,
} from "@/data/projects";
import { ProjectMasonryGallery } from "@/components/projects/ProjectMasonryGallery";

interface CaseStudyPageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return projects.map((p) => ({
    id: p.id,
  }));
}

export async function generateMetadata({
  params,
}: CaseStudyPageProps): Promise<Metadata> {
  const { id } = await params;
  const project = getProject(id);
  if (!project) {
    return { title: "Project Not Found" };
  }

  return {
    title: `${project.title} // Project Details`,
    description: `${project.tagline}. Case study and system architecture by Muhammad Rony.`,
    openGraph: {
      title: `${project.title} // Project Details`,
      description: project.description,
      images: project.image ? [{ url: project.image }] : undefined,
    },
  };
}

export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
  const { id } = await params;
  const project = getProject(id);

  if (!project) {
    notFound();
  }

  const { prev, next } = getAdjacentProjects(id);
  const cs = project.caseStudy;

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-canvas text-fg pt-24 sm:pt-28 pb-20 overflow-x-clip">
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* =========================================================
              TOP HEADER SECTION
              [<- Back]                           [Role • Timeline]
             ========================================================= */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 font-mono text-xs font-bold text-accent hover:opacity-80 transition-opacity group w-fit"
            >
              <ArrowLeft className="size-3.5 transition-transform group-hover:-translate-x-1" />
              <span>Back to Projects</span>
            </Link>

            <div className="flex items-center gap-2 font-mono text-xs text-accent">
              <span className="font-medium">{cs.role}</span>
              <span className="opacity-60">•</span>
              <span>{cs.timeline}</span>
            </div>
          </div>

          {/* PROJECT TITLE & INSTANT 2-SENTENCE OVERVIEW */}
          <div className="pt-4 pb-8 sm:pb-10">
            <h1 className="font-sans text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-fg leading-tight">
              {project.title}
            </h1>

            <p className="mt-4 text-base sm:text-lg text-muted max-w-3xl leading-relaxed">
              {project.description}
            </p>

            {/* ACTION BUTTONS & STACK PILLS */}
            <div className="mt-6 flex flex-wrap items-center gap-3 pt-2">
              {project.live && (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-xl bg-accent px-4 py-2 font-mono text-xs font-bold text-on-accent transition-all hover:bg-secondary active:scale-95 shadow-sm"
                >
                  <span>Check Live Website</span>
                  <ExternalLink className="size-3.5" />
                </a>
              )}

              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-xl border border-line bg-card/80 px-4 py-2 font-mono text-xs font-bold text-fg transition-all hover:border-accent hover:text-accent"
                >
                  <Code2 className="size-3.5 text-accent" />
                  <span>View Source Code</span>
                </a>
              )}

              {/* Stack Pills */}
              <div className="flex flex-wrap items-center gap-1.5">
                {project.stack.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-md border border-line bg-card/60 px-2.5 py-1 font-mono text-[11px] text-muted"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* =========================================================
              PINTEREST MASONRY GALLERY (Immediate Visual Hook)
             ========================================================= */}
          <ProjectMasonryGallery project={project} />

          {/* =========================================================
              THE CHALLENGE vs THE APPROACH SECTION
              Button-like pill headers with arrowhead bullet list
             ========================================================= */}
          <section className="my-12 sm:my-16 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 pt-8 border-t border-line/50">
            {/* Left Column: The Challenge */}
            <div className="flex flex-col space-y-6">
              <div className="w-full max-w-[280px] mx-auto py-3 px-6 rounded-full text-center font-heading text-xl sm:text-2xl font-bold bg-card border border-line-strong text-fg shadow-sm flex items-center justify-center transition-colors hover:border-accent/60">
                The Challenge
              </div>

              {cs.challenge.summary && (
                <p className="text-base sm:text-lg text-muted leading-relaxed font-sans">
                  {cs.challenge.summary}
                </p>
              )}

              <ul className="space-y-4 pt-2">
                {cs.challenge.points.map((pt, i) => (
                  <li key={i} className="flex items-start gap-3.5 group">
                    <svg
                      className="size-4.5 text-accent shrink-0 mt-1 transition-transform group-hover:translate-x-0.5"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path d="M4 3l16 9-16 9 3-9-3-9z" />
                    </svg>
                    <span className="text-base sm:text-lg text-fg/90 leading-relaxed font-sans">
                      {pt}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right Column: The Approach */}
            <div className="flex flex-col space-y-6">
              <div className="w-full max-w-[280px] mx-auto py-3 px-6 rounded-full text-center font-heading text-xl sm:text-2xl font-bold bg-accent text-on-accent shadow-md flex items-center justify-center transition-colors hover:bg-accent-hover">
                The Approach
              </div>

              {cs.solution.summary && (
                <p className="text-base sm:text-lg text-muted leading-relaxed font-sans">
                  {cs.solution.summary}
                </p>
              )}

              <ul className="space-y-4 pt-2">
                {cs.solution.architecturePoints.map((arch, i) => (
                  <li key={i} className="flex items-start gap-3.5 group">
                    <svg
                      className="size-4.5 text-accent shrink-0 mt-1 transition-transform group-hover:translate-x-0.5"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path d="M4 3l16 9-16 9 3-9-3-9z" />
                    </svg>
                    <div className="text-base sm:text-lg leading-relaxed font-sans">
                      <span className="font-semibold text-fg">{arch.title}</span>
                      {arch.desc && (
                        <span className="text-muted block mt-0.5 sm:inline sm:mt-0 sm:ml-1.5">
                          — {arch.desc}
                        </span>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* =========================================================
              BOTTOM NAVIGATION: NEXT & PREVIOUS CASE STUDIES
             ========================================================= */}
          <div className="pt-10 mt-14 sm:mt-20 border-t border-line/60">
            <div className="flex items-center justify-between mb-5">
              <span className="font-mono text-xs font-bold tracking-widest text-muted uppercase">
                Continue Exploring
              </span>
              <Link
                href="/projects"
                className="font-mono text-xs font-semibold text-accent hover:underline transition-all"
              >
                All Projects →
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              {/* Previous Project Card */}
              <Link
                href={`/projects/${prev.id}`}
                className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-line bg-card/50 p-5 sm:p-6 transition-all duration-300 hover:border-accent hover:bg-card hover:shadow-[0_10px_30px_rgba(var(--color-accent-rgb),0.12)] hover:-translate-y-1"
              >
                <div>
                  <div className="flex items-center gap-1.5 font-mono text-xs font-bold tracking-widest text-accent uppercase mb-2">
                    <ArrowLeft className="size-3.5 transition-transform duration-300 group-hover:-translate-x-1.5" />
                    <span>Previous Project</span>
                  </div>
                  <h3 className="font-sans text-base sm:text-lg lg:text-xl font-bold text-fg group-hover:text-accent transition-colors line-clamp-1">
                    {prev.title}
                  </h3>
                  <p className="mt-1 text-xs sm:text-sm text-muted line-clamp-1 font-sans">
                    {prev.tagline}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-line/40 flex items-center justify-between">
                  <span className="rounded-md border border-line bg-canvas/60 px-2 py-0.5 font-mono text-[10px] text-muted uppercase tracking-wider">
                    {prev.category}
                  </span>
                  <span className="font-mono text-xs text-muted group-hover:text-accent transition-colors">
                    View Project →
                  </span>
                </div>
              </Link>

              {/* Next Project Card */}
              <Link
                href={`/projects/${next.id}`}
                className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-line bg-card/50 p-5 sm:p-6 transition-all duration-300 hover:border-accent hover:bg-card hover:shadow-[0_10px_30px_rgba(var(--color-accent-rgb),0.12)] hover:-translate-y-1 sm:text-right"
              >
                <div>
                  <div className="flex items-center sm:justify-end gap-1.5 font-mono text-xs font-bold tracking-widest text-accent uppercase mb-2">
                    <span>Next Project</span>
                    <ArrowRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-1.5" />
                  </div>
                  <h3 className="font-sans text-base sm:text-lg lg:text-xl font-bold text-fg group-hover:text-accent transition-colors line-clamp-1">
                    {next.title}
                  </h3>
                  <p className="mt-1 text-xs sm:text-sm text-muted line-clamp-1 font-sans">
                    {next.tagline}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-line/40 flex items-center justify-between sm:flex-row-reverse">
                  <span className="rounded-md border border-line bg-canvas/60 px-2 py-0.5 font-mono text-[10px] text-muted uppercase tracking-wider">
                    {next.category}
                  </span>
                  <span className="font-mono text-xs text-muted group-hover:text-accent transition-colors">
                    ← View Project
                  </span>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
