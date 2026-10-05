// PROFILE MODULE — Service lines & engagement process.
// Derived narrative: every "proof" line cites a real project from the 35-project registry
// (Facts Gate — no invented clients, numbers, or credentials).

export interface Service {
  id: string;
  icon: "globe" | "brain" | "bot" | "smartphone" | "chart" | "wrench";
  title: string;
  description: string;
  /** Factual anchor — a shipped project that proves the capability. */
  proof: string;
  proofSlug: string;
}

export const services: Service[] = [
  {
    id: "web-platforms",
    icon: "globe",
    title: "Web Platforms & Business Systems",
    description:
      "Complete products — POS, CMS, ERP, healthcare, e-commerce — with role-based access, payments, invoices at exact 80mm thermal sizing, and dashboards managers open every morning.",
    proof: "BiteBox POS — live deployment",
    proofSlug: "bitebox-pos",
  },
  {
    id: "ai-agents",
    icon: "brain",
    title: "AI Agents & RAG Assistants",
    description:
      "Grounded AI: retrieval pipelines that cite their sources instead of hallucinating, agentic tool-use loops executing 50+ real tools safely, and evaluation you can defend.",
    proof: "Agentic ChatBot — University of Swat",
    proofSlug: "agentic-chatbot",
  },
  {
    id: "automation",
    icon: "bot",
    title: "Automation & Bots",
    description:
      "Headless-browser engines, scrapers, and workflow bots that remove repetitive work — packaged with Docker and wired to webhooks.",
    proof: "Headless Scraping Automation Engine",
    proofSlug: "headless-scraping-engine",
  },
  {
    id: "mobile",
    icon: "smartphone",
    title: "Mobile Apps (Flutter)",
    description:
      "Cross-platform applications from idea to store-ready build — offline-friendly, driven by the same backends as the web.",
    proof: "TailorTrack — tailoring shop tracker",
    proofSlug: "tailortrack",
  },
  {
    id: "data",
    icon: "chart",
    title: "Data & Analytics",
    description:
      "Analysis pipelines, visualization boards, and reporting tools that turn raw records into decisions — from exam analytics to logins and traffic.",
    proof: "SSC Exam Analysis board",
    proofSlug: "ssc-exam-analysis",
  },
  {
    id: "vision",
    icon: "wrench",
    title: "Computer Vision Systems",
    description:
      "Real-time detection pipelines — YOLO-based violation detection across multi-camera feeds, deployed in a control-room setting.",
    proof: "Nexus Traffic Management System",
    proofSlug: "nexus-traffic-management",
  },
] as const;

export interface ProcessStep {
  step: string;
  title: string;
  description: string;
}

/** How a quotation engagement runs — service methodology, not new factual claims. */
export const processSteps: ProcessStep[] = [
  {
    step: "01",
    title: "Tell me about it",
    description:
      "Submit the quotation form — what the system should do, your budget range, and your timeline. Registered accounts track every request in one place.",
  },
  {
    step: "02",
    title: "Scope & quotation",
    description:
      "I review the request and reply with a straight scope: modules, stack, milestones, and the price — no vague hourly fog.",
  },
  {
    step: "03",
    title: "Build & demo",
    description:
      "One developer, entire product: frontend, backend, data layer, payments. You see working demos as milestones land, not a single reveal at the end.",
  },
  {
    step: "04",
    title: "Ship & hand over",
    description:
      "Deployment packaged for one-click Docker/Vercel, live where applicable, with the repository and a handover walkthrough.",
  },
] as const;
