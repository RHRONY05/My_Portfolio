export interface FlyingTool {
  name: string;
  icon: string;
  realmId: string;
  side: "left" | "right";
  slot: "top" | "mid" | "bottom";
}

export interface AdaptationScenario {
  id: string;
  step: string;
  category: string;
  problemTitle: string;
  problemDesc: string;
  activeRealmIds: string[];
  toolsUsed: FlyingTool[];
  solutionTitle: string;
  solutionDesc: string;
  metric: string;
}

export const ADAPTATION_SCENARIOS: AdaptationScenario[] = [
  {
    id: "db-exhaustion",
    step: "01/05",
    category: "DATABASE & CONCURRENCY",
    problemTitle: "PostgreSQL Connection Exhaustion",
    problemDesc:
      "Sudden traffic surge exhausts database connection pool. Latency climbs to 4.2s with frequent 500 timeout crashes.",
    activeRealmIds: ["database", "backend"],
    toolsUsed: [
      {
        name: "PostgreSQL",
        icon: "/images/skills/icons/postgresql.svg",
        realmId: "database",
        side: "left",
        slot: "bottom",
      },
      {
        name: "Redis",
        icon: "/images/skills/icons/redis.svg",
        realmId: "database",
        side: "left",
        slot: "bottom",
      },
      {
        name: "Node.js",
        icon: "/images/skills/icons/nodedotjs.svg",
        realmId: "backend",
        side: "left",
        slot: "mid",
      },
    ],
    solutionTitle: "PgBouncer Pooling & Write-Through Cache",
    solutionDesc:
      "Deployed PgBouncer transaction-level connection pooling paired with a sub-10ms Redis write-through cache layer for hot reads.",
    metric: "DB Load -78% • Latency 4.2s → 65ms",
  },
  {
    id: "ai-hallucination",
    step: "02/05",
    category: "AI ORCHESTRATION & AGENTS",
    problemTitle: "LLM Hallucinations & Tool Execution Drops",
    problemDesc:
      "Multi-step agent workflows break when LLM responses violate JSON schema or exceed third-party API rate limits.",
    activeRealmIds: ["ai-agents", "backend"],
    toolsUsed: [
      {
        name: "Claude API",
        icon: "/images/skills/tools/claude.svg",
        realmId: "ai-agents",
        side: "right",
        slot: "top",
      },
      {
        name: "n8n",
        icon: "/images/skills/icons/n8n.svg",
        realmId: "ai-agents",
        side: "right",
        slot: "top",
      },
      {
        name: "Express",
        icon: "/images/skills/icons/express.svg",
        realmId: "backend",
        side: "left",
        slot: "mid",
      },
    ],
    solutionTitle: "Autonomous Retry Supervisor & Schema Validation",
    solutionDesc:
      "Constructed an autonomous triage agent with strict Zod schema validation, fallback model routing, and idempotent queue retries.",
    metric: "Task Success 99.8% • Zero Dropped Webhooks",
  },
  {
    id: "cwv-canvas-lag",
    step: "03/05",
    category: "CORE WEB VITALS & WEBGL",
    problemTitle: "3D Canvas Blocking Main Thread on Load",
    problemDesc:
      "Interactive Three.js canvas bundle blocks hydration and stalls the main thread; mobile Lighthouse performance score tanks to 52.",
    activeRealmIds: ["frontend", "tooling"],
    toolsUsed: [
      {
        name: "Next.js 16",
        icon: "/images/skills/icons/nextdotjs.svg",
        realmId: "frontend",
        side: "left",
        slot: "top",
      },
      {
        name: "Three.js",
        icon: "/images/skills/icons/threedotjs.svg",
        realmId: "frontend",
        side: "left",
        slot: "top",
      },
      {
        name: "Tailwind CSS",
        icon: "/images/skills/icons/tailwindcss.svg",
        realmId: "frontend",
        side: "left",
        slot: "top",
      },
    ],
    solutionTitle: "Lazy Viewport Mounting & Context Deduplication",
    solutionDesc:
      "Implemented render-function LazyViewportMount, single-context WebGL deduplication, and hardware-accelerated GPU styling.",
    metric: "Lighthouse 52 → 99 Desktop / 88 Mobile",
  },
  {
    id: "slow-ci-cd",
    step: "04/05",
    category: "DEVOPS & RELEASE VELOCITY",
    problemTitle: "18-Minute Monolithic CI/CD Pipeline",
    problemDesc:
      "Un-cached Docker builds and serial test matrices create a 18-minute deployment bottleneck, delaying hotfixes and releases.",
    activeRealmIds: ["devops", "tooling"],
    toolsUsed: [
      {
        name: "Docker",
        icon: "/images/skills/icons/docker.svg",
        realmId: "devops",
        side: "right",
        slot: "mid",
      },
      {
        name: "GitHub Actions",
        icon: "/images/skills/icons/githubactions.svg",
        realmId: "devops",
        side: "right",
        slot: "mid",
      },
      {
        name: "Linux / Bash",
        icon: "/images/skills/icons/linux.svg",
        realmId: "devops",
        side: "right",
        slot: "mid",
      },
    ],
    solutionTitle: "Layer Caching & Matrix Parallelization",
    solutionDesc:
      "Refactored Docker multi-stage build caching, parallelized test matrices with Vitest, and configured automated instant preview rollouts.",
    metric: "Build Time 18m → 2.8m (-84%)",
  },
  {
    id: "realtime-desync",
    step: "05/05",
    category: "REAL-TIME SYSTEMS & WEBSOCKETS",
    problemTitle: "Multi-Client Real-Time State Desync",
    problemDesc:
      "Collaborative dashboard experiences silent WebSocket drops and client state drift under unstable network conditions.",
    activeRealmIds: ["frontend", "backend", "database"],
    toolsUsed: [
      {
        name: "React 19",
        icon: "/images/skills/icons/react.svg",
        realmId: "frontend",
        side: "left",
        slot: "top",
      },
      {
        name: "Node.js",
        icon: "/images/skills/icons/nodedotjs.svg",
        realmId: "backend",
        side: "left",
        slot: "mid",
      },
      {
        name: "Supabase",
        icon: "/images/skills/icons/supabase.svg",
        realmId: "database",
        side: "left",
        slot: "bottom",
      },
    ],
    solutionTitle: "SSE Stream Reconciliation & Optimistic Rollbacks",
    solutionDesc:
      "Architected SSE stream channels with optimistic client-side UI rollbacks and automated heartbeat reconnect handlers.",
    metric: "State Drift 0% • Reconnection <200ms",
  },
];
