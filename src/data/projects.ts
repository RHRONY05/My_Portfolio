export type ProjectCategory = "Frontend" | "Full Stack" | "AI/RAG" | "Automation";

export type ProjectStat = {
  value: string;
  label: string;
  detail?: string;
};

export type ProjectCaseStudy = {
  context: string;
  role: string;
  timeline: string;
  outcome: string;
  challenge: {
    summary: string;
    points: readonly string[];
  };
  solution: {
    summary: string;
    architecturePoints: readonly {
      title: string;
      desc: string;
    }[];
  };
  stats: readonly ProjectStat[];
  keyHighlights: readonly string[];
};

export type GallerySlot =
  | "col1-top"
  | "col1-bottom"
  | "col1-bottom-left"
  | "col1-bottom-right"
  | "col2-top"
  | "col2-bottom"
  | "col3-top"
  | "col3-bottom";

export type GalleryColumn = "left" | "middle" | "right";

export type ProjectScreenshot = {
  title: string;
  src: string;
  caption?: string;
  type?: "desktop" | "mobile" | "diagram" | "feature";
  aspectRatio?: string;
  width?: number;
  height?: number;
  slot?: GallerySlot;
  column?: GalleryColumn;
};

export type Project = {
  id: string;
  title: string;
  tagline: string;
  category: ProjectCategory;
  categories?: readonly ProjectCategory[];
  description: string;
  features: readonly string[];
  stack: readonly string[];
  github?: string;
  live?: string;
  image?: string;
  hasScroll?: boolean;
  gallery?: readonly ProjectScreenshot[];
  status: "live" | "coming-soon";
  caseStudy: ProjectCaseStudy;
};

