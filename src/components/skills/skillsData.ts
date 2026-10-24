export interface SkillTool {
  name: string;
  icon: string;
}

export interface SkillLifecycleStep {
  id: string;
  stepNumber: string;
  title: string;
  shape: "oval" | "box";
  position: "top-left" | "mid-left" | "center-left" | "center-right" | "mid-right" | "top-right";
  actionTagline: string;
  tools: SkillTool[];
  detailedDescription: string;
  workflowBulletPoints: string[];
  deliverables: string[];
}

export const SKILL_STEPS: SkillLifecycleStep[] = [
  {
    id: "ai-planning",
    stepNumber: "01",
    title: "AI Planning & Architecture",
    shape: "oval",
    position: "top-left",
    actionTagline: "Specification drafting, system architecture, and Stitch design mockups.",
    tools: [
      { name: "Claude API", icon: "/images/skills/tools/claude.svg" },
      { name: "ChatGPT", icon: "/images/skills/tools/chatgpt.svg" },
      { name: "Antigravity", icon: "/images/skills/tools/antigravity.svg" },
      { name: "Notion", icon: "/images/skills/icons/notion.webp" },
      { name: "Stitch", icon: "/images/skills/tools/stitch.webp" },
    ],
    detailedDescription:
      "Every project begins with deep planning. Rather than jumping blindly into code, I pair program with AI agents to define specs, design system rules, and UI mockups.",
    workflowBulletPoints: [
      "Drafting project specifications, user flows, and architecture with AI agents",
      "Structuring architectural contracts and autonomous instructions (AGENTS.md)",
      "Prototyping high-fidelity UI mockups and design systems using Stitch and Notion",
      "Dividing complex requirements into decoupled, testable vertical milestones",
    ],
    deliverables: [
      "Architecture Blueprints",
      "AGENTS.md System Contracts",
      "Stitch UI Mockups",
    ],
  },
  {
    id: "tools-environment",
    stepNumber: "02",
    title: "Dev Environment & Tooling",
    shape: "box",
    position: "mid-left",
    actionTagline: "Multiagent workspaces, Markdown documentation, and containerized dev stacks.",
    tools: [
      { name: "Docker", icon: "/images/skills/icons/docker.svg" },
      { name: "Git", icon: "/images/skills/icons/git.svg" },
      { name: "GitHub", icon: "/images/skills/icons/github.svg" },
      { name: "Multiagent Orchestration", icon: "/images/skills/icons/multiagent.svg" },
      { name: "Markdown Specs", icon: "/images/skills/icons/markdown.svg" },
    ],
    detailedDescription:
      "Establishing the development foundation with isolated workspaces, containerized local services, and strict version control hygiene.",
    workflowBulletPoints: [
      "Configuring isolated multiagent workspaces and automated dev scripts",
      "Structuring living technical documentation, guidelines, and schemas in Markdown",
      "Enforcing professional Git hygiene with feature branches and pull request reviews",
      "Containerizing local runtime dependencies and services using Docker",
    ],
    deliverables: [
      "Multiagent Workspaces",
      "Markdown Specification Docs",
      "Dockerized Dev Stacks",
    ],
  },
  {
    id: "frontend-engineering",
    stepNumber: "03",
    title: "Frontend Engineering",
    shape: "box",
    position: "center-left",
    actionTagline: "Building responsive, accessible, tokenized UI with fluid physics and 3D scenes.",
    tools: [
      { name: "Next.js", icon: "/images/skills/icons/nextdotjs.svg" },
      { name: "React", icon: "/images/skills/icons/react.svg" },
      { name: "TypeScript", icon: "/images/skills/icons/typescript.svg" },
      { name: "Tailwind CSS", icon: "/images/skills/icons/tailwindcss.svg" },
      { name: "shadcn/ui", icon: "/images/skills/icons/shadcn.svg" },
      { name: "Framer Motion", icon: "/images/skills/icons/framer.svg" },
    ],
    detailedDescription:
      "Crafting performant, accessible web interfaces with Next.js App Router, strict TypeScript, and centralized design tokens.",
    workflowBulletPoints: [
      "Developing performant, responsive web apps using Next.js App Router and React",
      "Maintaining strict zero-hardcoded styling discipline using semantic CSS tokens",
      "Engineering interactive 3D WebGL canvas rigs with Three.js and React Three Fiber",
      "Optimizing Core Web Vitals to sustain high Lighthouse scores across devices",
    ],
    deliverables: [
      "Design-System Components",
      "3D WebGL Canvas Rigs",
      "Zero-Shift Mobile Views",
    ],
  },
  {
    id: "backend-data",
    stepNumber: "04",
    title: "Backend & Data Layer",
    shape: "box",
    position: "center-right",
    actionTagline: "Scalable API endpoints, relational schemas, caching, and data pipelines.",
    tools: [
      { name: "Node.js", icon: "/images/skills/icons/nodedotjs.svg" },
      { name: "Express", icon: "/images/skills/icons/express.svg" },
      { name: "PostgreSQL", icon: "/images/skills/icons/postgresql.svg" },
      { name: "MongoDB", icon: "/images/skills/icons/mongodb.svg" },
      { name: "Prisma", icon: "/images/skills/icons/prisma.svg" },
      { name: "Redis", icon: "/images/skills/icons/redis.svg" },
      { name: "Supabase", icon: "/images/skills/icons/supabase.svg" },
    ],
    detailedDescription:
      "Powering the application with resilient backend APIs, normalized databases, caching, and secure authentication.",
    workflowBulletPoints: [
      "Designing modular REST and WebSocket API endpoints in Node.js and Express",
      "Architecting normalized PostgreSQL schemas and document collections in MongoDB",
      "Implementing sub-millisecond Redis key-value caching, rate limiting, and sessions",
      "Managing database migrations, row-level security (RLS), and webhooks with Supabase",
    ],
    deliverables: [
      "Type-Safe API Contracts",
      "Normalized SQL Schemas",
      "Redis Cache Layers",
    ],
  },
  {
    id: "testing-validation",
    stepNumber: "05",
    title: "Testing & Verification",
    shape: "box",
    position: "mid-right",
    actionTagline: "Automated unit suites, User Acceptance Testing (UAT), and contract checks.",
    tools: [
      { name: "Vitest", icon: "/images/skills/icons/vitest.svg" },
      { name: "Playwright", icon: "/images/skills/icons/playwright.svg" },
      { name: "User Acceptance Testing", icon: "/images/skills/icons/uat.svg" },
      { name: "Postman", icon: "/images/skills/icons/postman.svg" },
      { name: "Jest", icon: "/images/skills/icons/jest.svg" },
    ],
    detailedDescription:
      "Verifying quality and preventing regressions through automated test suites and hands-on acceptance testing before release.",
    workflowBulletPoints: [
      "Writing fast unit and component integration test suites using Vitest and Jest",
      "Executing automated End-to-End (E2E) browser journeys with Playwright",
      "Conducting User Acceptance Testing (UAT) to verify real-world flows and accessibility",
      "Validating API response contracts, status codes, and payloads via Postman",
    ],
    deliverables: [
      "Playwright E2E Suites",
      "UAT Verification Checklists",
      "Postman API Collections",
    ],
  },
  {
    id: "deployment-monitoring",
    stepNumber: "06",
    title: "Deployment & Cloud",
    shape: "oval",
    position: "top-right",
    actionTagline: "Modern cloud hosting, CI/CD pipelines, reverse proxying, and production telemetry.",
    tools: [
      { name: "Vercel", icon: "/images/skills/icons/vercel.webp" },
      { name: "Netlify", icon: "/images/skills/icons/netlify.webp" },
      { name: "Render", icon: "/images/skills/icons/render.webp" },
      { name: "VPS (Linux)", icon: "/images/skills/icons/linux.svg" },
      { name: "Nginx", icon: "/images/skills/icons/nginx.svg" },
      { name: "GitHub Actions", icon: "/images/skills/icons/githubactions.svg" },
    ],
    detailedDescription:
      "Releasing production-ready builds to modern cloud platforms and Linux VPS servers with automated CI/CD pipelines.",
    workflowBulletPoints: [
      "Deploying web applications to cloud platforms including Vercel, Netlify, and Render",
      "Configuring Linux VPS instances with Nginx reverse proxies and SSL certificates",
      "Automating linting, testing, and deployment pipelines using GitHub Actions CI/CD",
      "Monitoring live application uptime, error logs, and Core Web Vitals telemetry",
    ],
    deliverables: [
      "GitHub Actions CI/CD",
      "Nginx SSL Reverse Proxies",
      "Production Cloud Deployments",
    ],
  },
];

