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
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-6 border-b border-line/40">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 font-mono text-xs font-bold text-muted hover:text-accent transition-colors group w-fit"
            >
              <ArrowLeft className="size-3.5 transition-transform group-hover:-translate-x-1" />
              <span>Back to Projects</span>
            </Link>

            <div className="flex items-center gap-2 font-mono text-xs text-muted">
              <span className="text-fg font-medium">{cs.role}</span>
              <span className="text-line">•</span>
              <span>{cs.timeline}</span>
            </div>
          </div>

          {/* PROJECT TITLE & INSTANT 2-SENTENCE OVERVIEW */}
          <div className="py-8 sm:py-10">
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="size-2 rounded-full bg-accent animate-pulse" />
              <span className="font-mono text-xs font-bold tracking-widest text-accent uppercase">
                {project.category}
              </span>
            </div>

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
              01. THE PROBLEM SOLVED  |  02. THE ENGINEERED SOLUTION
             ========================================================= */}
          <section className="my-12 sm:my-16 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 pt-8 border-t border-line/50">
            {/* Left Column: 01. THE PROBLEM SOLVED */}
            <div className="flex flex-col">
              <div className="flex items-center gap-2 font-mono text-xs font-bold tracking-widest text-accent uppercase mb-3">
                <span>01.</span>
                <span>THE PROBLEM SOLVED</span>
              </div>
              <h2 className="font-sans text-2xl sm:text-3xl font-black text-fg mb-3">
                Why this needed to exist
              </h2>
              <p className="text-sm sm:text-base text-muted leading-relaxed font-sans mb-6">
                {cs.challenge.summary}
              </p>

              {/* 3 Bullet Points */}
              <div className="space-y-3 mt-auto">
                {cs.challenge.points.slice(0, 3).map((pt, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 rounded-xl border border-line bg-card/50 p-4"
                  >
                    <span className="mt-1 size-1.5 rounded-full bg-accent shrink-0" />
                    <span className="text-xs sm:text-sm text-fg/90 leading-relaxed">
                      {pt}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: 02. THE ENGINEERED SOLUTION */}
            <div className="flex flex-col">
              <div className="flex items-center gap-2 font-mono text-xs font-bold tracking-widest text-accent uppercase mb-3">
                <span>02.</span>
                <span>THE ENGINEERED SOLUTION</span>
              </div>
              <h2 className="font-sans text-2xl sm:text-3xl font-black text-fg mb-3">
                How it was architected
              </h2>
              <p className="text-sm sm:text-base text-muted leading-relaxed font-sans mb-6">
                {cs.solution.summary}
              </p>

              {/* 3 Key Architecture Cards */}
              <div className="space-y-3 mt-auto">
                {cs.solution.architecturePoints.slice(0, 3).map((arch, i) => (
                  <div
                    key={i}
                    className="rounded-xl border border-line bg-card/60 p-4 transition-all hover:border-accent/60"
                  >
                    <div className="flex items-center gap-2 font-mono text-xs font-bold text-accent">
                      <span>0{i + 1} //</span>
                      <span>{arch.title}</span>
                    </div>
                    <p className="mt-1.5 text-xs sm:text-sm text-muted leading-relaxed">
                      {arch.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* =========================================================
              BOTTOM NAVIGATION
              [<- Prev Project]                      [Next Project ->]
             ========================================================= */}
          <div className="flex items-center justify-between gap-4 pt-8 mt-12 sm:mt-16 border-t border-line/60">
            <Link
              href={`/projects/${prev.id}`}
              className="group inline-flex items-center gap-2 font-mono text-xs font-bold text-muted hover:text-accent transition-colors max-w-[45%]"
            >
              <ArrowLeft className="size-4 shrink-0 transition-transform group-hover:-translate-x-1" />
              <span className="truncate">PREV: {prev.title}</span>
            </Link>

            <Link
              href={`/projects/${next.id}`}
              className="group inline-flex items-center gap-2 font-mono text-xs font-bold text-muted hover:text-accent transition-colors max-w-[45%] text-right ml-auto"
            >
              <span className="truncate">NEXT: {next.title}</span>
              <ArrowRight className="size-4 shrink-0 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
