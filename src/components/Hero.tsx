import { ArrowRight, BadgeCheck, Brain, Layers, Workflow } from "lucide-react";
import { heroContent } from "@/data/content";

const statIcons = [BadgeCheck, Layers, Brain, Workflow] as const;

export function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 pt-20"
    >
      <div aria-hidden className="dot-grid pointer-events-none absolute inset-0 -z-10" />
      <div
        aria-hidden
        className="hero-glow pointer-events-none absolute left-1/2 top-1/2 -z-10 size-[600px] -translate-x-1/2 -translate-y-1/2"
      />

      <div className="flex w-full max-w-[1200px] flex-col items-center text-center">
        <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-line bg-card px-4 py-1.5">
          <span className="relative flex size-2">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-75" />
            <span className="relative inline-flex size-2 rounded-full bg-accent" />
          </span>
          <span className="text-mono uppercase text-accent">
            {heroContent.availabilityBadge}
          </span>
        </div>

        <h1 className="mb-6 max-w-5xl text-hero text-fg">
          I Build Web Apps &{" "}
          <span className="text-accent drop-shadow-[0_0_15px_rgba(var(--color-accent-rgb,229,229,229),0.35)]">
            AI Automations
          </span>
        </h1>

        <p className="mb-12 max-w-2xl text-body-lg text-muted">
          Full Stack Developer specializing in{" "}
          <span className="text-fg">Next.js</span>,{" "}
          <span className="text-fg">Node.js</span>, and{" "}
          <span className="text-fg">n8n</span> workflow automation for
          high-growth technical teams.
        </p>

        <div className="mb-16 flex flex-col items-center gap-4 sm:flex-row">
          <a
            href={heroContent.primaryCta.href}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-accent px-8 py-4 text-lg font-bold text-on-accent transition-all hover:opacity-90 active:scale-95 sm:w-auto"
          >
            {heroContent.primaryCta.label}
            <ArrowRight className="size-5" aria-hidden />
          </a>
          <a
            href={heroContent.secondaryCta.href}
            className="flex w-full items-center justify-center rounded-lg border border-line bg-transparent px-8 py-4 text-lg font-bold text-fg transition-all hover:bg-line/30 active:scale-95 sm:w-auto"
          >
            {heroContent.secondaryCta.label}
          </a>
        </div>

        <ul className="flex w-full max-w-4xl flex-wrap items-center justify-center gap-x-8 gap-y-4 border-t border-line/50 pt-12">
          {heroContent.stats.map((stat, i) => {
            const Icon = statIcons[i] ?? BadgeCheck;
            return (
              <li key={stat} className="flex items-center gap-2">
                <Icon className="size-[18px] text-muted" aria-hidden />
                <span className="text-mono text-muted/80">{stat}</span>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
