import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, ExternalLink, Sparkles } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import {
  projects,
  getProject,
  getAdjacentProjects,
} from "@/data/projects";
import { CaseStudyDossierView } from "./CaseStudyDossierView";

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
    return { title: "Case Study Not Found" };
  }

  return {
    title: `${project.title} // Case Study & Architecture`,
    description: `${project.tagline}. Architectural dossier and engineering write-up by Muhammad Rony.`,
    openGraph: {
      title: `${project.title} // Case Study`,
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

      <main className="min-h-screen bg-canvas text-fg pt-28 sm:pt-36 lg:pt-40 pb-20 overflow-x-clip">
        {/* Dynamic theme ambient backdrop glow */}
        <div
          aria-hidden
          className="pointer-events-none fixed top-20 left-1/2 -translate-x-1/2 size-[700px] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(var(--color-accent-rgb),0.06)_0%,transparent_70%)]"
        />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb Navigation */}
          <div className="flex items-center gap-2 mb-8">
            <Link
              href="/projects"
              className="group inline-flex items-center gap-1.5 font-mono text-xs text-muted transition-colors hover:text-accent"
            >
              <ArrowLeft className="size-3.5 transition-transform group-hover:-translate-x-1" />
              <span>All Projects</span>
            </Link>
            <span className="font-mono text-xs text-line">/</span>
            <span className="font-mono text-xs text-muted">{project.category}</span>
            <span className="font-mono text-xs text-line">/</span>
            <span className="font-mono text-xs text-accent truncate max-w-[200px] sm:max-w-xs">
              {project.id}
            </span>
          </div>

          {/* Case Study Header & Title */}
          <div className="max-w-4xl mb-10 sm:mb-14">
            <div className="inline-flex items-center gap-2 rounded-full border border-line bg-card/80 px-3.5 py-1 backdrop-blur-md">
              <span className="size-2 rounded-full bg-accent animate-pulse" />
              <span className="font-mono text-xs font-bold tracking-widest text-accent uppercase">
                CASE STUDY // {project.category}
              </span>
            </div>

            <h1 className="mt-4 font-sans text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-fg leading-tight">
              {project.title}
            </h1>

            <p className="mt-4 text-base sm:text-xl text-accent/90 font-sans font-medium leading-relaxed">
              {project.tagline}
            </p>
          </div>

          {/* XenZolve-Style Case Study Meta Row */}
          <div className="mb-12 sm:mb-16 grid grid-cols-2 md:grid-cols-4 gap-6 py-6 border-y border-line/60 bg-card/30 rounded-2xl px-6 backdrop-blur-sm">
            <div>
              <span className="block font-mono text-[11px] font-bold text-muted uppercase tracking-wider">
                Context / Domain
              </span>
              <span className="mt-1 block font-sans text-sm font-semibold text-fg">
                {cs.context}
              </span>
            </div>

            <div>
              <span className="block font-mono text-[11px] font-bold text-muted uppercase tracking-wider">
                My Role
              </span>
              <span className="mt-1 block font-sans text-sm font-semibold text-fg">
                {cs.role}
              </span>
            </div>

            <div>
              <span className="block font-mono text-[11px] font-bold text-muted uppercase tracking-wider">
                Timeline
              </span>
              <span className="mt-1 block font-sans text-sm font-semibold text-fg">
                {cs.timeline}
              </span>
            </div>

            <div>
              <span className="block font-mono text-[11px] font-bold text-muted uppercase tracking-wider">
                Core Stack
              </span>
              <div className="mt-1 flex flex-wrap gap-1">
                {project.stack.slice(0, 3).map((s) => (
                  <span
                    key={s}
                    className="rounded border border-line bg-card px-1.5 py-0.5 font-mono text-[10px] text-fg"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Action Row (Live Demo / GitHub) */}
          {(project.live || project.github) && (
            <div className="mb-10 flex flex-wrap items-center gap-3">
              {project.live && (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl bg-accent px-5 py-2.5 font-mono text-xs font-bold text-on-accent transition-all hover:bg-secondary active:scale-95 shadow-md cursor-pointer"
                >
                  <span>LAUNCH LIVE APPLICATION</span>
                  <ExternalLink className="size-3.5" />
                </a>
              )}

              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl border border-line bg-card px-5 py-2.5 font-mono text-xs font-bold text-fg transition-all hover:border-accent hover:text-accent cursor-pointer"
                >
                  <span>INSPECT SOURCE CODE</span>
                  <ArrowUpRight className="size-3.5" />
                </a>
              )}
            </div>
          )}

          {/* Interactive Multi-Chapter Dossier View */}
          <CaseStudyDossierView
            project={project}
            prevProject={prev}
            nextProject={next}
          />
        </div>
      </main>

      <Footer />
    </>
  );
}
