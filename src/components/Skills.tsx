import { Bot, Database, Layers, Terminal, type LucideIcon } from "lucide-react";
import { SectionLabel } from "@/components/SectionLabel";
import { skillsContent } from "@/data/content";
import { skillCategories } from "@/data/skills";

const categoryIcons: Record<string, LucideIcon> = {
  Frontend: Layers,
  "Backend & Databases": Database,
  "AI & Automation": Bot,
  DevOps: Terminal,
};

export function Skills() {
  return (
    <section
      id="skills"
      className="mx-auto max-w-[1200px] px-6 py-24 md:px-12"
    >
      <div className="mb-16 space-y-4 text-center">
        <SectionLabel>{skillsContent.label}</SectionLabel>
        <h2 className="text-h1 text-fg">{skillsContent.headline}</h2>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {skillCategories.map((category, i) => {
          const Icon = categoryIcons[category.name] ?? Layers;
          const num = String(i + 1).padStart(2, "0");
          return (
            <article
              key={category.name}
              className="glass-card group rounded-xl p-8"
            >
              <header className="mb-6 flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="flex size-12 shrink-0 items-center justify-center rounded-lg border border-line bg-canvas text-accent transition-colors group-hover:bg-accent group-hover:text-on-accent">
                    <Icon className="size-5" aria-hidden />
                  </div>
                  <h3 className="text-h2 text-fg">{category.name}</h3>
                </div>
                <span className="shrink-0 text-caption uppercase tracking-widest text-muted">
                  {num} / {category.name.split(" ")[0]}
                </span>
              </header>

              <ul className="flex flex-wrap gap-2">
                {category.items.map((item) => (
                  <li
                    key={item}
                    className="rounded border border-accent/40 bg-canvas px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-accent"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          );
        })}
      </div>
    </section>
  );
}
