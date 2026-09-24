import { Mail } from "lucide-react";
import type { ComponentType } from "react";
import {
  GithubIcon,
  LinkedinIcon,
  TwitterIcon,
} from "@/components/BrandIcons";
import { footerContent } from "@/data/content";
import { profile } from "@/data/profile";

type IconComponent = ComponentType<{ className?: string; "aria-hidden"?: boolean }>;

const MailIcon: IconComponent = ({ className }) => (
  <Mail className={className} aria-hidden />
);

const socialIcons: Record<string, IconComponent> = {
  GITHUB: GithubIcon,
  LINKEDIN: LinkedinIcon,
  TWITTER: TwitterIcon,
  EMAIL: MailIcon,
};

const socialHref = (key: string) => {
  switch (key) {
    case "GITHUB":
      return profile.links.github;
    case "LINKEDIN":
      return profile.links.linkedin;
    case "TWITTER":
      return profile.links.twitter;
    case "EMAIL":
      return `mailto:${profile.email}`;
    default:
      return "";
  }
};

export function Footer() {
  return (
    <footer className="w-full border-t border-line bg-canvas px-6 py-12 transition-colors duration-500">
      <div className="mx-auto grid max-w-[1200px] grid-cols-1 items-center gap-8 md:grid-cols-3">
        <div className="flex flex-col gap-2 text-center md:items-start md:text-left">
          <span className="text-mono font-black text-fg">
            {footerContent.brand}
          </span>
          <p className="text-caption text-muted">{footerContent.tagline}</p>
        </div>

        <nav className="flex justify-center gap-6">
          {footerContent.navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-mono uppercase text-muted transition-colors hover:text-accent"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex justify-center gap-6 md:justify-end">
          {footerContent.socials.map((key) => {
            const Icon = socialIcons[key];
            const href = socialHref(key);
            const isMail = key === "EMAIL";
            const isLive = Boolean(href);
            const className =
              "text-muted transition-colors hover:text-accent";

            if (!Icon) return null;

            if (!isLive) {
              return (
                <span
                  key={key}
                  aria-label={key.toLowerCase()}
                  className={`${className} opacity-50`}
                >
                  <Icon className="size-5" />
                </span>
              );
            }

            return (
              <a
                key={key}
                href={href}
                target={isMail ? undefined : "_blank"}
                rel={isMail ? undefined : "noopener noreferrer"}
                aria-label={key.toLowerCase()}
                className={className}
              >
                <Icon className="size-5" />
              </a>
            );
          })}
        </div>
      </div>

      <div className="mx-auto mt-12 max-w-[1200px] border-t border-line/30 pt-8 text-center">
        <p className="text-caption uppercase tracking-widest text-muted">
          {footerContent.copyright}
        </p>
      </div>
    </footer>
  );
}