export const projects: readonly Project[] = [
  {
    id: "shopmate-ai",
    title: "ShopMate AI: Voice & Conversational E-Commerce Agent",
    tagline: "Autonomous shopping agent with real-time voice, inventory tool calling, and automated cart actions",
    category: "AI/RAG",
    categories: ["AI/RAG", "Full Stack"],
    description:
      "A self-directed AI project exploring how autonomous agents and real-time voice assistants streamline e-commerce. Instead of manually filtering catalogs and guessing search terms, shoppers can chat or speak directly with an agent that verifies inventory and manages their cart automatically.",
    features: [
      "Real-time voice and text chat interface enabling natural conversational shopping without manual navigation",
      "Agentic tool-calling loop querying the product database to confirm availability without inventory hallucination",
      "Autonomous shopping bag management selecting sizes/variants and preparing orders for one-click checkout",
      "Client-side reactive synchronization updating cart drawers and product cards in real time as the agent acts",
    ],
    stack: [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "Google Gemini API",
      "PostgreSQL",
      "Prisma",
      "Redis",
      "Docker",
    ],
    github: "https://github.com/RHRONY05/ShopMate_AI",
    live: "",
    image: "/images/projects/shopmate-ai/scrolling_img_v2.webp",
    gallery: [
      {
        title: "The KitRoom Landing Experience: Match Authentic Kit (Hero Slide 1)",
        src: "/images/projects/shopmate-ai/landing_page_s1.webp",
        type: "desktop",
        aspectRatio: "1888/877",
        width: 1888,
        height: 877,
        slot: "col1-top",
      },
      {
        title: "The KitRoom Heritage Trefoil Showcase (Hero Slide 2)",
        src: "/images/projects/shopmate-ai/landing_page_s2.webp",
        type: "desktop",
        aspectRatio: "1888/914",
        width: 1888,
        height: 914,
        slot: "col1-bottom",
      },
      {
        title: "Semantic Vector Discovery & Apparel Catalog",
        src: "/images/projects/shopmate-ai/catalog.webp",
        type: "desktop",
        aspectRatio: "1625/770",
        width: 1625,
        height: 770,
        slot: "col2-top",
      },
      {
        title: "Product Detail & Variant Customization",
        src: "/images/projects/shopmate-ai/product_details.webp",
        type: "feature",
        aspectRatio: "1327/770",
        width: 1327,
        height: 770,
        slot: "col2-bottom",
      },
      {
        title: "Gemini AI Conversational Shopping Assistant",
        src: "/images/projects/shopmate-ai/shopmate_agent.webp",
        type: "feature",
        aspectRatio: "599/759",
        width: 599,
        height: 759,
        slot: "col3-top",
      },
      {
        title: "Stripe Payment Gateway Integration",
        src: "/images/projects/shopmate-ai/stripe.webp",
        type: "feature",
        aspectRatio: "886/668",
        width: 886,
        height: 668,
        slot: "col3-bottom",
      },
      {
        title: "Real-time Shopping Bag & Cart Drawer",
        src: "/images/projects/shopmate-ai/shopping_bag.webp",
        type: "feature",
        aspectRatio: "1700/774",
        width: 1700,
        height: 774,
      },
      {
        title: "Storefront Footer & Brand Navigation",
        src: "/images/projects/shopmate-ai/footer.webp",
        type: "desktop",
        aspectRatio: "1843/693",
        width: 1843,
        height: 693,
      },
    ],
    status: "live",
    caseStudy: {
      context: "Self-Directed AI Agent & Voice Assistant Exploration",
      role: "AI & Full-Stack Developer (Personal Project)",
      timeline: "Self-Directed Learning",
      outcome: "End-to-end voice and text conversational shopping flow with autonomous cart mutations",
      challenge: {
        summary:
          "Shopping on traditional e-commerce platforms requires tedious manual effort: clicking through complex filter menus, guessing exact keyword matches, and second-guessing whether a missing product is out of stock or just buried by search filters. Adding items and picking sizes requires repetitive navigation across multiple pages.",
        points: [
          "Manual navigation and rigid category filters make product discovery slow and frustrating for shoppers.",
          "Standard search boxes cannot interpret conversational questions, stylistic preferences, or price constraints.",
          "Browsing, picking variants, and managing cart quantities requires multiple clicks and page transitions.",
        ],
      },
      solution: {
        summary:
          "Engineered an autonomous conversational agent equipped with declared database tools and voice capabilities. Shoppers can speak or chat naturally to check product availability, receive definitive answers, and have the agent populate their cart automatically.",
        architecturePoints: [
          {
            title: "Voice & Conversational Interface",
            desc: "Built-in real-time voice and text chat allowing shoppers to ask questions naturally and hear immediate spoken or text feedback.",
          },
          {
            title: "Grounded Inventory Tool Calling",
            desc: "Equipped the Gemini agent with structured database query tools to check real inventory counts, eliminating out-of-stock hallucinations.",
          },
          {
            title: "Autonomous Cart Mutations",
            desc: "Empowered the agent to select correct product variants and add them directly into the user's active shopping cart, leaving only checkout.",
          },
          {
            title: "Reactive Client Synchronization",
            desc: "Synchronized backend agent actions with the frontend cart drawer in real time so the user sees items added instantly.",
          },
        ],
      },
      stats: [
        { value: "Voice + Chat", label: "Interaction Modes", detail: "Natural speech and text" },
        { value: "0 Clicks", label: "Cart Addition", detail: "Handled autonomously by agent" },
        { value: "100%", label: "Inventory Accuracy", detail: "Grounded in real database state" },
        { value: "1 Step", label: "User Checkout", detail: "Only payment required" },
      ],
      keyHighlights: [
        "Real-time voice and text conversation powered by Gemini agent tool-calling",
        "Automated shopping bag mutations with live client-side drawer synchronization",
        "Full-stack architecture with Next.js, PostgreSQL, Prisma, Redis, and Docker",
      ],
    },
  },
  {
    id: "sabaihealth",
    title: "SabaiHealth: Official Web Platform",
    tagline: "Bilingual health platform & onboarding portal for Thailand's omnichannel AI care companion",
    category: "Frontend",
    description:
      "The official responsive web platform for Sabai, a Bangkok-based digital health company. Designed and built from scratch to establish brand trust, educate users on the AI care companion, provide direct onboarding into WhatsApp, Telegram, and LINE, and house medical articles, user reviews, feedback, and an investor portal.",
    features: [
      "End-to-end design and responsive frontend engineering crafted from concept to production",
      "Seamless omnichannel onboarding with direct launch links into WhatsApp, Telegram, and LINE",
      "Educational health article library, user review showcase, and interactive feedback intake form",
      "Bilingual internationalization architecture supporting both English and Thai locales",
      "Restricted investor portal (ExecSummary) and comprehensive medical FAQ directory",
    ],
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "i18n"],
    github: "",
    live: "https://sabaihealth.com",
    image: "/images/projects/sabaihealth/scrolling_img.webp",
    gallery: [
      {
        title: "Desktop Primary Interface",
        src: "/images/projects/sabaihealth/desktop_landing_page.webp",
        type: "desktop",
        aspectRatio: "1894/917",
        width: 1894,
        height: 917,
        slot: "col1-top",
      },
      {
        title: "Medical Knowledge & Article Directory",
        src: "/images/projects/sabaihealth/article_page.webp",
        type: "desktop",
        aspectRatio: "1708/917",
        width: 1708,
        height: 917,
        slot: "col2-top",
      },
      {
        title: "Mobile Native Healthcare Platform",
        src: "/images/projects/sabaihealth/mobile_landing_page.webp",
        type: "mobile",
        aspectRatio: "820/1600",
        width: 820,
        height: 1600,
        slot: "col3-top",
      },
      {
        title: "Partner Intake & Feedback Flow",
        src: "/images/projects/sabaihealth/feedback_form.webp",
        type: "feature",
        aspectRatio: "495/709",
        width: 495,
        height: 709,
        slot: "col2-bottom",
      },
      {
        title: "Instant Action & Consultation Drawer",
        src: "/images/projects/sabaihealth/quick_action_modal.webp",
        type: "feature",
        aspectRatio: "801/824",
        width: 801,
        height: 824,
        slot: "col1-bottom-left",
      },
      {
        title: "Google PageSpeed Core Web Vitals",
        src: "/images/projects/sabaihealth/pagespeed_insight.webp",
        type: "feature",
        aspectRatio: "943/517",
        width: 943,
        height: 517,
        slot: "col3-bottom",
      },
      {
        title: "Reading View & Normalized Typography",
        src: "/images/projects/sabaihealth/article_view.webp",
        type: "desktop",
        aspectRatio: "1617/908",
        width: 1617,
        height: 908,
        slot: "col1-bottom-right",
      },
    ],
    status: "live",
    caseStudy: {
      context: "Bangkok Digital Health Startup • Brand & Onboarding Platform",
      role: "UI Designer & Frontend Developer",
      timeline: "Client Project",
      outcome: "Full-scale brand launch with frictionless messaging onboarding across 3 chat apps",
      challenge: {
        summary:
          "Sabai chose a messaging-first strategy: instead of forcing users to download a bulky hospital app or create web accounts, the AI companion lives inside WhatsApp, Telegram, and LINE. The challenge was designing a web platform that builds immediate medical credibility, clearly explains how to use an AI companion on chat apps, and caters to both English and Thai speakers.",
        points: [
          "Users needed clear education on how an AI assistant works inside familiar chat apps rather than traditional web dashboards.",
          "Healthcare requires immediate visual trust, medical disclaimer boundaries, and authentic social proof.",
          "The platform needed bilingual English and Thai support with fast loading speeds across Southeast Asian mobile networks.",
        ],
      },
      solution: {
        summary:
          "Designed and developed the entire web platform in Next.js from the ground up, establishing a warm, trustworthy visual identity ('Sabai' means wellness and peace of mind in Thai) with one-click chat launches, dynamic health articles, and investor resources.",
        architecturePoints: [
          {
            title: "End-to-End Design & Visual Identity",
            desc: "Crafted the entire design system, color palette, responsive typography, and layouts to communicate empathetic, clinical-grade care.",
          },
          {
            title: "Frictionless Messaging Onboarding",
            desc: "Engineered deep-link launch buttons with pre-filled conversational prompts directly opening WhatsApp, Telegram, or LINE on the user's device.",
          },
          {
            title: "Health Articles & Interactive Modules",
            desc: "Built a categorized directory of educational medical articles, an interactive user feedback form, investor executive summary access, and collapsible FAQs.",
          },
          {
            title: "Bilingual Thai & English Localization",
            desc: "Implemented clean multi-language routing (/en and /th) with typography optimized to handle Thai scripts without layout shift.",
          },
        ],
      },
      stats: [
        { value: "3", label: "Chat Onboardings", detail: "WhatsApp, LINE, Telegram" },
        { value: "2", label: "Languages", detail: "English and Thai" },
        { value: "100%", label: "Sole Ownership", detail: "Designed & built from scratch" },
        { value: "98", label: "Lighthouse Desktop", detail: "Optimized mobile & desktop" },
      ],
      keyHighlights: [
        "Sole responsibility for complete visual design, layout architecture, and frontend development",
        "Direct chat app deep-links enabling instant interaction without app downloads or signups",
        "Interactive feedback collection form and restricted investor executive summary portal",
      ],
    },
  },
  {
    id: "movie-booking",
    title: "CineReserve: Cinema Booking System",
    tagline: "Self-learning cinema reservation engine exploring database concurrency, CI/CD, and VPS hosting",
    category: "Full Stack",
    description:
      "A self-learning full-stack cinema reservation system built in 2 weeks to practice solving real-world database concurrency, automated CI/CD pipelines, and Linux VPS self-hosting. Features PostgreSQL row-level locking to eliminate double-booking race conditions, interactive hall seat selection, Google OAuth, Docker containerization, and automated deployments with GitHub Actions.",
    features: [
      "ACID transaction isolation & row-level locking (SELECT ... FOR UPDATE) eliminating double-booking race conditions",
      "Interactive cinema hall seat mapping with instant seat availability and reservation lifecycle states",
      "Secure Google OAuth 2.0 authentication and session management with JWT and PostgreSQL persistence",
      "Full-stack Docker multi-container architecture (React, Express API, PostgreSQL) with automated GitHub Actions CI/CD",
      "Production VPS infrastructure orchestration with Nginx reverse proxy, SSL termination, and automated deployment",
    ],
    stack: [
      "React",
      "Node.js",
      "Express",
      "PostgreSQL",
      "Docker",
      "CI/CD",
      "Google OAuth",
      "VPS / Nginx",
      "Tailwind CSS",
    ],
    github: "https://github.com/RHRONY05/Movie_Booking_System",
    live: "https://movies.rhrony05.me",
    image: "/images/projects/movie-booking/scrolling_img.webp",
    gallery: [
      {
        title: "CineReserve Cinema Storefront",
        src: "/images/projects/movie-booking/landing_page.webp",
        type: "desktop",
        aspectRatio: "1906/914",
        width: 1906,
        height: 914,
        column: "left",
      },
      {
        title: "Now Showing & Upcoming Cinema Schedule",
        src: "/images/projects/movie-booking/movies.webp",
        type: "desktop",
        aspectRatio: "1256/833",
        width: 1256,
        height: 833,
        column: "left",
      },
      {
        title: "Two-Factor OTP Verification",
        src: "/images/projects/movie-booking/otp_verification.webp",
        type: "feature",
        aspectRatio: "721/693",
        width: 721,
        height: 693,
        column: "middle",
      },
      {
        title: "User Authentication & OAuth",
        src: "/images/projects/movie-booking/auth.webp",
        type: "feature",
        aspectRatio: "705/565",
        width: 705,
        height: 565,
        column: "middle",
      },
      {
        title: "Interactive Hall Spatial Matrix & Seat Booking",
        src: "/images/projects/movie-booking/book_seat.webp",
        type: "feature",
        aspectRatio: "989/785",
        width: 989,
        height: 785,
        column: "right",
      },
    ],
    status: "live",
    caseStudy: {
      context: "Self-Directed Learning • Concurrency & DevOps",
      role: "Full-Stack Developer (Personal Project)",
      timeline: "2 Weeks",
      outcome: "Eliminated double-booking race conditions with row-level locks, automated CI/CD, and VPS hosting",
      challenge: {
        summary:
          "Built as a self-learning project to explore how distributed ticketing platforms prevent race conditions when multiple users attempt to reserve the same seat simultaneously, and how to reliably automate deployments to a self-managed Linux VPS.",
        points: [
          "Concurrent requests cause race conditions where two users can accidentally checkout the exact same seat.",
          "Manual deployments to virtual servers lead to configuration drift, broken dependencies, and unexpected downtime.",
          "Orchestrating multiple services (frontend, backend, database) requires clean container isolation and reverse proxy routing.",
        ],
      },
      solution: {
        summary:
          "Engineered an Express and PostgreSQL backend utilizing explicit row-level locking (SELECT ... FOR UPDATE) inside isolated ACID database transactions, bundled in Docker containers with automated GitHub Actions CI/CD to a production VPS.",
        architecturePoints: [
          {
            title: "ACID Row-Level Locking (SELECT ... FOR UPDATE)",
            desc: "Locks target seat rows immediately upon selection, blocking competing transactions until the checkout completes or expires.",
          },
          {
            title: "Automated GitHub Actions CI/CD Pipeline",
            desc: "Configured automated deployment workflows that build, test, and update Docker containers on the production VPS on every git push.",
          },
          {
            title: "Production VPS with Nginx Reverse Proxy",
            desc: "Configured upstream reverse proxying, rate-limiting, and SSL termination on a self-managed Linux VPS.",
          },
          {
            title: "Interactive Hall Spatial Matrix",
            desc: "Responsive spatial seating canvas rendering hall geometries with real-time color-coded seat reservation states.",
          },
        ],
      },
      stats: [
        { value: "2 Weeks", label: "Build Timeline", detail: "Self-directed learning sprint" },
        { value: "0", label: "Double-Booking Errors", detail: "Eliminated with row-level locks" },
        { value: "100%", label: "Automated Deployments", detail: "GitHub Actions CI/CD pipeline" },
        { value: "Docker", label: "Multi-Service Mesh", detail: "Frontend, API, and DB isolated" },
      ],
      keyHighlights: [
        "Google OAuth 2.0 with cryptographically signed JSON Web Tokens (JWT)",
        "Transient seat lock timeouts releasing unpurchased seats back to the hall pool after 10 minutes",
        "Automated database migrations and seeders for deterministic local and production states",
      ],
    },
  },
  {
    id: "calowry",
    title: "Calowry: Plant-Based Fibre Innovation",
    tagline: "Corporate product showcase & guest document portal for Queensland sustainable biomaterials enterprise",
    category: "Frontend",
    description:
      "A client web platform built for Calowry Australia Pty. Ltd. (Gordonvale, Queensland), a sustainable biomaterials lab and manufacturer producing plant-based fibers from coconut mesocarp. Improvised raw client assets into a clean, modern UI without text bloat, featuring an interactive product catalog and a guest access portal for internal documentation.",
    features: [
      "Transformed raw client assets and brochures into a structured, modern web design without overwhelming visitors with text bloat",
      "Interactive product showcase categorizing eco-friendly coconut fiber applications across food, cosmetics, and industry",
      "Guest visitor portal enabling verified partners and collaborators with common credentials to access internal documents",
      "Responsive single-page application built with React, Vite, and Tailwind CSS for rapid client-side browsing",
    ],
    stack: ["React", "JavaScript", "Tailwind CSS", "Vite"],
    github: "",
    live: "https://calowry.com",
    image: "/images/projects/calowry/scrolling_img.webp",
    gallery: [
      {
        title: "Calowry Landing Experience",
        src: "/images/projects/calowry/calowry_landing_page.webp",
        type: "desktop",
        aspectRatio: "1887/915",
        width: 1887,
        height: 915,
        slot: "col1-top",
      },
      {
        title: "Interactive Product Showcase Carousel",
        src: "/images/projects/calowry/product_carousel.webp",
        type: "feature",
        aspectRatio: "1837/796",
        width: 1837,
        height: 796,
        slot: "col1-bottom",
      },
      {
        title: "All Products Directory",
        src: "/images/projects/calowry/all_product.webp",
        type: "feature",
        aspectRatio: "1182/890",
        width: 1182,
        height: 890,
        slot: "col2-top",
      },
      {
        title: "Secure Account Access & Inquiry",
        src: "/images/projects/calowry/auth.webp",
        type: "feature",
        aspectRatio: "613/698",
        width: 613,
        height: 698,
        slot: "col2-bottom",
      },
      {
        title: "Enterprise Footer & Global Contact",
        src: "/images/projects/calowry/footer.webp",
        type: "desktop",
        aspectRatio: "1885/661",
        width: 1885,
        height: 661,
        slot: "col3-top",
      },
    ],
    status: "live",
    caseStudy: {
      context: "Australian Sustainable Biomaterials Client (Gordonvale, QLD)",
      role: "UI Designer & Frontend Developer (Client Work)",
      timeline: "Client Contract",
      outcome: "Modern, meaningful corporate showcase with guest visitor access to internal technical documents",
      challenge: {
        summary:
          "Calowry Australia needed a web presence to communicate what their sustainable fiber extraction lab does, showcase product applications, and provide internal document access to known partners. The client provided raw images, brochures, and unformatted technical details, requiring thoughtful design to avoid bloated text walls while keeping product applications clear.",
        points: [
          "Raw client assets and technical brochures risked creating a text-heavy, bloated website if not restructured with deliberate visual hierarchy.",
          "The client needed a simple guest access option for known partners to enter common credentials and view internal company documents.",
          "The brand needed to look clean, professional, and credible to international buyers while reflecting their eco-friendly mission.",
        ],
      },
      solution: {
        summary:
          "Took the client's raw assets and high-level requirements, improvised the visual design, and developed a fast, modern single-page application in React. Structured information into digestible cards and product carousels, and implemented a guest visitor login for internal documentation.",
        architecturePoints: [
          {
            title: "Asset Improvisation & Modern UI Design",
            desc: "Restructured raw product photos and text into clean card-based layouts and carousels, communicating fiber applications with meaning rather than text bloat.",
          },
          {
            title: "Guest Visitor Document Portal",
            desc: "Built a credential verification modal allowing known partners and clients to access protected internal documents and technical datasheets.",
          },
          {
            title: "Product Category Showcases",
            desc: "Organized fiber variants and use cases across food, cosmetic, and pharmaceutical industries into interactive, easily scannable sections.",
          },
          {
            title: "Responsive Single-Page Architecture",
            desc: "Built with React, Vite, and Tailwind CSS for fast loading speeds and smooth navigation on both desktop and mobile devices.",
          },
        ],
      },
      stats: [
        { value: "Australia", label: "Client Location", detail: "Gordonvale, Queensland" },
        { value: "100%", label: "Design & Dev", detail: "Asset improvisation & UI build" },
        { value: "Guest Portal", label: "Internal Access", detail: "Shared credential verification" },
        { value: "3+", label: "Product Sectors", detail: "Food, cosmetics, industrial" },
      ],
      keyHighlights: [
        "Complete UI design and layout created from raw client assets and open requirements",
        "Guest access portal for internal documentation and technical specification sheets",
        "Clean, modern design language eliminating text bloat while preserving technical clarity",
      ],
    },
  },
  {
    id: "zoom-automation",
    title: "ZoomFlow: Automated Cloud Recording Pipeline",
    tagline: "Event-driven recording pipeline offloading Zoom media to Google Drive with automated cloud purging",
    category: "Automation",
    description:
      "A production n8n automation pipeline engineered on a self-hosted VPS to solve hard 10 GB Zoom cloud storage ceilings. Listens to Zoom webhooks with HMAC-SHA256 handshake verification, normalizes metadata, streams best-quality video/audio into organized Google Drive folders, and purges recordings via Zoom OAuth API to eliminate storage overage costs.",
    features: [
      "Cryptographic HMAC-SHA256 handshake validation for secure Zoom webhook endpoint verification",
      "Idempotent event processing with x-zoom-retry-num header detection to prevent double-uploads",
      "Automated meeting UUID double-encoding to prevent REST path corruption on special characters",
      "Multi-stream quality parsing selecting highest-bitrate MP4 video, M4A audio, and VTT transcripts",
      "Automated Google Drive folder structuring by meeting topic and formatted ISO timestamps",
      "Zero-data-loss execution loop deleting Zoom cloud recordings only upon confirmed Drive transfer",
    ],
    stack: [
      "n8n",
      "Node.js",
      "Zoom API",
      "Google Drive API",
      "Webhooks",
      "HMAC-SHA256",
      "Caddy",
      "VPS / Linux",
    ],
    image: "/images/projects/zoom-automation/system_architecture_flowchart.webp",
    hasScroll: false,
    gallery: [
      {
        title: "System Architecture & Dataflow Diagram",
        src: "/images/projects/zoom-automation/system_architecture_flowchart.webp",
        type: "diagram",
        aspectRatio: "1600/1000",
        width: 1600,
        height: 1000,
        column: "left",
      },
      {
        title: "Production n8n Execution Canvas & Live Logs",
        src: "/images/projects/zoom-automation/workflow_canvas.webp",
        type: "desktop",
        aspectRatio: "1024/568",
        width: 1024,
        height: 568,
        column: "middle",
      },
      {
        title: "Active Pipeline Nodes & Webhook Gateways",
        src: "/images/projects/zoom-automation/canvas_nodes.webp",
        type: "feature",
        aspectRatio: "788/548",
        width: 788,
        height: 548,
        column: "right",
      },
    ],
    status: "live",
    caseStudy: {
      context: "Client Automation & Cloud Cost Optimization",
      role: "Automation & Backend Developer",
      timeline: "1 Week (April 2026)",
      outcome: "100% elimination of Zoom storage overage fees with infinite recording retention",
      challenge: {
        summary:
          "A fast-growing healthcare consulting client recorded every partner and patient session on Zoom, rapidly exhausting their base 10 GB cloud storage allocation. Hitting the cap risked dropped recordings during critical appointments, while upgrading Zoom cloud storage tiers would incur steep, recurring monthly fees.",
        points: [
          "Zoom base storage quota (10 GB) was exhausted within weeks of daily client consultations.",
          "Upgrading Zoom cloud storage tiers would incur costly, recurring monthly subscription add-ons.",
          "Manual downloading and re-uploading recordings to Google Drive was error-prone and consumed hours of staff time.",
          "Zoom webhook security enforces strict HMAC-SHA256 cryptographic response challenges for event delivery.",
        ],
      },
      solution: {
        summary:
          "Architected an event-driven webhook pipeline on self-hosted n8n that captures Zoom recording events, validates requests with HMAC-SHA256, streams media directly to Google Drive, and safely deletes the source recording from Zoom.",
        architecturePoints: [
          {
            title: "HMAC-SHA256 Webhook Verification",
            desc: "Listens for Zoom URL validation and recording.completed events, computing HMAC-SHA256 hashes against the app secret to pass Zoom endpoint verification.",
          },
          {
            title: "Idempotency & Retry Interception",
            desc: "Inspects x-zoom-retry-num headers to discard redundant webhook delivery attempts, avoiding duplicate uploads.",
          },
          {
            title: "Deep UUID Double-Encoding",
            desc: "Applies double URL encoding to Zoom meeting UUIDs containing slashes or special characters, preventing 404 REST route breakage on the Zoom deletion API.",
          },
          {
            title: "Dynamic Stream Filtering",
            desc: "Custom JavaScript code node evaluates byte sizes to select the highest-quality MP4 video, primary audio, and VTT subtitles.",
          },
          {
            title: "Confirmed Deletion Lifecycle",
            desc: "Triggers Zoom REST API DELETE call only after Google Drive confirms 200 OK file persistence, guaranteeing zero data loss.",
          },
        ],
      },
      stats: [
        { value: "100%", label: "Overages Avoided", detail: "Zero extra Zoom cloud storage fees" },
        { value: "10 GB", label: "Quota Reclaimed", detail: "Continuously purged after sync" },
        { value: "<2m", label: "Sync Turnaround", detail: "Live execution time per recording" },
        { value: "0", label: "Data Loss Incidents", detail: "Confirmed upload before deletion" },
      ],
      keyHighlights: [
        "Cryptographic HMAC-SHA256 webhook validation handshake",
        "Zero-data-loss guaranteed deletion loop with Drive confirmation gate",
        "Double-encoded UUID Zoom API compatibility workaround for slash-prefixed IDs",
        "Automated Google Drive folder structuring with ISO timestamp formatting",
        "Self-hosted on production Linux VPS behind Caddy reverse proxy with SSL",
      ],
    },
  },
  {
    id: "vocab-app",
    title: "Vocab: AI-Powered Vocabulary & Spaced Repetition",
    tagline: "Personal vocabulary companion with structured Gemini breakdowns, multi-word search, and active recall quizzes",
    category: "AI/RAG",
    description:
      "A personal vocabulary learning web app built to solve everyday English reading and communication challenges. Instead of rigid dictionary definitions or repetitive AI prompting, a built-in Gemini agent returns tailored word breakdowns with conversational usage, collocations, and Bengali nuance, stores words in a Supabase database, and generates spaced repetition quizzes so vocabulary is actually remembered.",
    features: [
      "AI agent delivering custom word breakdowns with conversational context, grammatical collocations, and Bengali nuance",
      "Multi-word search support enabling instantaneous batch explanations without repetitive manual prompting",
      "Supabase database persistence with repeat-lookup caching to prevent redundant AI API calls",
      "Leitner 5-box active recall quiz system with daily reviews and targeted practice (weekly, monthly, weak words)",
      "Interactive sentence tester and chat thread for real-time practice and grammar feedback",
    ],
    stack: [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "Tailwind CSS v4",
      "Supabase",
      "PostgreSQL",
      "Google Gemini API",
    ],
    github: "https://github.com/RHRONY05/Vocab_App",
    live: "https://vocab.rhrony05.me",
    image: "/images/projects/vocab-app/desktop_home_page.webp",
    hasScroll: false,
    gallery: [
      {
        title: "Vocab Platform Desktop Interface",
        src: "/images/projects/vocab-app/desktop_home_page.webp",
        type: "desktop",
        aspectRatio: "1896/915",
        width: 1896,
        height: 915,
        column: "left",
      },
      {
        title: "Spaced Repetition Mastery Dashboard",
        src: "/images/projects/vocab-app/dashboard.webp",
        type: "desktop",
        aspectRatio: "1847/836",
        width: 1847,
        height: 836,
        column: "left",
      },
      {
        title: "Mobile Native Active Study View",
        src: "/images/projects/vocab-app/mobile_home_page.webp",
        type: "mobile",
        aspectRatio: "761/1600",
        width: 761,
        height: 1600,
        column: "middle",
      },
      {
        title: "User Authentication & Sync Access",
        src: "/images/projects/vocab-app/auth.webp",
        type: "feature",
        aspectRatio: "388/588",
        width: 388,
        height: 588,
        column: "right",
      },
      {
        title: "Leitner 5-Box Daily Review Flashcard",
        src: "/images/projects/vocab-app/review.webp",
        type: "feature",
        aspectRatio: "852/757",
        width: 852,
        height: 757,
        column: "right",
      },
      {
        title: "Sentence Tester & Active Recall Quiz",
        src: "/images/projects/vocab-app/quiz.webp",
        type: "feature",
        aspectRatio: "897/698",
        width: 897,
        height: 698,
        column: "right",
      },
    ],
    status: "live",
    caseStudy: {
      context: "Personal Daily Learning Tool • AI-Assisted Rapid Prototyping",
      role: "Full-Stack Developer (Personal Project)",
      timeline: "2 Days",
      outcome: "From Claude architectural planning to Antigravity full-stack execution in 2 days",
      challenge: {
        summary:
          "Encountering unfamiliar English words while reading, coding, or communicating is an everyday reality. Traditional dictionaries provide rigid, literal definitions that don't explain how a word is naturally used in conversations or what words pair with it. While prompting an AI chatbot gives better explanations, having to repeatedly type custom prompts for every single word is tedious—and without an integrated system, looked-up words are quickly forgotten.",
        points: [
          "Standard dictionaries give dry, literal meanings without conversational context, tone register, or common pairings.",
          "Manually prompting an AI model for every new word is repetitive and interrupts daily reading and working flow.",
          "Looked-up words are easily forgotten without a database to store them and automated active recall quizzes to review them.",
        ],
      },
      solution: {
        summary:
          "Built a dedicated web application with an integrated Gemini agent that formats word explanations exactly as needed (including multi-word batch queries), stores words in a PostgreSQL/Supabase database, and provides spaced repetition quizzes to reinforce long-term memory.",
        architecturePoints: [
          {
            title: "Tailored AI Word Explanations",
            desc: "Engineered structured Gemini prompts returning plain-English meanings, formality register, Bengali nuances, high-frequency collocations, and conversational examples.",
          },
          {
            title: "Multi-Word Batch Lookup",
            desc: "Supports querying single or multiple words simultaneously, eliminating repetitive manual prompts while reading or studying.",
          },
          {
            title: "Database Persistence & Repeat Caching",
            desc: "Stores words in Supabase/PostgreSQL. Repeated lookups load saved cards instantly from the database with zero AI latency or cost.",
          },
          {
            title: "Active Recall & Spaced Repetition Quizzes",
            desc: "Implements a Leitner 5-box review engine (1d, 3d, 7d, 14d, 30d) and custom quizzes (weekly, monthly, weak words) to ensure vocabulary is retained.",
          },
        ],
      },
      stats: [
        { value: "Multi-Word", label: "Batch Lookups", detail: "Query single or multiple words" },
        { value: "0 Delay", label: "Saved Card Cache", detail: "Zero redundant AI calls" },
        { value: "5 Boxes", label: "Spaced Repetition", detail: "Leitner retention schedule" },
        { value: "2 Days", label: "Build Time", detail: "Claude planned, Antigravity built" },
      ],
      keyHighlights: [
        "Planned with Claude and executed end-to-end with Antigravity in one go",
        "Structured Gemini schema parsing with Bengali nuance, collocations, and usage tips",
        "Automated Leitner spaced repetition quizzes prioritizing overdue and forgotten words",
        "Real-time sentence tester giving immediate grammar and naturalness feedback",
      ],
    },
  },
  {
    id: "portfolio",
    title: "Developer Portfolio (rhrony05.me)",
    tagline: "Personal portfolio built to showcase real projects, focusing on clarity, simplicity, and fast performance",
    category: "Frontend",
    description:
      "My personal portfolio website created to present my projects and development work. Instead of overcomplicating things with unnecessary clutter, the focus was kept on a clean, straightforward design that delivers fast loading times and honest case studies.",
    features: [
      "Clean, distraction-free layout highlighting project stories and source code",
      "Interactive 3D book in the About section exploring background and journey",
      "Dynamic theme and typography customizer with real-time palette switching",
      "Fast page load times with strong Core Web Vitals on both desktop and mobile",
    ],
    stack: ["Next.js", "React", "TypeScript", "Three.js", "Tailwind CSS", "Framer Motion"],
    github: "https://github.com/RHRONY05/My_Portfolio",
    live: "https://rhrony05.me",
    image: "/images/projects/my_portfolio.webp",
    status: "live",
    gallery: [
      {
        title: "Clean Hero & Overview Landing",
        src: "/images/projects/my_portfolio/landing_page.webp",
        type: "desktop",
        aspectRatio: "1904/914",
        width: 1904,
        height: 914,
        column: "left",
      },
      {
        title: "Interactive 3D Book & Dossier Section",
        src: "/images/projects/my_portfolio/About_section.webp",
        type: "desktop",
        aspectRatio: "1865/836",
        width: 1865,
        height: 836,
        column: "left",
      },
      {
        title: "Project Screenshot Gallery Layout",
        src: "/images/projects/my_portfolio/masonry_gallery.webp",
        type: "desktop",
        aspectRatio: "1613/791",
        width: 1613,
        height: 791,
        column: "middle",
      },
      {
        title: "Challenge & Approach Narrative",
        src: "/images/projects/my_portfolio/problem_solution.webp",
        type: "desktop",
        aspectRatio: "1551/812",
        width: 1551,
        height: 812,
        column: "middle",
      },
      {
        title: "Mobile Viewport Responsive Layout",
        src: "/images/projects/my_portfolio/Mobile_view.webp",
        type: "mobile",
        aspectRatio: "458/821",
        width: 458,
        height: 821,
        column: "right",
      },
      {
        title: "Desktop Lighthouse Performance Telemetry",
        src: "/images/projects/my_portfolio/desktop_performance.webp",
        type: "desktop",
        aspectRatio: "943/494",
        width: 943,
        height: 494,
        column: "middle",
      },
    ],
    caseStudy: {
      context: "Personal Developer Portfolio & Showcase",
      role: "Developer & Designer",
      timeline: "Iterative Build",
      outcome: "A simple, functional design with fast performance and clear case studies",
      challenge: {
        summary:
          "The main challenge was figuring out how my portfolio should look. I tried many different visual styles, layouts, and interactive concepts, but nothing felt satisfying or right. Overcomplicating the design repeatedly led to frustration rather than progress.",
        points: [
          "Design paralysis: constantly experimenting with complex layouts without feeling satisfied with the direction.",
          "Trying too hard to make things look extravagant instead of focusing on what actually matters.",
          "Struggling to find the right balance between subtle interactive touches and simple readability.",
        ],
      },
      solution: {
        summary:
          "In the end, I stripped away the over-engineered ideas and embraced a basic, clean design. I focused on clean typography, simple navigation, solid performance, and honest project writeups rather than visual gimmicks.",
        architecturePoints: [
          {
            title: "Back to Basics Layout",
            desc: "Abandoned bloated UI elements in favor of a clean, direct layout where projects and code take center stage.",
          },
          {
            title: "Grounded Case Studies",
            desc: "Structured each project around real challenges, authentic backstories, and actual approaches rather than fabricated claims.",
          },
          {
            title: "Lightweight & Fast",
            desc: "Optimized image payloads, deferred non-critical assets, and ensured the site loads quickly on both desktop and mobile.",
          },
        ],
      },
      stats: [
        { value: "100%", label: "Authentic Content", detail: "Real backstories and learning journeys" },
        { value: "95+", label: "Lighthouse Score", detail: "Fast loading and clean web vitals" },
        { value: "Clean", label: "Design Philosophy", detail: "Simple layout over visual clutter" },
        { value: "Mobile", label: "Responsive", detail: "Optimized for all screen sizes" },
      ],
      keyHighlights: [
        "Kept the overall layout basic and clean after realizing complex designs weren't satisfying",
        "Focused on transparent, honest project explanations rather than exaggerated marketing copy",
        "Balanced lightweight 3D accents with fast Core Web Vitals",
      ],
    },
  },
  {
    id: "sabai-chatbot",
    title: "Sabai: Omnichannel AI Health Assistant",
    tagline: "Messaging-native AI care companion orchestrated via n8n workflows, PostgreSQL, and cron automation",
    category: "AI/RAG",
    categories: ["AI/RAG", "Automation"],
    description:
      "A messaging-native AI health companion deployed across WhatsApp, LINE, and Telegram to provide accessible health guidance. Contributed as part of the backend development team, working with n8n workflow automation and PostgreSQL to integrate new features, monitor and debug workflows, manage database state, and maintain automated cron jobs.",
    features: [
      "Collaborated on the n8n automation backend managing multi-step conversational flows and AI tool lookups",
      "Integrated and tested new assistant features across WhatsApp, LINE, and Telegram messaging channels",
      "Managed PostgreSQL database queries for conversation logs, user profiles, and session states",
      "Configured automated cron jobs and schedulers for user follow-up reminders and routine maintenance",
      "Monitored workflow health, handled execution errors, and maintained automated GitHub backup pipelines",
    ],
    stack: [
      "n8n",
      "PostgreSQL",
      "WhatsApp API",
      "LINE API",
      "Telegram API",
      "AI APIs",
      "Cron Jobs",
      "Docker",
    ],
    github: "",
    live: "https://sabaihealth.com",
    image: "/images/projects/sabai_health_assistant/system_architecture_flowchart.webp",
    hasScroll: false,
    status: "live",
    gallery: [
      {
        title: "Autonomous AI Health Assistant System Architecture",
        src: "/images/projects/sabai_health_assistant/system_architecture_flowchart.webp",
        type: "diagram",
        aspectRatio: "1600/1000",
        width: 1600,
        height: 1000,
        column: "left",
      },
      {
        title: "Primary WhatsApp Ingestion & Agent Workflow",
        src: "/images/projects/sabai_health_assistant/main_workflow_whatsapp.jpeg",
        type: "desktop",
        aspectRatio: "1600/890",
        width: 1600,
        height: 890,
        column: "left",
      },
      {
        title: "Telegram Omnichannel Event-Driven Workflow",
        src: "/images/projects/sabai_health_assistant/main_workflow_telegram.jpeg",
        type: "desktop",
        aspectRatio: "1600/896",
        width: 1600,
        height: 896,
        column: "left",
      },
      {
        title: "n8n Multi-Workflow Orchestration Hub",
        src: "/images/projects/sabai_health_assistant/workflow_list.jpeg",
        type: "desktop",
        aspectRatio: "1600/890",
        width: 1600,
        height: 890,
        column: "left",
      },
      {
        title: "WhatsApp Patient Triage & Consultation Interface",
        src: "/images/projects/sabai_health_assistant/sabai_whatsapp.jpeg",
        type: "mobile",
        aspectRatio: "760/1600",
        width: 760,
        height: 1600,
        column: "middle",
      },
      {
        title: "Telegram Healthcare Assistant Chatbot Session",
        src: "/images/projects/sabai_health_assistant/sabai_telegram.jpeg",
        type: "mobile",
        aspectRatio: "761/1600",
        width: 761,
        height: 1600,
        column: "middle",
      },
      {
        title: "Contextual Sub-Workflow Diagnostic Routing",
        src: "/images/projects/sabai_health_assistant/sub_workflow.jpeg",
        type: "feature",
        aspectRatio: "1600/890",
        width: 1600,
        height: 890,
        column: "right",
      },
      {
        title: "Automated Patient Follow-up & Reminder Cron Job",
        src: "/images/projects/sabai_health_assistant/cron_job_1.jpeg",
        type: "feature",
        aspectRatio: "1600/848",
        width: 1600,
        height: 848,
        column: "right",
      },
      {
        title: "Scheduled Clinic Database Sync Cron Job",
        src: "/images/projects/sabai_health_assistant/cron_job2.jpeg",
        type: "feature",
        aspectRatio: "1600/862",
        width: 1600,
        height: 862,
        column: "right",
      },
      {
        title: "Automated GitHub Repository & Workflow Backup",
        src: "/images/projects/sabai_health_assistant/github_backup.jpeg",
        type: "feature",
        aspectRatio: "1600/856",
        width: 1600,
        height: 856,
        column: "right",
      },
      {
        title: "Integration Testing & Validation Harness",
        src: "/images/projects/sabai_health_assistant/test_workflow.jpeg",
        type: "feature",
        aspectRatio: "1600/874",
        width: 1600,
        height: 874,
        column: "right",
      },
    ],
    caseStudy: {
      context: "Omnichannel Health Assistant Backend & Automation",
      role: "Backend & Automation Developer (Team Project)",
      timeline: "Contract / Team Collaboration",
      outcome: "Reliable 24/7 multi-platform assistant serving users across Thailand and Southeast Asia",
      challenge: {
        summary:
          "Because Sabai operates directly inside third-party chat apps (WhatsApp, Telegram, and LINE), the backend handles continuous incoming webhooks across multiple platforms. With multiple developers collaborating on the system, the challenge was adding new features without disrupting existing flows, debugging intermittent API failures, and ensuring scheduled cron jobs executed reliably.",
        points: [
          "Incoming messages from three distinct messaging APIs required reliable webhook ingestion and monitoring to prevent dropped queries.",
          "Adding new assistant capabilities required careful testing in n8n to avoid breaking existing conversation states.",
          "Scheduled user follow-ups and database maintenance needed fail-safe cron automation without duplicate triggers.",
        ],
      },
      solution: {
        summary:
          "Collaborated with the backend team using n8n and PostgreSQL. Contributed by building sub-workflows for new features, debugging runtime errors, writing PostgreSQL queries, and configuring automated cron schedulers.",
        architecturePoints: [
          {
            title: "Feature Integration & Sub-Workflows",
            desc: "Built and connected dedicated n8n sub-workflows to roll out new assistant capabilities cleanly across WhatsApp, LINE, and Telegram.",
          },
          {
            title: "PostgreSQL State & Data Queries",
            desc: "Managed and queried relational database tables storing user profiles, interaction logs, and reminder states.",
          },
          {
            title: "Automated Cron Jobs & Schedulers",
            desc: "Configured scheduled n8n triggers for routine user check-ins, follow-up notifications, and automated database sync.",
          },
          {
            title: "Workflow Monitoring & Error Fixing",
            desc: "Investigated failed executions, resolved workflow bottlenecks, and maintained automated GitHub repository backups for version control.",
          },
        ],
      },
      stats: [
        { value: "3", label: "Messaging Platforms", detail: "WhatsApp, LINE, Telegram" },
        { value: "Team", label: "Collaboration", detail: "Joint backend & n8n development" },
        { value: "n8n + PG", label: "Core Stack", detail: "Workflow orchestration & database" },
        { value: "Cron", label: "Automation", detail: "Scheduled tasks & reminders" },
      ],
      keyHighlights: [
        "Collaborative feature rollout and workflow maintenance across WhatsApp, Telegram, and LINE",
        "Automated cron jobs for patient reminders, follow-ups, and scheduled sync",
        "Automated backup pipeline committing n8n workflows directly to GitHub for version control",
      ],
    },
  },
  {
    id: "project-management",
    title: "SprintFlow: Project Management System",
    tagline: "Centralized sprint orchestration and dependency tracking platform for engineering teams",
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
    caseStudy: {
      context: "Engineering Productivity & Sprint Orchestration",
      role: "Full-Stack Developer",
      timeline: "In Progress",
      outcome: "Real-time task synchronization with zero optimistic UI latency",
      challenge: {
        summary:
          "Engineering teams often struggle with disconnected sprint tracking tools that fail to clearly represent blocker cascades, task dependencies, and true team velocity.",
        points: [
          "Complex task dependency chains are poorly visualized in traditional column Kanban boards.",
          "Concurrent updates by multiple teammates cause out-of-sync board states.",
        ],
      },
      solution: {
        summary:
          "Engineering a responsive Kanban platform with directed acyclic dependency graphs, optimistic UI mutations, and role-based workspace permissions.",
        architecturePoints: [
          {
            title: "Optimistic State Engine",
            desc: "Card drag-and-drop operations commit instantly on the client while queueing background verification calls.",
          },
          {
            title: "Dependency Graph Visualization",
            desc: "Visual edge connections highlighting critical path blockers across multi-engineer milestones.",
          },
        ],
      },
      stats: [
        { value: "0ms", label: "Perceived UI Latency", detail: "Optimistic client mutations" },
        { value: "100%", label: "Real-time Sync", detail: "WebSockets & transactional persistence" },
      ],
      keyHighlights: [
        "Sprint velocity forecasting based on historical cycle times",
        "Granular permission scopes for admin, tech lead, and contributor roles",
      ],
    },
  },
  {
    id: "apartment-management",
    title: "HavenOps: Apartment & Tenant System",
    tagline: "Hierarchical property management and automated utility billing platform",
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
    caseStudy: {
      context: "Real Estate Operations & Automated Billing",
      role: "Full-Stack Developer",
      timeline: "In Progress",
      outcome: "Centralized property operations with automated billing calculation",
      challenge: {
        summary:
          "Independent property owners managing multi-floor residential complexes rely on manual spreadsheets, resulting in lost rent records, delayed utility billings, and unaddressed maintenance complaints.",
        points: [
          "Manual billing computations create frequent reconciliation errors.",
          "Disjointed tenant communications lead to missed repair escalations.",
        ],
      },
      solution: {
        summary:
          "Building a hierarchical building management system with automated monthly invoice generators, payment tracking, and tenant maintenance ticketing.",
        architecturePoints: [
          {
            title: "Hierarchical Unit Tree",
            desc: "Organized data models representing complexes, individual towers, floors, and rental units.",
          },
          {
            title: "Automated Monthly Billing Cron",
            desc: "Calculates variable electric/water utilities and fixed rent into consolidated monthly digital invoices.",
          },
        ],
      },
      stats: [
        { value: "4 Tiers", label: "Spatial Hierarchy", detail: "Complex, Building, Floor, Unit" },
        { value: "100%", label: "Automated Invoicing", detail: "Consolidated monthly billing" },
      ],
      keyHighlights: [
        "Tenant maintenance ticketing portal with photo uploads and priority flags",
        "Historical payment ledger and revenue forecasting dashboard",
      ],
    },
  },
  {
    id: "house-finder",
    title: "HavenRent: Rental Discovery Finder",
    tagline: "Specialized residential platform for verified long-term rentals without hospitality markups",
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
    caseStudy: {
      context: "Urban Housing & Long-Term Rental Discovery",
      role: "Full-Stack Developer",
      timeline: "In Progress",
      outcome: "Direct tenant-landlord matchmaking without brokerage friction",
      challenge: {
        summary:
          "Students and bachelor professionals face severe discrimination and opaque brokerage markups when searching for long-term residential housing in urban centers.",
        points: [
          "Short-stay travel platforms impose heavy hospitality markups on long-term tenants.",
          "Rental listings frequently omit critical bachelor policies, leading to wasted property visits.",
        ],
      },
      solution: {
        summary:
          "Creating a dedicated long-term residential directory featuring verified property specs, explicit tenancy criteria, and direct inquiry scheduling.",
        architecturePoints: [
          {
            title: "Demographic-Tailored Filters",
            desc: "Specialized filters for bachelor flats, family apartments, sublets, and sublease durations.",
          },
          {
            title: "Verified Landlord Protocol",
            desc: "Standardized listing guidelines detailing exact deposit requirements, utility policies, and curfew rules.",
          },
        ],
      },
      stats: [
        { value: "1+ Mo", label: "Rental Tenure", detail: "Long-term residential leases" },
        { value: "0%", label: "Brokerage Surcharge", detail: "Direct connection platform" },
      ],
      keyHighlights: [
        "In-person visit appointment scheduler with confirmation notifications",
        "Interactive neighborhood amenities map (transit, universities, groceries)",
      ],
    },
  },
] as const;

export function getProject(id: string): Project | undefined {
  return projects.find((p) => p.id === id);
}

export function getFeaturedProjects(): readonly Project[] {
  return projects.slice(0, 4);
}

export function getAllProjects(): readonly Project[] {
  return projects;
}

export function getAdjacentProjects(id: string): {
  prev: Project;
  next: Project;
} {
  const index = projects.findIndex((p) => p.id === id);
  const currentIndex = index >= 0 ? index : 0;
  const prevIndex = (currentIndex - 1 + projects.length) % projects.length;
  const nextIndex = (currentIndex + 1) % projects.length;

  return {
    prev: projects[prevIndex],
    next: projects[nextIndex],
  };
}
