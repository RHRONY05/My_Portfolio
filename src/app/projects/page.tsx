import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { projects } from "@/data/projects";
import { ProjectsDirectoryClient } from "./ProjectsDirectoryClient";

export const metadata: Metadata = {
  title: "Projects // RH.RONY",
  description:
    "Directory of production web applications, autonomous AI agents, and system architectures engineered by Muhammad Rony.",
};

export default function ProjectsPage() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-canvas text-fg pt-24 sm:pt-28 md:pt-32 pb-20 overflow-x-clip">
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ProjectsDirectoryClient projects={projects} />
        </div>
      </main>

      <Footer />
    </>
  );
}