// --------------------------------------------------------------------------
// BACKWARD-COMPATIBILITY EXPORTS FOR LEGACY IMPORTS
// --------------------------------------------------------------------------
export interface SkillPillar {
  id: string;
  side: "left" | "right";
  title: string;
  tools: SkillTool[];
  produces: string[];
}

export const SKILL_PILLARS: SkillPillar[] = [
  {
    id: "strategy-architecture",
    side: "left",
    title: "Strategy & Architecture",
    tools: [
      { name: "Next.js 16", icon: "/images/skills/icons/nextdotjs.svg" },
      { name: "React 19", icon: "/images/skills/icons/react.svg" },
      { name: "TypeScript", icon: "/images/skills/icons/typescript.svg" },
      { name: "Tailwind CSS", icon: "/images/skills/icons/tailwindcss.svg" },
      { name: "Stitch", icon: "/images/skills/tools/stitch.webp" },
    ],
    produces: [
      "Component Design Systems",
      "Interactive 3D UI",
      "Responsive Client Apps",
    ],
  },
  {
    id: "backend-systems",
    side: "left",
    title: "Backend & Systems",
    tools: [
      { name: "Node.js", icon: "/images/skills/icons/nodedotjs.svg" },
      { name: "Express", icon: "/images/skills/icons/express.svg" },
      { name: "PostgreSQL", icon: "/images/skills/icons/postgresql.svg" },
      { name: "Redis", icon: "/images/skills/icons/redis.svg" },
      { name: "REST APIs", icon: "/images/skills/icons/postman.svg" },
    ],
    produces: [
      "REST & GraphQL APIs",
      "Real-Time WebSockets",
      "Atomic Data Mutations",
    ],
  },
  {
    id: "autonomous-ai-agents",
    side: "right",
    title: "Autonomous AI & Agents",
    tools: [
      { name: "Claude API", icon: "/images/skills/tools/claude.svg" },
      { name: "Antigravity", icon: "/images/skills/tools/antigravity.svg" },
      { name: "Muse Agent", icon: "/images/skills/tools/muse.webp" },
      { name: "n8n", icon: "/images/skills/icons/n8n.svg" },
      { name: "LangChain", icon: "/images/skills/icons/langchain.svg" },
    ],
    produces: [
      "Agent Tool-Calling Loops",
      "Semantic Vector RAG",
      "Automated Workflows",
    ],
  },
  {
    id: "cloud-devops-dx",
    side: "right",
    title: "Cloud, DevOps & DX",
    tools: [
      { name: "Docker", icon: "/images/skills/icons/docker.svg" },
      { name: "GitHub Actions", icon: "/images/skills/icons/githubactions.svg" },
      { name: "Linux", icon: "/images/skills/icons/linux.svg" },
      { name: "Excalidraw", icon: "/images/skills/tools/excalidraw.webp" },
      { name: "Vercel", icon: "/images/skills/icons/vercel.svg" },
    ],
    produces: [
      "Containerized Deployments",
      "CI/CD Automation",
      "Production Infrastructure",
    ],
  },
];

export const SKILL_REALMS = SKILL_PILLARS;
export type SkillRealm = SkillPillar;
