import Link from "next/link";
import { profile } from "@/data/profile";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
] as const;

export function Navbar() {
  return (
    <header className="fixed top-0 inset-x-0 z-50 border-b border-line bg-canvas/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-[1440px] items-center justify-between px-6 py-4 md:px-12">
        <Link
          href="#top"
          className="font-mono text-xl font-black tracking-tighter text-accent"
          aria-label={`${profile.brand} home`}
        >
          {profile.brand}
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-md px-3 py-1 text-sm font-medium text-muted transition-colors hover:bg-line/30 hover:text-accent"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/theme-showcase"
            className="rounded-lg border border-line bg-card px-4 py-2 text-xs font-mono font-semibold text-fg transition-all hover:border-accent hover:text-accent"
          >
            🎨 Theme & Fonts
          </Link>
          <a
            href="#contact"
            className="rounded-lg bg-accent px-6 py-2 text-sm font-semibold text-on-accent transition-all hover:opacity-90 active:scale-95"
          >
            Hire Me
          </a>
        </div>
      </div>
    </header>
  );
}
