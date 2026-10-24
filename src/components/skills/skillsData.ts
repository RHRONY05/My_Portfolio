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
    title: "AI & Automation",
    shape: "oval",
    position: "top-left",
    actionTagline: "Autonomous AI agents, RAG retrieval, n8n workflows & system architecture.",
    tools: [
      { name: "Claude API", icon: "/images/skills/tools/claude.svg" },
      { name: "ChatGPT", icon: "/images/skills/tools/chatgpt.svg" },
      { name: "Antigravity", icon: "/images/skills/tools/antigravity.svg" },
      { name: "n8n", icon: "/images/skills/icons/n8n.svg" },
      { name: "Ollama", icon: "/images/skills/tools/ollama.svg" },
      { name: "Stitch", icon: "/images/skills/tools/stitch.webp" },
    ],
    detailedDescription:
      "Every project begins with deep planning. Rather than jumping blindly into code, I pair program with autonomous AI agents (Claude, Antigravity, ChatGPT) to formulate comprehensive architecture plans, define AGENTS.md rules, create visual UI mockups with Stitch, and map out workflow blueprints.",
    workflowBulletPoints: [
      "Formulate detailed project specifications and architectural contracts (AGENTS.md & context rules)",
      "Generate and iterate high-fidelity UI design mockups using Stitch and AI image tools",
      "Design agentic tool-calling workflows, RAG knowledge retrieval, and n8n automations",
      "Break complex systems into decoupled, testable vertical milestones before implementation",
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
    title: "Tools & Systems",
    shape: "box",
    position: "mid-left",
    actionTagline: "Provisioning isolated Linux workspaces, version control, and containerized runtimes.",
    tools: [
      { name: "Linux (WSL)", icon: "/images/skills/icons/linux.svg" },
      { name: "Docker", icon: "/images/skills/icons/docker.svg" },
      { name: "Git", icon: "/images/skills/icons/git.svg" },
      { name: "GitHub", icon: "/images/skills/icons/github.svg" },
      { name: "Bash", icon: "/images/skills/icons/gnubash.svg" },
      { name: "C++", icon: "/images/skills/icons/cplusplus.svg" },
    ],
    detailedDescription:
      "Once the spec is locked, I establish the foundation. I spin up clean Linux (WSL) workspaces, configure Docker containers for local services, set up Git feature-branching structures, and automate repetitive tasks with custom shell scripts.",
    workflowBulletPoints: [
      "Configure isolated Linux/WSL development environments and shell automation scripts",
      "Containerize local runtime dependencies, databases, and microservices via Docker",
      "Enforce professional Git hygiene with feature branches, descriptive commits, and PR reviews",
      "Build systems and algorithmic problem solving with modern C++ and Unix toolchains",
    ],
    deliverables: [
      "Dockerized Dev Stacks",
      "Linux WSL Workspaces",
      "Automated Shell Tooling",
    ],
  },
  {
    id: "frontend-engineering",
    stepNumber: "03",
    title: "Frontend",
    shape: "box",
    position: "center-left",
    actionTagline: "Building responsive, accessible, tokenized UI with fluid physics and 3D scenes.",
    tools: [
      { name: "React", icon: "/images/skills/icons/react.svg" },
      { name: "Next.js", icon: "/images/skills/icons/nextdotjs.svg" },
      { name: "TypeScript", icon: "/images/skills/icons/typescript.svg" },
      { name: "Tailwind CSS", icon: "/images/skills/icons/tailwindcss.svg" },
      { name: "shadcn/ui", icon: "/images/skills/icons/shadcn.svg" },
      { name: "Framer Motion", icon: "/images/skills/icons/framer.svg" },
    ],
    detailedDescription:
      "Translating blueprints into high-performance web applications. I craft design-system driven user interfaces using Next.js App Router, strict TypeScript, Tailwind utility tokens, accessible shadcn/ui primitives, and GPU-accelerated Framer Motion animations.",
    workflowBulletPoints: [
      "Develop performant, accessible React 19 and Next.js applications with Turbopack builds",
      "Maintain strict zero-hardcoded color/font discipline using centralized semantic tokens",
      "Engineer interactive 3D WebGL scenes with Three.js, React Three Fiber, and LazyViewportMount",
      "Optimize Core Web Vitals to sustain 95+ Desktop / 85+ Mobile Lighthouse scores",
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
    title: "Backend & Data",
    shape: "box",
    position: "center-right",
    actionTagline: "High-throughput API endpoints, relational schemas, caching, and data pipelines.",
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
      "Powering the client with scalable, robust backend services. I design relational and document database schemas, write type-safe Prisma ORM queries, configure high-speed Redis caching, and implement resilient REST and WebSocket endpoints.",
    workflowBulletPoints: [
      "Design normalized PostgreSQL schemas, Prisma migrations, and MongoDB collections",
      "Build modular Express and Next.js Route Handlers with robust input validation and error handling",
      "Implement sub-millisecond Redis key-value caching, rate-limiting, and session management",
      "Integrate Supabase Auth, PostgreSQL Row-Level Security (RLS), and real-time database webhooks",
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
    title: "Testing (Agent-orchestrated)",
    shape: "box",
    position: "mid-right",
    actionTagline: "Automated unit suites, headless browser journeys, and agentic sanity checks.",
    tools: [
      { name: "Vitest", icon: "/images/skills/icons/vitest.svg" },
      { name: "Playwright", icon: "/images/skills/icons/playwright.svg" },
      { name: "Postman", icon: "/images/skills/icons/postman.svg" },
      { name: "Jest", icon: "/images/skills/icons/jest.svg" },
    ],
    detailedDescription:
      "Confidence through continuous verification. Before shipping any feature, I run automated test suites with Vitest, execute headless browser user journeys with Playwright, and test API contracts using Postman to eliminate regressions.",
    workflowBulletPoints: [
      "Write lightning-fast unit and integration test suites using Vitest and Mock Service Worker",
      "Execute automated End-to-End (E2E) browser tests across mobile and desktop with Playwright",
      "Validate REST API response contracts, status codes, and edge-case errors via Postman",
      "Deploy autonomous agent reviewers to audit code quality, accessibility, and types prior to merge",
    ],
    deliverables: [
      "Playwright E2E Suites",
      "Vitest Test Coverage",
      "Postman API Collections",
    ],
  },
  {
    id: "deployment-monitoring",
    stepNumber: "06",
    title: "Deployment",
    shape: "oval",
    position: "top-right",
    actionTagline: "Containerized releases, automated CI/CD pipelines, reverse proxying & telemetry.",
    tools: [
      { name: "Docker", icon: "/images/skills/icons/docker.svg" },
      { name: "VPS (Linux)", icon: "/images/skills/icons/linux.svg" },
      { name: "Nginx", icon: "/images/skills/icons/nginx.svg" },
      { name: "GitHub Actions", icon: "/images/skills/icons/githubactions.svg" },
    ],
    detailedDescription:
      "Delivering production-grade applications to real users. I automate build and test pipelines via GitHub Actions, package applications into multi-stage Docker images, configure Nginx reverse proxies with SSL on Linux VPS servers, and monitor production performance.",
    workflowBulletPoints: [
      "Automate CI/CD pipelines with GitHub Actions for automated linting, testing, and Docker builds",
      "Deploy and manage Linux VPS instances running Nginx reverse proxies with Let's Encrypt SSL",
      "Containerize production workloads with optimized multi-stage Dockerfiles for minimal image size",
      "Monitor real-time server health, error logs, and Core Web Vitals telemetry in production",
    ],
    deliverables: [
      "GitHub Actions CI/CD",
      "Nginx SSL Reverse Proxies",
      "Production VPS Deployments",
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
