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

interface ChapterData {
  number: string;
  era: string;
  eyebrow: string;
  title: string;
  accentTitle: string;
  body1: React.ReactNode;
  body2: string;
  stats: { label: string; value: string; accent?: boolean }[];
  telemetry: string;
}

const CHAPTERS: Record<number, ChapterData> = {
  1: {
    number: "01 / 04",
    era: "PRESENT ERA",
    eyebrow: "STUDENT & DEVELOPER",
    title: "A Student, A Builder, & A ",
    accentTitle: "Work in Progress.",
    body1: (
      <>
        I am currently a 3rd-year Computer Science &amp; Engineering undergraduate at{" "}
        <strong className="text-fg font-medium">
          CUET (Chittagong University of Engineering and Technology)
        </strong>
        , with one more year left until graduation.
      </>
    ),
    body2:
      "I don't claim to know everything, nor do I have it all figured out. But I love building things with code, learning from my mistakes, and turning ideas into reliable, working software.",
    stats: [
      { label: "STATUS", value: "3rd Year Undergrad" },
      { label: "ACADEMIC ROOTS", value: "CUET CSE (22-23)", accent: true },
      { label: "MILESTONE", value: "1 Year to B.Sc." },
    ],
    telemetry: "CURRENT FOCUS: BUILDING & LEARNING EVERY DAY",
  },
  2: {
    number: "02 / 04",
    era: "SESSION 2022-23",
    eyebrow: "THE EMOTIONAL ANCHOR",
    title: "More Than An ",
    accentTitle: "Academic Institution.",
    body1: (
      <>
        CUET has been my home and emotional anchor. Coming here meant meeting people from every corner of the country, hearing their stories, and seeing life through completely new eyes.
      </>
    ),
    body2:
      "Between the stress of lab deadlines, late-night hall conversations, canteens, and endless laughs, this is where I learned the reality of life—a place we spent half our time complaining about, yet quietly call our second home.",
    stats: [
      { label: "CAMPUS", value: "CUET, Raozan" },
      { label: "DEPARTMENT", value: "CSE (Session 22-23)", accent: true },
      { label: "MEMORIES", value: "Hall Life & Friendships" },
    ],
    telemetry: "CUET MEMORIES: STRUGGLE, BONDING & LESSONS",
  },
  3: {
    number: "03 / 04",
    era: "HIGHER SECONDARY (2020-2022)",
    eyebrow: "THE STEPPING STONE",
    title: "Finding Direction Amidst The ",
    accentTitle: "Rush.",
    body1: (
      <>
        College at{" "}
        <strong className="text-fg font-medium">
          Savar Cantonment Public School &amp; College
        </strong>{" "}
        was a transition from a sheltered school life to a fast-paced, competitive world. We had very little time, and I couldn't get close to everyone in my batch.
      </>
    ),
    body2:
      "Yet watching my peers push relentlessly with clear goals in mind changed something deep inside me. Seeing their drive inspired me to commit fully, reshape my habits, and earn my place at a public engineering university.",
    stats: [
      { label: "INSTITUTION", value: "SCPSC, Savar" },
      { label: "PROGRAM", value: "HSC Science (2020-22)", accent: true },
      { label: "TURNING POINT", value: "Mindset & Public Univ." },
    ],
    telemetry: "SCPSC DAYS: PURPOSE, DRIVE & INSPIRATION",
  },
  4: {
    number: "04 / 04",
    era: "SCHOOL & SSC (CLASS OF 2020)",
    eyebrow: "THE GENESIS",
    title: "Where Curiosity Was ",
    accentTitle: "Simple and Pure.",
    body1: (
      <>
        Long before I knew what code, algorithms, or computer architecture were, school was where raw curiosity lived without expectations or pressure.
      </>
    ),
    body2:
      "From innocent friendships and running across the grounds to the simple joy of taking things apart to see how they worked—everything I build today has its roots in that carefree boy who was just curious.",
    stats: [
      { label: "FOUNDATION", value: "Voyager School" },
      { label: "MILESTONE", value: "SSC Science (2020)", accent: true },
      { label: "CORE IDENTITY", value: "The First Spark" },
    ],
    telemetry: "THE FIRST SPARK: ROOT CURIOSITY",
  },
};

export function About() {
  const [chapter, setChapter] = useState(1);
  const activeChapter = CHAPTERS[chapter] || CHAPTERS[1];

  return (
    <section
      id="about"
      className="relative mx-auto max-w-[1400px] px-4 pt-4 pb-16 sm:pt-6 md:pt-8 md:pb-20 lg:pt-8 scroll-mt-20"
    >
      <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:gap-14">
        {/* LEFT COLUMN: The Interactive 3D Book Dossier */}
        <div className="flex w-full justify-center">
          <Book3DCanvas chapter={chapter} onChapterChange={setChapter} />
        </div>

        {/* RIGHT COLUMN: The Editorial Narrative Panel (Synchronized with active chapter) */}
        <div className="space-y-5 lg:pt-1 lg:pr-2 transition-opacity duration-300">
          {/* Comic Kicker */}
          <div className="flex items-center gap-3 font-mono text-xs tracking-wider">
            <span className="text-accent font-semibold">{activeChapter.number}</span>
            <span className="text-muted/40">•</span>
            <span className="text-muted uppercase">{activeChapter.era}</span>
          </div>

          {/* Eyebrow & Title */}
          <div className="space-y-1.5">
            <span className="font-mono text-xs font-semibold tracking-widest text-muted uppercase">
              {activeChapter.eyebrow}
            </span>
            <h2 className="text-h1 font-bold text-fg tracking-tight leading-tight">
              {activeChapter.title}
              <span className="text-accent">{activeChapter.accentTitle}</span>
            </h2>
          </div>

          {/* Editorial Narrative Prose */}
          <div className="space-y-3.5 text-body text-muted leading-relaxed">
            <p>{activeChapter.body1}</p>
            <p>{activeChapter.body2}</p>
          </div>

          {/* Definition List (Metadata Grid) */}
          <dl className="grid grid-cols-2 gap-3.5 border-y border-line/60 py-4 sm:grid-cols-3">
            {activeChapter.stats.map((stat, i) => (
              <div key={i} className={i === 2 ? "col-span-2 sm:col-span-1" : undefined}>
                <dt className="font-mono text-[11px] text-muted tracking-wider uppercase">
                  {stat.label}
                </dt>
                <dd
                  className={`mt-1 font-mono text-xs font-medium ${
                    stat.accent ? "text-accent" : "text-fg"
                  }`}
                >
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>

          {/* Dispatch Telemetry & Action */}
          <div className="flex flex-wrap items-center gap-3.5 pt-0.5">
            <div className="inline-flex items-center gap-2.5 rounded-full border border-accent/30 bg-accent/5 px-4 py-2">
              <span className="size-2 rounded-full bg-accent animate-pulse" />
              <span className="font-mono text-xs text-accent tracking-wide uppercase font-medium">
                {activeChapter.telemetry}
              </span>
            </div>

            <a
              href="#contact"
              className="inline-flex items-center gap-1.5 font-mono text-xs text-muted transition-colors hover:text-accent"
            >
              <span>INITIATE CONTACT</span>
              <ExternalLink className="size-3.5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
