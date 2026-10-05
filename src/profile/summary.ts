// PROFILE MODULE — Narrative: headline, positioning, long-form about copy.
// Facts Gate: copy traced verbatim to portfolio/pages/about-and-skills.md + portfolio.json.

export const summary = {
  headline:
    "I build production AI agents and complete business platforms — from RAG assistants to restaurant POS, hospital systems, and enterprise ERP.",
  subheadline:
    "Every project ships end-to-end: frontend, backend, payments, deployment. One-click deployable.",
  aboutShort:
    "Software Engineer building production AI agents & complete business platforms — RAG chatbots with citations, POS, CMS, hospital & ERP systems. Python · Next.js · FastAPI · Laravel. KPITB Generative AI Fellow. Ships end-to-end, deploys one-click.",
  positioning: {
    employers:
      "Full-stack engineer who ships complete business systems — POS, CMS, ERP, Healthcare — with AI built in, not bolted on.",
    aiRoles:
      "I build grounded AI: RAG pipelines with citations, agentic tool-use loops, and real-time CV systems — deployed and live.",
    clients:
      "One developer, entire product: frontend, backend, payments, deployment — production-ready and one-click deployable.",
  },
} as const;

/** Long-form about copy — traced verbatim to portfolio/pages/about-and-skills.md. */
export const aboutParagraphs: readonly string[] = [
  `I'm Muhammad Ikram — a Software Engineering student at the University of Swat and a KPITB Generative AI fellow who ships real systems, not prototypes.`,
  `My work spans two worlds that I refuse to keep separate: applied AI and complete product engineering. On the AI side, I build grounded systems — RAG pipelines that cite their sources instead of hallucinating, agentic assistants that safely execute 50+ real tools, and computer-vision pipelines that detect traffic violations in real time. On the product side, I build the unglamorous parts that make software actually usable: role-based access, payment flows, invoice printing at exact 80mm thermal sizing, inventory that auto-deducts from recipes, and dashboards managers actually open every morning.`,
  `I've deployed 4 live systems and packaged the rest for one-click Docker/Vercel deployment. I work across Python, PHP, JavaScript/TypeScript, and Flutter — because the stack should serve the problem, not the other way around.`,
] as const;
