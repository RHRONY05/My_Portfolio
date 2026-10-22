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

export type ProjectScreenshot = {
  title: string;
  src: string;
  caption?: string;
  type?: "desktop" | "mobile" | "diagram" | "feature";
  aspectRatio?: string;
  width?: number;
  height?: number;
  slot?: GallerySlot;
};

export type Project = {
  id: string;
  title: string;
  tagline: string;
  category: ProjectCategory;
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
    title: "ShopMate AI: Autonomous Agent & Semantic E-Commerce",
    tagline: "Autonomous shopping orchestrator with pgvector embeddings & 4-tier session memory",
    category: "AI/RAG",
    description:
      "An autonomous AI shopping assistant and e-commerce platform orchestrating high-dimensional semantic vector search (pgvector), live PostgreSQL operational inventory, in-memory tool calling, and real-time client UI sync.",
    features: [
      "Semantic similarity search across sports apparel using Google text-embedding-004 (768 dimensions) via pgvector",
      "Autonomous tool-calling loop reasoning across 4 dedicated knowledge tiers without hallucinating out-of-stock items",
      "Authoritative PostgreSQL relational inventory with variant-level stock locks and atomic shopping cart mutations",
      "Redis session memory with sliding-window multi-turn reference resolution and contextual kit comparisons",
    ],
    stack: [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "PostgreSQL",
      "pgvector",
      "Redis",
      "Google Gemini API",
      "Prisma",
      "Docker",
    ],
    github: "https://github.com/RHRONY05/ShopMate_AI",
    live: "",
    image: "/images/projects/shopmate-ai/scrolling_img.webp",
    gallery: [
      {
        title: "ShopMate AI Primary Interface",
        src: "/images/projects/shopmate-ai/landing_page.webp",
        type: "desktop",
        aspectRatio: "1888/915",
        width: 1888,
        height: 915,
        slot: "col1-top",
      },
      {
        title: "Real-time Shopping Bag & Cart Drawer",
        src: "/images/projects/shopmate-ai/shopping_bag.webp",
        type: "feature",
        aspectRatio: "1700/774",
        width: 1700,
        height: 774,
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
      context: "Autonomous E-Commerce Assistant & High-Dimensional Semantic Search",
      role: "Lead Full-Stack & AI Architect",
      timeline: "4 Weeks (October 2026)",
      outcome: "Zero-hallucination conversational shopping with sub-15ms vector retrieval",
      challenge: {
        summary:
          "Traditional e-commerce keyword searches fail completely when buyers describe items emotionally or visually (e.g. 'show me a vintage kit with gold collar detailing' or 'a sleek dark away kit for street style'). Furthermore, generic LLM chatbots hallucinate out-of-stock inventory, cannot verify current pricing, and produce unstructured text walls rather than actionable, interactive UI cards.",
        points: [
          "Keyword search cannot parse subjective, emotional, or stylistic clothing queries.",
          "LLMs inherently lack real-time awareness of fast-moving inventory and variable sizes.",
          "Complex cart manipulations (e.g. 'swap that Real Madrid kit to size M and add sleeve badges') require multi-turn reference resolution.",
        ],
      },
      solution: {
        summary:
          "Engineered an autonomous AI orchestrator decoupled into 4 distinct knowledge tiers. The Gemini model acts as a reasoning brain equipped with declared function tools, querying dedicated database layers only when required.",
        architecturePoints: [
          {
            title: "Tier 1: Semantic Discovery (pgvector & text-embedding-004)",
            desc: "Indexed 768-dimensional mathematical coordinates in PostgreSQL. Uses cosine distance operators (<=>) to execute millisecond vector similarity lookups on stylistic queries.",
          },
          {
            title: "Tier 2: Live Operational State (Prisma Relational Tables)",
            desc: "Authoritative real-time relational truth covering variant stock counts, server-authoritative prices, and active cart sessions to completely eliminate out-of-stock hallucinations.",
          },
          {
            title: "Tier 3: Domain Rules & Business Logic (In-Memory System Rules)",
            desc: "Hardcoded store policies (custom player name/number printing fees, return windows, slim-fit sizing guides) preventing unnecessary database queries.",
          },
          {
            title: "Tier 4: Working Session Memory (Redis via ioredis)",
            desc: "TTL-expiring conversation cache maintaining sliding-window turns to seamlessly resolve conversational pronouns and multi-turn references.",
          },
        ],
      },
      stats: [
        { value: "~12ms", label: "Semantic Search Latency", detail: "pgvector index retrieval" },
        { value: "768-dim", label: "Vector Embeddings", detail: "Google text-embedding-004" },
        { value: "100%", label: "Inventory Accuracy", detail: "Zero out-of-stock hallucination" },
        { value: "4 Tiers", label: "Specialized Knowledge", detail: "Dedicated architectural layers" },
      ],
      keyHighlights: [
        "Autonomous Gemini tool execution loop (semantic search, stock checks, cart operations)",
        "Rich UI card dispatch returning interactive product carousels to the client",
        "Multi-container production setup with Docker Compose, PostgreSQL pgvector, and Redis",
      ],
    },
  },
  {
    id: "sabaihealth",
    title: "SabaiHealth Web Platform",
    tagline: "Bilingual healthcare web platform with integrated digital NDA e-signature workflows",
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
      context: "International Healthcare & Patient Onboarding",
      role: "Lead Frontend Engineer",
      timeline: "4 Weeks",
      outcome: "Paperless patient & partner onboarding across Southeast Asian clinics",
      challenge: {
        summary:
          "SabaiHealth required an accessible digital presence to onboard healthcare partners and international patients. Legal compliance demanded strict Non-Disclosure Agreements (NDAs) signed prior to consultations, while the audience required fluid switching between Thai and English scripts without layout breakage.",
        points: [
          "Traditional PDF printing and scanning caused massive drop-offs in partner onboarding.",
          "Thai typography has unique ascenders/descenders that cause layout shifts in standard CSS containers.",
          "International latency required lightweight bundle sizes for fast mobile loading.",
        ],
      },
      solution: {
        summary:
          "Engineered a Next.js web platform featuring an in-browser HTML5 digital signature pad, secure PDF generation, and an internationalization layer calibrated for Southeast Asian typography.",
        architecturePoints: [
          {
            title: "In-Browser Cryptographic E-Signature",
            desc: "Smooth touch-sensitive signature canvas capturing strokes, generating timestamps, and producing downloadable NDA certificates.",
          },
          {
            title: "Bilingual Thai/English Typography Pipeline",
            desc: "Custom CSS typographic leading and line-height normalizers ensuring equal visual weight between Thai and Latin character sets.",
          },
          {
            title: "Asset Optimization & Zero Layout Shift",
            desc: "Next.js static optimization with responsive image sizing ensuring sub-1.5s mobile loading in overseas network conditions.",
          },
        ],
      },
      stats: [
        { value: "2", label: "Languages Supported", detail: "Thai & English localization" },
        { value: "100%", label: "Paperless Onboarding", detail: "In-browser NDA e-signatures" },
        { value: "98", label: "Lighthouse Desktop", detail: "Near-perfect performance" },
        { value: "<1.4s", label: "Mobile LCP", detail: "Fast international loading" },
      ],
      keyHighlights: [
        "Cryptographic audit trail with IP and timestamp stampings on signed agreements",
        "Accessible color contrast ratios adhering strictly to WCAG 2.1 AA standards",
        "Modular partner inquiry intake pipeline feeding directly into clinic workflows",
      ],
    },
  },
  {
    id: "movie-booking",
    title: "CineReserve: Cinema Booking System",
    tagline: "Zero-race-condition cinema reservation engine with PostgreSQL ACID row-level locking",
    category: "Full Stack",
    description:
      "A full-stack cinema reservation architecture engineered to solve high-concurrency race conditions when hundreds of users compete for identical seats simultaneously. Features Google OAuth authentication, interactive hall maps, automated CI/CD pipelines, and multi-service Docker containerization on a production VPS.",
    features: [
      "ACID transaction isolation & row-level locking to eliminate double-booking race conditions during high-volume spikes",
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
        slot: "col1-top",
      },
      {
        title: "User Authentication & OAuth",
        src: "/images/projects/movie-booking/auth.webp",
        type: "feature",
        aspectRatio: "705/565",
        width: 705,
        height: 565,
        slot: "col1-bottom-left",
      },
      {
        title: "Two-Factor OTP Verification",
        src: "/images/projects/movie-booking/otp_verification.webp",
        type: "feature",
        aspectRatio: "721/693",
        width: 721,
        height: 693,
        slot: "col1-bottom-right",
      },
      {
        title: "Now Showing & Upcoming Cinema Schedule",
        src: "/images/projects/movie-booking/movies.webp",
        type: "desktop",
        aspectRatio: "1256/833",
        width: 1256,
        height: 833,
        slot: "col2-top",
      },
      {
        title: "Interactive Hall Spatial Matrix & Seat Booking",
        src: "/images/projects/movie-booking/book_seat.webp",
        type: "feature",
        aspectRatio: "989/785",
        width: 989,
        height: 785,
        slot: "col3-top",
      },
    ],
    status: "live",
    caseStudy: {
      context: "High-Volume Ticketing & Distributed Systems",
      role: "Full-Stack & DevOps Engineer",
      timeline: "5 Weeks",
      outcome: "Zero double-booking race conditions under high-concurrency seat locking tests",
      challenge: {
        summary:
          "During major movie premieres, hundreds of users attempt to purchase identical premiere seats at the exact same millisecond. Naive database architectures permit dirty reads and duplicate booking commits, corrupting transactional integrity and angering customers.",
        points: [
          "Concurrent requests cause race conditions where two users successfully checkout the same seat.",
          "Connection pool exhaustion occurs during sudden traffic surges without load balancing.",
          "Manual deployments to virtual servers lead to configuration drift and unexpected downtime.",
        ],
      },
      solution: {
        summary:
          "Architected an Express and PostgreSQL backend utilizing explicit row-level locking (SELECT ... FOR UPDATE) inside isolated ACID database transactions, bundled in Docker containers with automated CI/CD deployment.",
        architecturePoints: [
          {
            title: "ACID Row-Level Locking (SELECT ... FOR UPDATE)",
            desc: "Locks target seat rows immediately upon selection, blocking competing transactions until the checkout completes or expires.",
          },
          {
            title: "Interactive Hall Spatial Matrix",
            desc: "Responsive SVG/HTML5 interactive canvas rendering hall geometries with real-time color-coded seat reservation states.",
          },
          {
            title: "Dockerized Multi-Service Mesh",
            desc: "Containerized React frontend, Express API gateway, and PostgreSQL database orchestrating through a unified Docker network.",
          },
          {
            title: "Production VPS with Nginx Reverse Proxy",
            desc: "Configured upstream rate-limiting, SSL termination, and automated deployment through GitHub Actions webhooks.",
          },
        ],
      },
      stats: [
        { value: "0", label: "Double-Booking Errors", detail: "Eliminated under stress testing" },
        { value: "500+", label: "Concurrent Seat Locks", detail: "Handled without state corruption" },
        { value: "100%", label: "Automated Deployments", detail: "GitHub Actions CI/CD pipeline" },
        { value: "A+", label: "SSL Security Grade", detail: "Production Nginx reverse proxy" },
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
    title: "Calowry: Sustainable Fibre Innovation",
    tagline: "Corporate product showcase for ecological coconut mesocarp micronisation technology",
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
      context: "Sustainable Biomaterials & Industrial Showcase",
      role: "Frontend Developer",
      timeline: "3 Weeks",
      outcome: "Interactive enterprise product showcase with direct sample inquiry pipelines",
      challenge: {
        summary:
          "Calowry Inc needed an authoritative corporate interface to present their proprietary coconut mesocarp micronisation technology to global enterprise buyers across food, pharma, and cosmetic sectors.",
        points: [
          "Complex biochemical and agricultural data needed intuitive visual explanation.",
          "B2B procurement teams required fast access to technical specifications and sample requests.",
          "Brand needed to project both environmental sustainability and industrial precision.",
        ],
      },
      solution: {
        summary:
          "Engineered a modern single-page application featuring interactive sector explorers, technical datasheets, and direct customer inquiry channels.",
        architecturePoints: [
          {
            title: "Multi-Sector Application Matrix",
            desc: "Segmented product utility into dedicated interactive sectors (Food, Cosmetics, Pharmaceuticals, Industrial).",
          },
          {
            title: "Technical Datasheet Distribution",
            desc: "Direct access to laboratory testing specs, solubility metrics, and biological purity certificates.",
          },
          {
            title: "Responsive SPA Performance",
            desc: "Engineered with Vite and modern Tailwind CSS utility styling for instant client navigation.",
          },
        ],
      },
      stats: [
        { value: "4", label: "Target Sectors", detail: "Food, Pharma, Cosmetics, Industrial" },
        { value: "100%", label: "Eco-Friendly Material", detail: "Coconut mesocarp upcycling" },
        { value: "<1s", label: "Vite Load Time", detail: "Ultra-fast client bundle" },
      ],
      keyHighlights: [
        "Interactive material properties comparison cards",
        "Integrated B2B industrial sample request form",
        "Clean, earthy aesthetic reflecting sustainable bio-manufacturing",
      ],
    },
  },
  {
    id: "vocab-app",
    title: "Vocab: Intelligent Spaced Repetition Web App",
    tagline: "Private vocabulary mastery engine with Leitner 5-Box spaced repetition & Gemini AI lookup",
    category: "AI/RAG",
    description:
      "A private, high-efficiency vocabulary study application powered by Google Gemini API (@google/genai), implementing the Leitner 5-box spaced repetition algorithm, intelligent weakness scoring, and bilingual English-Bangla parsing.",
    features: [
      "Instant structured word breakdown powered by Google Gemini (Bangla translation, register, collocations, grammatical patterns)",
      "Repeat lookup detection serving saved cards instantaneously with zero redundant AI calls",
      "Mathematical Leitner 5-box spaced repetition engine (1d, 3d, 7d, 14d, 30d) with Efraimidis-Spirakis weighted sampling",
      "Interactive sentence tester and chat for real-time grammar feedback and usage verification",
      "Browser search shortcut (v <word>) enabling instant address bar lookup from any application or browser tab",
      "Automated Vercel keepalive cron preventing Supabase free-tier inactivity hibernation",
    ],
    stack: [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "Tailwind CSS v4",
      "Supabase",
      "PostgreSQL",
      "Google Gemini API",
      "Vitest",
      "Playwright",
    ],
    github: "https://github.com/RHRONY05/Vocab_App",
    live: "https://vocab-rony.vercel.app",
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
        slot: "col1-top",
      },
      {
        title: "Spaced Repetition Mastery Dashboard",
        src: "/images/projects/vocab-app/dashboard.webp",
        type: "desktop",
        aspectRatio: "1847/836",
        width: 1847,
        height: 836,
        slot: "col1-bottom",
      },
      {
        title: "Leitner 5-Box Daily Review Flashcard",
        src: "/images/projects/vocab-app/review.webp",
        type: "feature",
        aspectRatio: "852/757",
        width: 852,
        height: 757,
        slot: "col2-top",
      },
      {
        title: "Sentence Tester & Active Recall Quiz",
        src: "/images/projects/vocab-app/quiz.webp",
        type: "feature",
        aspectRatio: "897/698",
        width: 897,
        height: 698,
        slot: "col2-bottom",
      },
      {
        title: "Mobile Native Active Study View",
        src: "/images/projects/vocab-app/mobile_home_page.webp",
        type: "mobile",
        aspectRatio: "761/1600",
        width: 761,
        height: 1600,
        slot: "col3-top",
      },
      {
        title: "User Authentication & Sync Access",
        src: "/images/projects/vocab-app/auth.webp",
        type: "feature",
        aspectRatio: "388/588",
        width: 388,
        height: 588,
        slot: "col3-bottom",
      },
    ],
    status: "live",
    caseStudy: {
      context: "Personal Study & Cognitive Engineering Tool",
      role: "Solo Developer & Product Architect",
      timeline: "2 Weeks (October 2026)",
      outcome: "Zero-latency active recall study system with automated spaced repetition schedules",
      challenge: {
        summary:
          "Managing vocabulary across Notion and generic flashcard apps created severe friction during reading and client communication. Disjointed tools lacked structured linguistic nuances (register, grammatical collocation, subtle distinctions), while manual card creation was slow and spaced review schedules were haphazardly tracked.",
        points: [
          "Manual word capture interrupted reading flow and documentation study.",
          "Dictionary lookups lacked context, natural bilingual translations, and common usage traps.",
          "Flashcard tools lacked automated active recall quiz generation upon word capture.",
        ],
      },
      solution: {
        summary:
          "Architected a desktop-first vocabulary dashboard integrating Google Gemini API with Zod structured output validation and a deterministic Leitner 5-box spaced repetition algorithm in PostgreSQL/Supabase.",
        architecturePoints: [
          {
            title: "Structured Gemini Schema Parsing",
            desc: "Extracts part of speech, register, natural English explanation, Bangla translation, usage tips, and 'Don't confuse with' distinctions into strictly validated JSON.",
          },
          {
            title: "Leitner 5-Box Spaced Repetition Engine",
            desc: "Schedules reviews across 1d, 3d, 7d, 14d, and 30d intervals. Uses dynamic weakness scores that prioritize overdue and forgotten words.",
          },
          {
            title: "Instant Browser Omnibox Integration",
            desc: "Custom URL handler mapping 'v <word>' directly to the web app, allowing one-key word exploration straight from Chrome or Brave address bars.",
          },
          {
            title: "Automated Supabase Keepalive Cron",
            desc: "Daily authenticated serverless edge function pinging PostgreSQL to prevent free-tier database sleep cycles.",
          },
        ],
      },
      stats: [
        { value: "5-Box", label: "Spaced Intervals", detail: "Leitner cognitive decay curve" },
        { value: "1-Click", label: "Active Recall Quizzes", detail: "3 automatic questions per word" },
        { value: "<1.2s", label: "AI Parsing Latency", detail: "Gemini structured schema response" },
        { value: "100%", label: "Uptime Maintenance", detail: "Automated daily keepalive cron" },
      ],
      keyHighlights: [
        "1-Click or Ctrl+S instant word saving with zero workflow disruption",
        "Dual review modes: Daily Review (capped at 15 words) and Targeted Practice with weighted sampling",
        "Comprehensive automated test suite spanning Vitest, Playwright E2E, and Axe-core accessibility",
      ],
    },
  },
  {
    id: "portfolio",
    title: "Developer Portfolio (rhrony05.me)",
    tagline: "High-performance 3D portfolio with dynamic themes, comic book dossier & 99 CWV",
    category: "Frontend",
    description:
      "High-performance, interactive 3D developer portfolio featuring real-time WebGL environments, dynamic multi-palette theme engine, and graphic novel dossier mechanics.",
    features: [
      "Interactive Three.js / React Three Fiber open-air cinema & 3D book dossier",
      "Dynamic 8-palette theme switcher & real-time typography system",
      "Smooth GPU spring physics and continuous 3D card deck interactions",
    ],
    stack: ["Next.js 16", "React 19", "Three.js", "R3F", "Tailwind CSS v4", "Framer Motion"],
    github: "",
    live: "https://rhrony05.me",
    image: "/images/projects/my_portfolio.webp",
    status: "live",
    caseStudy: {
      context: "Personal Engineering Brand & Interactive 3D Showcase",
      role: "Solo Architect & Creative Technologist",
      timeline: "3 Weeks",
      outcome: "99 Lighthouse desktop score with interactive 3D WebGL scenes",
      challenge: {
        summary:
          "Creative 3D portfolios commonly suffer from disastrous Core Web Vitals scores (excessive Total Blocking Time, multi-megabyte bundle sizes, mobile battery drain) and inflexible static styling that feels rigid.",
        points: [
          "Heavy Three.js canvases block the main thread during initial page hydration.",
          "Multiple concurrent WebGL contexts exhaust GPU memory on mobile devices.",
          "Hardcoded styling prevents easy exploration of different aesthetic themes.",
        ],
      },
      solution: {
        summary:
          "Architected a custom lazy viewport mounting system with render functions, unified WebGL context lifecycle management, and a dynamic CSS variable token engine supporting 8 dark/light palettes in real time.",
        architecturePoints: [
          {
            title: "LazyViewportMount Render Functions",
            desc: "Deferred dynamic chunk loaders and heavy Three.js assets until the user's viewport nears the canvas, ensuring instant first paints.",
          },
          {
            title: "Dynamic Token & Theme System",
            desc: "All UI components and Three.js materials dynamically synchronize with 8 curated dark/light palettes via custom DOM events.",
          },
          {
            title: "Procedural Comic Book Kinematics",
            desc: "Interactive 3D book mesh featuring procedural paper ridges, glowing bevels, camera zoom rig, and realistic page-turn physics.",
          },
        ],
      },
      stats: [
        { value: "99", label: "Desktop Lighthouse", detail: "Near-perfect Core Web Vitals" },
        { value: "8", label: "Dynamic Themes", detail: "Real-time CSS variable engine" },
        { value: "0", label: "Cumulative Layout Shift", detail: "Zero layout shift on font changes" },
        { value: "60 FPS", label: "WebGL Rendering", detail: "Optimized geometry and shaders" },
      ],
      keyHighlights: [
        "Hidden desktop runner game with clean screenshot mode for social sharing",
        "Mahoraga eight-spoked horizontal halo load balancer reacting to active themes",
        "Strict zero-hardcoding token discipline across all Tailwind v4 styling",
      ],
    },
  },
  {
    id: "sabai-chatbot",
    title: "Sabai: Autonomous AI Health Assistant",
    tagline: "Omnichannel healthcare triage agent deployed across WhatsApp, Telegram, and LINE",
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
    caseStudy: {
      context: "Omnichannel Healthcare Automation & Triage",
      role: "AI Automation Architect",
      timeline: "In Progress",
      outcome: "24/7 automated first-line triage across major messaging platforms",
      challenge: {
        summary:
          "Healthcare clinics are inundated with repetitive patient queries regarding clinic hours, initial symptom guidance, and appointment booking, overwhelming staff and delaying urgent care.",
        points: [
          "High volume of routine inquiries delays response times for urgent patients.",
          "Patients prefer using their everyday messaging apps (WhatsApp, Telegram, LINE) rather than downloading dedicated hospital apps.",
          "Medical guidance must be strictly grounded in verified clinical protocols without hallucinations.",
        ],
      },
      solution: {
        summary:
          "Developing a unified multi-channel AI assistant orchestrating through n8n workflows, RAG knowledge bases, and verified clinical routing rules.",
        architecturePoints: [
          {
            title: "Omnichannel Webhook Mesh",
            desc: "Unified ingestion endpoint normalizing incoming messages from WhatsApp, Telegram, and LINE into a single conversation state.",
          },
          {
            title: "Grounded Medical RAG Layer",
            desc: "Domain-specific vector database querying verified clinic documentation and symptom guidelines before responding.",
          },
          {
            title: "Automated Doctor Hand-off",
            desc: "Urgency classification algorithm automatically elevating high-risk inquiries to live clinical staff.",
          },
        ],
      },
      stats: [
        { value: "3", label: "Messaging Platforms", detail: "WhatsApp, Telegram, LINE" },
        { value: "24/7", label: "Automated Availability", detail: "Instant triage responses" },
        { value: "0", label: "App Installs Required", detail: "Direct native messaging" },
      ],
      keyHighlights: [
        "Multi-language support for regional Southeast Asian patient bases",
        "Strict HIPAA/PDPA privacy compliance and conversation redaction",
        "Automated calendar booking and clinic schedule synchronization",
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
      role: "Full-Stack Architect",
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
      role: "Full-Stack Engineer",
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
