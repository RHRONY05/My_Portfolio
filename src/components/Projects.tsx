"use client";

import { ProjectDeck } from "@/components/projects/ProjectDeck";
import { LazyViewportMount } from "@/components/common/LazyViewportMount";

export function Projects() {
  return (
    <LazyViewportMount
      fallback={
        <div className="flex h-[420px] w-full items-center justify-center">
          <div className="size-8 animate-spin rounded-full border-2 border-line border-t-accent" />
        </div>
      }
    >
      {() => <ProjectDeck />}
    </LazyViewportMount>
  );
}
