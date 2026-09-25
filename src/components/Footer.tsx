"use client";

import { ArrowUp, Mail } from "lucide-react";
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
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="w-full border-t border-line bg-canvas px-4 sm:px-6 md:px-8 py-6 transition-colors duration-500">
      <div className="mx-auto flex max-w-[1360px] flex-col items-center gap-4 md:grid md:grid-cols-3 md:items-center">
        {/* Left: Brand Identity & Tagline */}
        <div className="flex flex-col items-center gap-0.5 text-center md:items-start md:text-left">
          <span className="text-mono font-black tracking-tight text-fg text-base">
            {footerContent.brand}
          </span>
          <p className="text-caption text-muted">{footerContent.tagline}</p>
        </div>

        {/* Center: Copyright & Precision Signature */}
        <div className="text-center text-caption tracking-wider text-muted">
          {footerContent.copyright}
        </div>

        {/* Right: Social Links & Back to Top */}
        <div className="flex items-center justify-center gap-3 md:justify-end">
          {footerContent.socials.map((key) => {
            const Icon = socialIcons[key];
            const href = socialHref(key);
            const isMail = key === "EMAIL";
            const isLive = Boolean(href);
            const className =
              "text-muted transition-colors hover:text-accent p-1.5 rounded-lg hover:bg-card/50 transition-all";

            if (!Icon) return null;

            if (!isLive) {
              return (
                <span
                  key={key}
                  aria-label={key.toLowerCase()}
                  title={`${key} (Coming soon)`}
                  className={`${className} opacity-50`}
                >
                  <Icon className="size-4" />
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
                title={key}
                className={className}
              >
                <Icon className="size-4" />
              </a>
            );
          })}

          <button
            onClick={scrollToTop}
            aria-label="Back to top"
            title="Back to top"
            className="group ml-1 flex size-8 items-center justify-center rounded-lg border border-line bg-card/60 text-muted transition-all hover:border-accent hover:text-accent active:scale-95"
          >
            <ArrowUp className="size-3.5 transition-transform duration-200 group-hover:-translate-y-0.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
