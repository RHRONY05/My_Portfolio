import { Terminal } from "lucide-react";
import { SectionLabel } from "@/components/SectionLabel";
import { aboutContent } from "@/data/content";
import { profile } from "@/data/profile";

export function About() {
  return (
    <section
      id="about"
      className="mx-auto max-w-[1200px] px-6 py-24 md:px-12"
    >
      <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
        <ProfileCard />

        <div className="space-y-8">
          <div className="space-y-4">
            <SectionLabel withDot>{aboutContent.label}</SectionLabel>
            <h2 className="text-h1 text-fg">
              {aboutContent.headline.plain}{" "}
              <span className="text-accent">
                {aboutContent.headline.accent}
              </span>
            </h2>
          </div>

          <div className="space-y-6 text-body-lg text-muted">
            {aboutContent.body.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
            <p className="text-muted/80">{aboutContent.education}</p>
          </div>

          <div className="inline-flex items-center gap-3 rounded-lg border border-accent/30 bg-card px-6 py-4">
            <Terminal className="size-5 text-accent" aria-hidden />
            <span className="text-mono uppercase text-accent">
              {aboutContent.callout}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProfileCard() {
  return (
    <div className="group relative">
      <div
        aria-hidden
        className="absolute -inset-1 rounded-xl bg-accent opacity-20 blur transition duration-500 group-hover:opacity-40"
      />
      <div className="relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden rounded-xl border border-line bg-card shadow-2xl">
        {/*
          TODO: Replace with real photo.
          1. Drop image at public/profile.jpg
          2. Swap this block for <Image src="/profile.jpg" alt="Rony" fill className="object-cover" />
        */}
        <div className="flex h-full w-full flex-col items-center justify-center gap-4 bg-[radial-gradient(circle_at_30%_20%,rgba(0,255,148,0.08),transparent_60%)]">
          <span className="text-[200px] font-black leading-none text-accent/30">
            {profile.name[0]}
          </span>
          <span className="text-mono uppercase text-muted">
            Photo placeholder
          </span>
        </div>
      </div>
    </div>
  );
}
