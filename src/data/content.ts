export const heroContent = {
  availabilityBadge: "Open to High-Impact Opportunities",
  headline: "Software Engineer in the Making — Full-Stack & AI",
  subheadline:
    "CSE undergraduate focused on building production-ready web applications and autonomous systems. Experienced in full-stack architecture, agentic workflows, and LLM integrations, with an expanding focus on AI/ML engineering.",
  primaryCta: { label: "Explore Work", href: "#projects" },
  secondaryCta: { label: "Let's Connect", href: "#contact" },
  stats: [
    "Full-Stack Web Systems",
    "Next.js & TypeScript",
    "Autonomous Agents (n8n)",
    "CUET CSE",
  ],
} as const;

export const aboutContent = {
  label: "About Me",
  headline: { plain: "A Developer Who Solves", accent: "Real Problems" },
  body: [
    "I am a Full Stack Developer and Automation Consultant with a strong foundation in algorithmic problem-solving and scalable system design. Currently in my third year studying Computer Science and Engineering at CUET, Bangladesh.",
    "My professional work is centered around building robust web applications using the MERN stack and Next.js, alongside architecting complex AI integrations and n8n automation workflows for clients. I am driven by the challenge of optimizing workflows and deploying intelligent solutions.",
  ],
  callout: "Currently open to remote freelance projects",
  education:
    "Currently pursuing BSc in Computer Science & Engineering at CUET, Bangladesh",
} as const;

export const skillsContent = {
  label: "Technical Arsenal",
  headline: "Skills & Technologies",
} as const;

export const projectsContent = {
  label: "Featured Projects",
} as const;

export const contactContent = {
  headline: "Let's Build Something Great Together",
  subtext:
    "Available for freelance projects — whether you need a web app, automation workflow, or custom AI agent, I'll get it done.",
  formFields: ["Name", "Email", "Project Type", "Message"],
  projectTypes: [
    "Web Application",
    "AI Automation Workflow",
    "Custom AI Agent / RAG",
    "Other",
  ],
  submitLabel: "Send Message →",
} as const;

export const footerContent = {
  brand: "RH.RONY",
  tagline: "Building the web, one workflow at a time.",
  navLinks: [
    { label: "About", href: "#about" },
    { label: "Skills", href: "#skills" },
    { label: "Projects", href: "#projects" },
    { label: "Contact", href: "#contact" },
  ],
  socials: ["GITHUB", "LINKEDIN", "TWITTER", "EMAIL"],
  copyright: "© 2026 RONY. BUILT WITH PRECISION.",
} as const;
