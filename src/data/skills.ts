export type SkillCategory = {
  name: string;
  items: readonly string[];
};

export const skillCategories: readonly SkillCategory[] = [
  {
    name: "Frontend",
    items: ["React", "Next.js", "TypeScript", "UI/UX Integration"],
  },
  {
    name: "Backend & Databases",
    items: ["Node.js", "Express", "PostgreSQL", "MongoDB"],
  },
  {
    name: "AI & Automation",
    items: [
      "n8n",
      "Custom AI Agents",
      "RAG Architecture",
      "LLM APIs (Claude, Gemini, DeepSeek)",
      "Ollama",
    ],
  },
  {
    name: "DevOps",
    items: ["Docker", "Git", "Linux (WSL)", "Shell Scripting", "C++"],
  },
] as const;

export const competitiveProgramming = {
  codeforces: {
    url: "" /* TODO: Codeforces profile URL */,
    rating: "" /* TODO: current rating, e.g. "1400 (Specialist)" */,
  },
  leetcode: {
    url: "" /* TODO: LeetCode profile URL */,
    problemsSolved: "" /* TODO: e.g. "350+" */,
  },
  note: "Daily practice in algorithms and data structures",
} as const;
