export const heroContent = {
  availabilityBadge: "Available for freelance work",
  headline: "I Build Web Apps & AI Automations",
  subheadline:
    "Full Stack Developer specializing in Next.js, Node.js, and n8n workflow automation",
  primaryCta: { label: "View My Work", href: "#projects" },
  secondaryCta: { label: "Contact Me", href: "#contact" },
  stats: [
    "6+ Projects Delivered",
    "MERN Stack",
    "AI Automation",
    "n8n Expert",
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
  brand: "RONY.DEV",
  tagline: "Building the web, one workflow at a time.",
  navLinks: [
    { label: "About", href: "#about" },
    { label: "Skills", href: "#skills" },
    { label: "Projects", href: "#projects" },
    { label: "Contact", href: "#contact" },
  ],
  socials: ["GITHUB", "LINKEDIN", "TWITTER", "EMAIL"],
  copyright: "© 2025 RONY. BUILT WITH PRECISION.",
} as const;
