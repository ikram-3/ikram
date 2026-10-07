// PROFILE MODULE — Narrative: headline, positioning, long-form about copy.
// Facts Gate: copy traced verbatim to portfolio/pages/about-and-skills.md + portfolio.json.

export const summary = {
  headline:
    "I build modern web applications, practical AI assistants, and complete business software — from smart RAG systems to POS and management platforms.",
  subheadline:
    "Delivering complete solutions from intuitive frontends to reliable backends, databases, and smooth cloud deployments.",
  aboutShort:
    "Software Engineer specializing in modern web applications and practical AI solutions. Experienced in Next.js, React, TypeScript, Python, FastAPI, and Laravel. KPITB Generative AI Fellow building scalable, user-focused digital products.",
  positioning: {
    employers:
      "Full-stack engineer dedicated to writing clean, maintainable code and delivering complete business applications with integrated modern capabilities.",
    aiRoles:
      "Building practical AI systems: accurate RAG pipelines with source citations, autonomous agent workflows, and computer vision tools.",
    clients:
      "End-to-end software development: frontend, backend APIs, database design, and cloud deployment ready for real users.",
  },
} as const;

/** Long-form about copy — written in a natural, authentic, human voice. */
export const aboutParagraphs: readonly string[] = [
  `I'm Muhammad Ikram, a Software Engineer and KPITB Generative AI Fellow studying at the University of Swat. I love building practical software that solves day-to-day problems for businesses and people.`,
  `My background combines full-stack web engineering with practical artificial intelligence. When building AI systems, I focus on reliability — creating assistants that reference real data accurately, automate routine tasks, and extract meaningful insights. When building web platforms, I focus on the details that make software a pleasure to use: clean UI design, fast page loads, secure user access, reliable payments, and straightforward dashboards.`,
  `I work across TypeScript, React/Next.js, Python, FastAPI, and PHP/Laravel, choosing the best tools for each project. My goal on every project is simple: write maintainable code and deliver software that works seamlessly in the real world.`,
] as const;
