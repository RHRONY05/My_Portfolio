export interface SkillTool {
  name: string;
  icon?: string;
}

export interface SkillRealm {
  id: string;
  side: "left" | "right";
  number: string;
  title: string;
  shortName: string;
  previewTech: string;
  tagline: string;
  summary: string;
  tools: SkillTool[];
  patterns: string[];
}

export const SKILL_REALMS: SkillRealm[] = [
  {
    id: "frontend",
    side: "left",
    number: "01",
    title: "Frontend Architecture",
    shortName: "Frontend",
    previewTech: "Next.js • React • Redux",
    tagline: "UI & INTERACTION",
    summary:
      "Building clean, responsive websites and web applications with React and Next.js, with smooth animations and interactive 3D elements.",
    tools: [
      { name: "Next.js 16 (App Router)", icon: "/images/skills/icons/nextdotjs.svg" },
      { name: "React 19", icon: "/images/skills/icons/react.svg" },
      { name: "TypeScript", icon: "/images/skills/icons/typescript.svg" },
      { name: "Redux Toolkit", icon: "/images/skills/icons/redux.svg" },
      { name: "Tailwind CSS v4", icon: "/images/skills/icons/tailwindcss.svg" },
      { name: "Framer Motion", icon: "/images/skills/icons/framer.svg" },
      { name: "Three.js / React Three Fiber", icon: "/images/skills/icons/threedotjs.svg" },
      { name: "Stitch (UI Design)", icon: "/images/skills/icons/stitch.svg" },
      { name: "Canva (Visuals)", icon: "/images/skills/icons/canva.svg" },
      { name: "Modern CSS / Responsive", icon: "/images/skills/icons/tailwindcss.svg" },
    ],
    patterns: [
      "Component-Based Architecture",
      "State Management with Redux",
      "Smooth Animations & Transitions",
      "Mobile-First Responsive Design",
    ],
  },
  {
    id: "backend",
    side: "left",
    number: "02",
    title: "Backend & Systems",
    shortName: "Backend",
    previewTech: "Node.js • Express • APIs",
    tagline: "APIS & SERVERS",
    summary:
      "Creating fast and secure backend servers and APIs using Node.js and Express, with real-time communication using WebSockets.",
    tools: [
      { name: "Node.js", icon: "/images/skills/icons/nodedotjs.svg" },
      { name: "Express", icon: "/images/skills/icons/express.svg" },
      { name: "REST APIs", icon: "/images/skills/icons/postman.svg" },
      { name: "GraphQL", icon: "/images/skills/icons/graphql.svg" },
      { name: "WebSockets", icon: "/images/skills/icons/nodedotjs.svg" },
      { name: "Server-Sent Events (SSE)", icon: "/images/skills/icons/express.svg" },
    ],
    patterns: [
      "RESTful API Development",
      "User Authentication & Authorization",
      "Real-Time Data Streaming",
      "Clean Error Handling",
    ],
  },
  {
    id: "database",
    side: "left",
    number: "03",
    title: "Database & Storage",
    shortName: "Database",
    previewTech: "PostgreSQL • Redis • Supabase",
    tagline: "DATABASES & CACHING",
    summary:
      "Structuring and managing data in relational databases like PostgreSQL and NoSQL like MongoDB, with Redis for fast caching.",
    tools: [
      { name: "PostgreSQL", icon: "/images/skills/icons/postgresql.svg" },
      { name: "Redis", icon: "/images/skills/icons/redis.svg" },
      { name: "Supabase", icon: "/images/skills/icons/supabase.svg" },
      { name: "Prisma ORM", icon: "/images/skills/icons/prisma.svg" },
      { name: "MongoDB", icon: "/images/skills/icons/mongodb.svg" },
      { name: "Database Indexing", icon: "/images/skills/icons/postgresql.svg" },
      { name: "Connection Pooling", icon: "/images/skills/icons/redis.svg" },
    ],
    patterns: [
      "Relational & NoSQL Data Modeling",
      "Database Caching with Redis",
      "Database Migrations & Prisma ORM",
      "Fast Query Optimization",
    ],
  },
  {
    id: "ai-agents",
    side: "right",
    number: "04",
    title: "Autonomous AI Agents",
    shortName: "AI Automations",
    previewTech: "n8n • Claude • Workflows",
    tagline: "AI & AUTOMATION",
    summary:
      "Automating tasks and connecting AI models like Claude and ChatGPT into real-world business workflows using n8n and LangChain.",
    tools: [
      { name: "n8n Automation", icon: "/images/skills/icons/n8n.svg" },
      { name: "Zapier", icon: "/images/skills/icons/zapier.svg" },
      { name: "Claude API (Anthropic)", icon: "/images/skills/tools/claude.svg" },
      { name: "OpenAI API", icon: "/images/skills/tools/chatgpt.svg" },
      { name: "LangChain", icon: "/images/skills/icons/langchain.svg" },
      { name: "Agent Tool Calling", icon: "/images/skills/tools/antigravity.svg" },
      { name: "Webhook Triaging", icon: "/images/skills/icons/n8n.svg" },
      { name: "Ollama (Local Models)", icon: "/images/skills/tools/ollama.svg" },
    ],
    patterns: [
      "Workflow Automation with n8n",
      "LLM API Integration",
      "AI Function & Tool Calling",
      "Connecting Webhooks & APIs",
    ],
  },
  {
    id: "devops",
    side: "right",
    number: "05",
    title: "DevOps & Cloud Ops",
    shortName: "DevOps & Cloud",
    previewTech: "Docker • Linux • CI/CD",
    tagline: "CLOUD & CI/CD",
    summary:
      "Packaging applications into Docker containers, automating deployment with GitHub Actions, and hosting on cloud platforms like Vercel and AWS.",
    tools: [
      { name: "Docker", icon: "/images/skills/icons/docker.svg" },
      { name: "Linux (WSL) / Bash", icon: "/images/skills/icons/linux.svg" },
      { name: "GitHub Actions (CI/CD)", icon: "/images/skills/icons/githubactions.svg" },
      { name: "Vercel", icon: "/images/skills/icons/vercel.svg" },
      { name: "AWS (EC2 / S3)", icon: "/images/skills/icons/aws.svg" },
      { name: "Nginx", icon: "/images/skills/icons/nginx.svg" },
      { name: "Shell Scripting", icon: "/images/skills/icons/gnubash.svg" },
    ],
    patterns: [
      "Docker Containerization",
      "Automated CI/CD with GitHub Actions",
      "Cloud Hosting & Deployment",
      "Linux Server Management",
    ],
  },
  {
    id: "tooling",
    side: "right",
    number: "06",
    title: "Engineering Tooling",
    shortName: "Tooling & DX",
    previewTech: "Antigravity • Cursor • Git",
    tagline: "DEVELOPER TOOLS & GIT",
    summary:
      "Using modern code editors, Git version control, and AI coding assistants like Cursor and Antigravity to write clean, well-tested code.",
    tools: [
      { name: "Google Antigravity", icon: "/images/skills/tools/antigravity.svg" },
      { name: "Cursor AI", icon: "/images/skills/tools/cursor.svg" },
      { name: "VS Code", icon: "/images/skills/icons/vscode.svg" },
      { name: "Git & GitHub", icon: "/images/skills/icons/git.svg" },
      { name: "Postman", icon: "/images/skills/icons/postman.svg" },
      { name: "Vitest / Jest", icon: "/images/skills/icons/vitest.svg" },
      { name: "Turbopack", icon: "/images/skills/icons/nextdotjs.svg" },
      { name: "C++ (Algorithms & CP)", icon: "/images/skills/icons/cplusplus.svg" },
      { name: "ESLint / Prettier", icon: "/images/skills/icons/eslint.svg" },
      { name: "npm / pnpm", icon: "/images/skills/icons/pnpm.svg" },
    ],
    patterns: [
      "Git Version Control & GitHub",
      "AI-Assisted Development",
      "Unit & Integration Testing",
      "Competitive Programming & Problem Solving",
    ],
  },
];
