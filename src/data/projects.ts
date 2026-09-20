export type ProjectCategory = "Full Stack" | "Automation" | "AI/RAG";

export type Project = {
  id: string;
  title: string;
  category: ProjectCategory;
  description: string;
  features: readonly string[];
  stack: readonly string[];
  github?: string;
  live?: string;
};

export const projects: readonly Project[] = [
  {
    id: "sabaihealth",
    title: "SabaiHealth Platform & Custom AI Agent",
    category: "Full Stack",
    description:
      "Maintained and expanded a comprehensive health platform featuring deep business logic and internationalization (Thai and English). Developed 'Sabai', a dedicated custom AI agent engineered to execute specific platform operations.",
    features: [
      "Multi-language LINE campaign automation workflows using n8n",
      "Secure NDA e-signature functionality for user onboarding",
      "Complex workflow routing with 100+ n8n workflows",
    ],
    stack: ["Next.js", "n8n", "AI APIs", "PostgreSQL", "LINE API"],
    github: "" /* TODO */,
    live: "" /* TODO */,
  },
  {
    id: "ten-rent",
    title: "Ten-Rent: Tenant Management System",
    category: "Full Stack",
    description:
      "A full-stack property management application architected to streamline complex landlord-tenant operations and centralize financial tracking.",
    features: [
      "Advanced PostgreSQL schemas supporting floor hierarchies",
      "Automated bill management for monthly invoicing",
      "Role-based access for landlords and tenants",
    ],
    stack: ["MERN Stack", "PostgreSQL"],
    github: "" /* TODO */,
    live: "" /* TODO */,
  },
  {
    id: "project-management-system",
    title: "Project Management System",
    category: "Full Stack",
    description: "" /* TODO: 1-2 sentence description */,
    features: [
      "" /* TODO: feature 1 */,
      "" /* TODO: feature 2 */,
      "" /* TODO: feature 3 */,
    ],
    stack: [] /* TODO: tech stack */,
    github: "" /* TODO */,
    live: "" /* TODO */,
  },
  {
    id: "cloud-storage-pipeline",
    title: "Enterprise Cloud Storage Automation Pipeline",
    category: "Automation",
    description:
      "An end-to-end automation workflow designed to drastically reduce manual administrative overhead for video conferencing assets and optimize cloud storage costs.",
    features: [
      "Automated extraction and secure transfer of Zoom cloud recordings directly to Google Drive",
      "Scheduled storage deletion protocol to manage costs",
    ],
    stack: ["n8n", "Zoom API", "Google Drive API"],
    github: "" /* TODO */,
    live: "" /* TODO */,
  },
  {
    id: "rag-chatbot-ecosystem",
    title: "RAG Chatbot Ecosystem (Telegram/WhatsApp)",
    category: "AI/RAG",
    description:
      "Intelligent, context-aware chatbot applications integrated across major messaging platforms using Retrieval-Augmented Generation (RAG) to deliver accurate, domain-specific responses.",
    features: [
      "Centralized prompt management via structured PostgreSQL DB",
      "Multi-platform integration (Telegram + WhatsApp)",
      "Optimized data retrieval with RAG architecture",
    ],
    stack: [
      "PostgreSQL",
      "RAG Architecture",
      "n8n",
      "LLM APIs",
      "Telegram API",
      "WhatsApp API",
    ],
    github: "" /* TODO */,
    live: "" /* TODO */,
  },
  {
    id: "huawei-watch-integration",
    title: "Watch-Fit-4 & Watch 5 Huawei Integration",
    category: "Automation",
    description:
      "Device-specific application development focusing on seamless UI/UX execution and feature refinement for Huawei wearables, including HealthKit data pipeline integration.",
    features: [
      "Git feature branch management for interface bug fixes",
      "Built and compiled .hap files for device testing",
      "Huawei HealthKit API integration",
    ],
    stack: ["Git", "Huawei HealthKit API", "Device build tools"],
    github: "" /* TODO */,
    live: "" /* TODO */,
  },
];
