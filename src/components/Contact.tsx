"use client";

import { ArrowRight, Mail } from "lucide-react";
import { type ComponentType, type FormEvent, useState } from "react";
import { GithubIcon, LinkedinIcon } from "@/components/BrandIcons";
import { contactContent } from "@/data/content";
import { profile } from "@/data/profile";

export function Contact() {
  return (
    <section
      id="contact"
      className="relative mx-auto w-full max-w-[1360px] px-4 sm:px-6 md:px-8 py-16 sm:py-20 lg:py-24 scroll-mt-0"
    >
      <div className="flex w-full flex-col gap-8 lg:flex-row lg:gap-12 xl:gap-16 lg:items-start">
        <ContactIntro />
        <ContactForm />
      </div>
    </section>
  );
}

function ContactIntro() {
  return (
    <div className="flex w-full flex-col gap-6 lg:w-2/5">
      <div className="space-y-4">
        <h2 className="text-h1 text-fg">{contactContent.headline}</h2>
        <p className="text-body-lg text-muted">{contactContent.subtext}</p>
      </div>

      <div className="mt-4 flex flex-col gap-3">
        <ContactCard
          icon={GithubIcon}
          label="GitHub"
          href={profile.links.github}
          fallback="github.com/—"
        />
        <ContactCard
          icon={LinkedinIcon}
          label="LinkedIn"
          href={profile.links.linkedin}
          fallback="linkedin.com/in/—"
        />
        <ContactCard
          icon={MailIcon}
          label="Email"
          href={`mailto:${profile.email}`}
          preview={profile.email}
        />
      </div>
    </div>
  );
}

type IconComponent = ComponentType<{ className?: string; "aria-hidden"?: boolean }>;

const MailIcon: IconComponent = ({ className }) => (
  <Mail className={className} aria-hidden />
);

type ContactCardProps = {
  icon: IconComponent;
  label: string;
  href: string;
  preview?: string;
  fallback?: string;
};

function ContactCard({
  icon: Icon,
  label,
  href,
  preview,
  fallback,
}: ContactCardProps) {
  const isLive = Boolean(href) && !href.endsWith("//");
  const display =
    preview ?? (href ? href.replace(/^https?:\/\//, "") : (fallback ?? ""));

  const className =
    "group flex w-full items-center gap-4 rounded-lg border border-line bg-card p-4 transition-colors hover:border-accent";

  const inner = (
    <>
      <Icon className="size-5 shrink-0 text-muted transition-colors group-hover:text-accent" />
      <div className="flex flex-col">
        <span className="text-mono text-fg">{label}</span>
        <span className="text-caption text-muted">{display}</span>
      </div>
    </>
  );

  if (!isLive) {
    return <div className={`${className} opacity-70`}>{inner}</div>;
  }

  return (
    <a
      href={href}
      target={href.startsWith("mailto:") ? undefined : "_blank"}
      rel={href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
      className={className}
    >
      {inner}
    </a>
  );
}

function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [projectType, setProjectType] = useState<string>(
    contactContent.projectTypes[0]
  );
  const [message, setMessage] = useState("");

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const subject = `Project inquiry: ${projectType}`;
    const body = [
      `Hi Rony,`,
      ``,
      `Name: ${name}`,
      `Email: ${email}`,
      `Project type: ${projectType}`,
      ``,
      message,
    ].join("\n");

    window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }

  return (
    <div className="w-full lg:w-3/5">
      <div className="glow-border relative w-full overflow-hidden rounded-xl bg-card p-6 sm:p-8">
        <div
          aria-hidden
          className="absolute inset-0 -z-10 opacity-30 [background-image:radial-gradient(rgba(48,54,61,0.4)_1px,transparent_1px)] [background-size:16px_16px]"
        />
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Field id="name" label="Name">
              <input
                id="name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                className={inputClass}
              />
            </Field>
            <Field id="email" label="Email">
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className={inputClass}
              />
            </Field>
          </div>

          <Field id="project-type" label="Project type">
            <select
              id="project-type"
              value={projectType}
              onChange={(e) => setProjectType(e.target.value)}
              className={`${inputClass} appearance-none`}
            >
              {contactContent.projectTypes.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </Field>

          <Field id="message" label="Message">
            <textarea
              id="message"
              rows={5}
              required
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Tell me about your project..."
              className={`${inputClass} resize-none`}
            />
          </Field>

          <button
            type="submit"
            className="mt-2 flex w-full items-center justify-center gap-2 rounded-lg bg-accent py-4 text-mono text-on-accent transition-opacity hover:opacity-90 active:scale-[0.99]"
          >
            {contactContent.submitLabel.replace(/→\s*$/, "").trim()}
            <ArrowRight className="size-4" aria-hidden />
          </button>
        </form>
      </div>
    </div>
  );
}

const inputClass =
  "rounded-lg border border-line bg-canvas p-3 text-body text-fg outline-none transition-colors placeholder:text-muted/60 focus:border-accent focus:ring-1 focus:ring-accent";

function Field({
  id,
  label,
  children,
}: {
  id: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-mono uppercase text-muted">
        {label}
      </label>
      {children}
    </div>
  );
}
