import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeManager } from "@/components/ThemeManager";
import { profile } from "@/data/profile";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

const siteUrl = "https://rhrony05.me";
const siteTitle = "RH.RONY (Muhammad Rony) — Software Developer — Web & AI";
const siteDescription =
  "Portfolio of Muhammad Rony (RH.RONY) — Software Developer (Web & AI) from CUET CSE. Building production web platforms & AI integrations.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteTitle,
    template: "%s | RH.RONY",
  },
  description: siteDescription,
  applicationName: "RH.RONY Portfolio",
  authors: [{ name: "Muhammad Rony (RH.RONY)", url: siteUrl }],
  generator: "Next.js 16",
  keywords: [
    "Muhammad Rony",
    "Md. Robiul Hasan Rony",
    "Md. Rony Hossain",
    "Robiul Hasan Rony",
    "Rony",
    "RH.RONY",
    "CUET CSE",
    "Chittagong University of Engineering and Technology",
    "Full-Stack Developer",
    "Software Engineer",
    "AI Automation Specialist",
    "Next.js",
    "React 19",
    "Three.js",
    "React Three Fiber",
    "TypeScript",
    "Node.js",
    "Tailwind CSS",
    "Agentic Workflows",
    "LLM Integration",
  ],
  creator: "Muhammad Rony (RH.RONY)",
  publisher: "RH.RONY",
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    title: siteTitle,
    description: siteDescription,
    siteName: "RH.RONY Portfolio",
    images: [
      {
        url: "/images/og-preview.png",
        width: 1200,
        height: 630,
        alt: "RH.RONY (Muhammad Rony) — Software Developer — Web & AI",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    creator: "@rhrony_05",
    images: ["/images/og-preview.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/images/logo/logo.svg", type: "image/svg+xml" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    shortcut: "/images/logo/logo.svg",
    apple: "/images/logo/logo.svg",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Muhammad Rony",
  alternateName: [
    "RH.RONY",
    "Md. Robiul Hasan Rony",
    "Md. Rony Hossain",
    "Robiul Hasan Rony",
    "Rony",
  ],
  url: siteUrl,
  image: `${siteUrl}/images/og-preview.png`,
  jobTitle: "Software Developer — Web & AI",
  worksFor: {
    "@type": "Organization",
    name: "Independent / Freelance",
  },
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "Chittagong University of Engineering and Technology (CUET)",
    department: "Computer Science & Engineering",
  },
  email: profile.email,
  sameAs: [
    profile.links.github,
    profile.links.linkedin,
    profile.links.twitter,
  ].filter(Boolean),
  knowsAbout: [
    "Full-Stack Web Development",
    "Autonomous AI Agents",
    "Next.js",
    "React 19",
    "TypeScript",
    "Node.js",
    "Three.js & WebGL",
    "Workflow Automation",
    "Python",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          as="font"
          type="font/woff2"
          href="https://fonts.gstatic.com/s/originalsurfer/v25/RWmQoKGZ9vIirYntXJ3_MbekzNMSC0FuIFWcKg.woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Lusitana:wght@400;700&family=Original+Surfer&family=Ruwudu:wght@400;500;600;700&display=swap"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-canvas text-fg">
        <ThemeManager />
        {children}
      </body>
    </html>
  );
}
