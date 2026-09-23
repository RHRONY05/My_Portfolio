export interface SkillRealm {
  id: string;
  side: "left" | "right";
  number: string;
  title: string;
  shortName: string;
  previewTech: string;
  tagline: string;
  summary: string;
  tools: string[];
  patterns: string[];
}

export const SKILL_REALMS: SkillRealm[] = [
  {
    id: "frontend",
    side: "left",
    number: "01",
    title: "Frontend Architecture",
    shortName: "Frontend",
    previewTech: "Next.js • React • TS",
    tagline: "UI & INTERACTION",
    summary:
      "High-performance interfaces, 60-FPS animation physics, and tactile 3D experiences with clean component architecture.",
    tools: [
      "Next.js 16 (App Router)",
      "React 19",
      "TypeScript",
      "Tailwind CSS v4",
      "Framer Motion",
      "Three.js / React Three Fiber",
      "Drei",
      "HTML5 / Modern CSS",
    ],
    patterns: ["Server Actions", "Turbopack Bundling", "Mobile Safe Viewports", "GPU translate3d"],
  },
  {
    id: "backend",
    side: "left",
    number: "02",
    title: "Backend & Systems",
    shortName: "Backend",
    previewTech: "Node.js • Express • APIs",
    tagline: "APIS & RUNTIMES",
    summary:
      "Scalable server architectures, resilient API routing, asynchronous event loops, and robust microservices.",
    tools: [
      "Node.js",
      "Express",
      "Fastify",
      "Python",
      "REST APIs",
      "GraphQL",
      "WebSockets",
      "Server-Sent Events",
    ],
    patterns: ["Event-Driven Architecture", "JWT / OAuth Auth", "Rate Limiting", "Structured Logging"],
  },
  {
    id: "database",
    side: "left",
    number: "03",
    title: "Database & Storage",
    shortName: "Database",
    previewTech: "PostgreSQL • Redis • Supabase",
    tagline: "PERSISTENCE & CACHE",
    summary:
      "Relational data modeling, distributed caching, real-time sync, and optimized query execution.",
    tools: [
      "PostgreSQL",
      "Redis",
      "Supabase",
      "Prisma ORM",
      "MongoDB",
      "Database Indexing",
      "Connection Pooling",
    ],
    patterns: ["ACID Transactions", "Redis Pub/Sub & Caching", "Schema Migrations", "Row-Level Security"],
  },
  {
    id: "ai-agents",
    side: "right",
    number: "04",
    title: "Autonomous AI Agents",
    shortName: "AI Automations",
    previewTech: "n8n • Claude • Workflows",
    tagline: "AI & ORCHESTRATION",
    summary:
      "Self-orchestrating multi-agent systems, deterministic workflow automation, and custom LLM tool-calling pipelines.",
    tools: [
      "n8n Automation",
      "Zapier",
      "Claude API (Anthropic)",
      "OpenAI API",
      "LangChain",
      "Agent Tool Calling",
      "Webhook Triaging",
    ],
    patterns: ["Autonomous Error Self-Healing", "Prompt Engineering", "Stateful Multi-Agent Loops", "RAG"],
  },
  {
    id: "devops",
    side: "right",
    number: "05",
    title: "DevOps & Cloud Ops",
    shortName: "DevOps & Cloud",
    previewTech: "Docker • Linux • CI/CD",
    tagline: "INFRASTRUCTURE & CI/CD",
    summary:
      "Containerized production runtimes, automated continuous deployment, and resilient zero-downtime shipping.",
    tools: [
      "Docker",
      "Linux / Bash",
      "GitHub Actions (CI/CD)",
      "Vercel",
      "AWS (EC2 / S3)",
      "Nginx",
      "SSL / DNS",
    ],
    patterns: ["Multi-Stage Docker Builds", "Automated Lint & Test Gates", "Edge Caching", "Zero-Downtime Rollouts"],
  },
  {
    id: "tooling",
    side: "right",
    number: "06",
    title: "Engineering Tooling",
    shortName: "Tooling & DX",
    previewTech: "Git • Cursor • Turbopack",
    tagline: "WORKFLOW & RELIABILITY",
    summary:
      "Modern developer ergonomics, rigorous automated testing, git workflows, and high-velocity coding environments.",
    tools: [
      "Git & GitHub",
      "Cursor AI",
      "Postman",
      "Vitest / Jest",
      "Turbopack",
      "ESLint / Prettier",
      "npm / pnpm",
    ],
    patterns: ["Git Feature Branching", "Test-Driven Reliability", "Semantic Versioning", "Static Analysis"],
  },
];
