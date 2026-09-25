export type ProjectCategory = "Frontend" | "Full Stack" | "AI/RAG" | "Automation";

export type Project = {
  id: string;
  title: string;
  category: ProjectCategory;
  description: string;
  features: readonly string[];
  stack: readonly string[];
  github?: string;
  live?: string;
  image?: string;
  status?: "live" | "coming-soon";
};

export const projects: readonly Project[] = [
  {
    id: "portfolio",
    title: "Developer Portfolio (rhrony05.me)",
    category: "Frontend",
    description:
      "High-performance, interactive 3D developer portfolio featuring real-time WebGL environments, dynamic multi-palette theme engine, and graphic novel dossier mechanics.",
    features: [
      "Interactive Three.js / React Three Fiber open-air cinema & 3D book dossier",
      "Dynamic 4-palette theme switcher & real-time typography system",
      "Smooth GPU spring physics and continuous 3D card deck interactions",
    ],
    stack: ["Next.js", "React 19", "Three.js", "R3F", "Tailwind CSS", "Framer Motion"],
    github: "",
    live: "https://rhrony05.me",
    image: "/images/projects/my_portfolio.png",
    status: "live",
  },
  {
    id: "sabaihealth",
    title: "SabaiHealth Web Platform",
    category: "Frontend",
    description:
      "Official responsive web platform for SabaiHealth featuring multi-language internationalization (Thai and English) with integrated digital NDA e-signature workflows for patient and partner onboarding.",
    features: [
      "Secure digital NDA e-signature workflows for seamless onboarding",
      "Bilingual internationalization architecture (Thai and English)",
      "Modern responsive health platform UI/UX engineered with Next.js",
    ],
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "E-Signature"],
    github: "",
    live: "https://sabaihealth.com",
    image: "/images/projects/Sabaihealth_website.png",
    status: "live",
  },
  {
    id: "calowry",
    title: "Calowry: Sustainable Fibre Innovation",
    category: "Frontend",
    description:
      "A modern corporate product showcase for Calowry Inc built during my foundational web development journey, highlighting 100% ecological coconut mesocarp micronisation technology and multi-sector applications.",
    features: [
      "Interactive multi-sector application catalog (Food, Cosmetics, Pharma, Industrial)",
      "Technical specification datasheets and direct sample inquiry pipeline",
      "High-performance client-side SPA architecture with modern responsive UI/UX",
    ],
    stack: ["React", "JavaScript", "Tailwind CSS", "Vite"],
    github: "",
    live: "https://calowry.com",
    image: "/images/projects/calowry_website.png",
    status: "live",
  },
  {
    id: "sabai-chatbot",
    title: "Sabai: Autonomous AI Health Assistant",
    category: "AI/RAG",
    description:
      "An autonomous AI health assistant living across WhatsApp, Telegram, and LINE, delivering contextual healthcare support, symptom guidance, and automated triage pipelines.",
    features: [
      "Omnichannel deployment across WhatsApp, Telegram, and LINE",
      "Domain-specific RAG architecture with structured medical knowledge bases",
      "Automated patient consultation routing and triage workflows",
    ],
    stack: ["AI APIs", "n8n", "WhatsApp API", "Telegram API", "LINE API", "PostgreSQL"],
    github: "",
    live: "",
    status: "coming-soon",
  },
  {
    id: "project-management",
    title: "Project Management System",
    category: "Full Stack",
    description:
      "A centralized team collaboration and sprint orchestration platform engineered for tracking sprint velocity, task dependencies, and software engineering milestones.",
    features: [
      "Interactive Kanban and sprint board with real-time state synchronization",
      "Granular task dependency mapping and deadline tracking",
      "Role-based workspace access controls and audit logging",
    ],
    stack: ["React", "Node.js", "PostgreSQL", "Tailwind CSS"],
    github: "",
    live: "",
    status: "coming-soon",
  },
  {
    id: "apartment-management",
    title: "Apartment & Tenant Management System",
    category: "Full Stack",
    description:
      "A dedicated property management platform engineered for apartment owners to oversee tenants, organize floor and unit hierarchies, and centralize monthly utility and rent billing.",
    features: [
      "Multi-tier floor, apartment, and unit hierarchy organization",
      "Automated monthly invoicing and rent collection tracking",
      "Tenant communication and maintenance request ticket portal",
    ],
    stack: ["Next.js", "Node.js", "PostgreSQL", "Tailwind CSS"],
    github: "",
    live: "",
    status: "coming-soon",
  },
  {
    id: "house-finder",
    title: "House & Flat Rental Finder",
    category: "Full Stack",
    description:
      "A specialized residential discovery platform connecting bachelors and relocating families with verified long-term rental houses and apartments (1+ months) without short-stay hospitality markups.",
    features: [
      "Targeted filtering tailored specifically for bachelors vs. family residencies",
      "Verified long-term rental listings with lease agreement specifications",
      "Direct landlord inquiry and in-person property visit scheduling",
    ],
    stack: ["Next.js", "TypeScript", "PostgreSQL", "Tailwind CSS"],
    github: "",
    live: "",
    status: "coming-soon",
  },
  {
    id: "movie-booking",
    title: "CinePass: Movie Ticket Booking Platform",
    category: "Full Stack",
    description:
      "An interactive cinema ticketing platform offering real-time theater seat reservations, showtime schedules, and instant digital pass generation.",
    features: [
      "Interactive SVG cinema hall seat map with live occupancy locking",
      "Multi-theater showtime scheduling and movie catalog exploration",
      "Instant digital ticket generation with payment integration",
    ],
    stack: ["React", "Node.js", "Express", "PostgreSQL", "Tailwind CSS"],
    github: "",
    live: "",
    status: "coming-soon",
  },
];
