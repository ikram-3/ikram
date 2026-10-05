// PROFILE MODULE — Skill groups.
// Facts Gate: traced verbatim to portfolio/portfolio.json (skills[]).

export interface SkillGroup {
  category: string;
  items: string[];
}

export const skillGroups: SkillGroup[] = [
  { category: "AI & Machine Learning", items: ["RAG", "Agentic AI", "Deep Learning", "CNN", "RNN", "Computer Vision (YOLO)", "NLP", "Transformers", "LangChain", "Hugging Face", "Groq", "Pinecone", "ChromaDB"] },
  { category: "Backend & APIs", items: ["Python", "PHP", "FastAPI", "Laravel", "Django", "Node.js", "RESTful Architecture", "SQL"] },
  { category: "Frontend", items: ["JavaScript", "TypeScript", "React.js", "Next.js", "Tailwind CSS", "HTML/CSS", "shadcn/ui", "Streamlit", "Vite"] },
  { category: "Mobile", items: ["Flutter", "Dart"] },
  { category: "Data & Visualization", items: ["Pandas", "NumPy", "Matplotlib", "Seaborn", "Jupyter", "MySQL", "PostgreSQL", "SQLite", "Redis"] },
  { category: "Tools & Automation", items: ["Playwright", "Git/GitHub", "Docker", "PyTorch", "TensorFlow", "Webhooks", "LLM APIs (Gemini/Groq)"] },
];

/** Standing learning note — traced verbatim to portfolio/pages/about-and-skills.md. */
export const currentlyDeepening =
  "Currently deepening: distributed systems, ML productionization, and multi-tenant architecture.";
