export interface SkillTool {
  name: string;
  icon: string;
}

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

// Backward-compatibility export
export const SKILL_REALMS = SKILL_PILLARS;
export type SkillRealm = SkillPillar;
