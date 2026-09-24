"use client";

import dynamic from "next/dynamic";
import { ExternalLink } from "lucide-react";
import { useState } from "react";

// Dynamic import with ssr: false ensures zero WebGL hydration issues
const Book3DCanvas = dynamic(
  () => import("./about/Book3DCanvas").then((mod) => mod.Book3DCanvas),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-[480px] w-full sm:h-[540px] lg:h-[590px] xl:h-[620px] items-center justify-center">
        <div className="flex flex-col items-center gap-3 text-muted">
          <div className="size-8 animate-spin rounded-full border-2 border-line border-t-accent" />
          <span className="font-mono text-xs uppercase tracking-wider text-muted">
            Rigging 3D Archival Dossier...
          </span>
        </div>
      </div>
    ),
  }
);

export function About() {
  const [chapter, setChapter] = useState(1);

  return (
    <section
      id="about"
      className="relative mx-auto max-w-[1400px] min-h-screen flex flex-col justify-center px-4 sm:px-6 md:px-8 lg:px-8 pt-20 pb-12 sm:pt-24 sm:pb-16 lg:pt-20 lg:pb-10 scroll-mt-0 overflow-x-clip"
    >
      <div className="grid grid-cols-1 items-center gap-10 sm:gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:gap-14">
        {/* LEFT COLUMN: The Interactive 3D Book Dossier */}
        <div className="flex w-full justify-center">
          <Book3DCanvas chapter={chapter} onChapterChange={setChapter} />
        </div>

        {/* RIGHT COLUMN: Executive Summary & Clean Spec Sheet (Responsive across mobile, tablet & desktop) */}
        <div className="flex flex-col justify-center space-y-5 lg:space-y-5.5 w-full max-w-2xl mx-auto lg:max-w-none px-2 sm:px-6 lg:px-0 lg:pr-4 mt-2 sm:mt-4 lg:mt-0">
          {/* Eyebrow */}
          <div className="font-mono text-xs font-semibold tracking-widest text-muted uppercase">
            ABOUT ME // QUICK SUMMARY
          </div>

          {/* Name & Role Headline */}
          <div className="space-y-1.5">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-fg tracking-tight">
              Robiul Hasan Rony
            </h2>
            <p className="text-base sm:text-lg font-medium text-accent">
              Aspiring Software Engineer &amp; AI Automation Builder
            </p>
          </div>

          {/* Human Bio */}
          <p className="text-body text-muted leading-relaxed">
            Full-stack developer with a passion for building clean web applications
            and orchestrating autonomous AI workflows that eliminate repetitive manual work.
          </p>

          {/* Clean Telemetry Bullet Points */}
          <div className="border-y border-line/60 py-4 sm:py-5 space-y-3 sm:space-y-3.5">
            <div className="flex items-start gap-3">
              <span className="mt-2 size-1.5 shrink-0 rounded-full bg-accent" />
              <div className="text-sm leading-relaxed">
                <span className="font-mono text-xs text-fg font-semibold uppercase tracking-wider mr-2">
                  Core Focus:
                </span>
                <span className="text-muted">
                  Full-stack web development with Next.js, Node.js &amp; TypeScript.
                </span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <span className="mt-2 size-1.5 shrink-0 rounded-full bg-accent" />
              <div className="text-sm leading-relaxed">
                <span className="font-mono text-xs text-fg font-semibold uppercase tracking-wider mr-2">
                  Automations:
                </span>
                <span className="text-muted">
                  Designing autonomous AI agent pipelines using n8n &amp; Zapier.
                </span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <span className="mt-2 size-1.5 shrink-0 rounded-full bg-accent" />
              <div className="text-sm leading-relaxed">
                <span className="font-mono text-xs text-fg font-semibold uppercase tracking-wider mr-2">
                  Currently Into:
                </span>
                <span className="text-muted">
                  Actively deep-diving into AI engineering, autonomous agents &amp; DevOps.
                </span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <span className="mt-2 size-1.5 shrink-0 rounded-full bg-accent" />
              <div className="text-sm leading-relaxed">
                <span className="font-mono text-xs text-fg font-semibold uppercase tracking-wider mr-2">
                  Academic Roots:
                </span>
                <span className="text-muted">
                  3rd-year Computer Science &amp; Engineering undergraduate at{" "}
                  <strong className="text-fg font-medium">CUET</strong>.
                </span>
              </div>
            </div>
          </div>

          {/* Dual Action CTAs (Stacked on small phones, inline on tablets and desktop) */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 pt-1 sm:pt-2">
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-lg bg-accent px-6 py-3 font-mono text-xs font-bold text-on-accent transition-all duration-150 hover:opacity-90 active:scale-95"
            >
              <span>VIEW RESUME / CV</span>
              <ExternalLink className="size-3.5" />
            </a>

            <a
              href="#contact"
              className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-lg border border-line bg-card/60 px-6 py-3 font-mono text-xs font-semibold text-fg transition-all duration-150 hover:border-accent hover:text-accent hover:bg-card active:scale-95"
            >
              <span>LET&apos;S TALK</span>
              <span className="text-accent font-bold">↵</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

