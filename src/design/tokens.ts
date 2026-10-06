// DESIGN MODULE — Tokens: brand constants, navigation model, page metadata.
// Palette comes from DESIGN_SYSTEM.md (charcoal #1C1C1C + gold #C9A227) and lives
// as CSS variables in globals.css; this file holds the structural tokens.

/** Distinct pages of the site (client-routed, hash-addressable). */
export type PageKey =
  | "home"
  | "about"
  | "projects"
  | "project-detail"
  | "skills"
  | "experience"
  | "contact"
  | "quotation"
  | "register"
  | "login"
  | "account"
  | "admin";

export interface NavItem {
  path: string;
  label: string;
}

/** Primary navigation — order defines both desktop nav and mobile sheet.
 *  Auth/quotation pages get their own dedicated header areas (CTA button + account menu). */
export const NAV_ITEMS: NavItem[] = [
  { path: "/", label: "Home" },
  { path: "/about", label: "About" },
  { path: "/projects", label: "Projects" },
  { path: "/skills", label: "Skills" },
  { path: "/experience", label: "Experience" },
  { path: "/contact", label: "Contact" },
];

/** Secondary links for the mobile sheet + footer (account area). */
export const ACCOUNT_NAV_ITEMS: NavItem[] = [
  { path: "/quotation", label: "Get a Quote" },
  { path: "/register", label: "Create Account" },
  { path: "/login", label: "Sign In" },
];

export const PAGE_META: Record<PageKey, { title: string; description: string }> = {
  home: {
    title: "Muhammad Ikram — Software Engineer · Full-Stack × Applied AI × Automation",
    description:
      "Production AI agents and complete business platforms — RAG chatbots with citations, POS, CMS, hospital & ERP systems.",
  },
  about: {
    title: "About — Muhammad Ikram",
    description:
      "Grounded AI. Complete products. Shipped. Applied AI and full product engineering, refusing to stay separate.",
  },
  projects: {
    title: "Projects — Muhammad Ikram",
    description:
      "35 shipped systems: live-deployed platforms and production-grade AI, each built frontend to deployment.",
  },
  "project-detail": {
    title: "Project — Muhammad Ikram",
    description: "Case study — what I did, why it matters, and the stack behind it.",
  },
  skills: {
    title: "Skills — Muhammad Ikram",
    description:
      "Stacks that serve the problem: grounded AI pipelines through the product details that make software usable.",
  },
  experience: {
    title: "Experience & Education — Muhammad Ikram",
    description: "Where I've built and studied — roles, degrees, and certifications.",
  },
  contact: {
    title: "Contact — Muhammad Ikram",
    description:
      "Have a system that needs building end-to-end? One developer, entire product: frontend, backend, payments, deployment.",
  },
  quotation: {
    title: "Get a Quote — Muhammad Ikram",
    description:
      "Request a project quotation: scope, budget range, timeline. Straight pricing for full-stack, AI, and automation builds.",
  },
  register: {
    title: "Create Account — Muhammad Ikram",
    description: "Register to submit and track quotation requests with Muhammad Ikram.",
  },
  login: {
    title: "Sign In — Muhammad Ikram",
    description: "Sign in to your account to submit and track quotation requests.",
  },
  account: {
    title: "My Account — Muhammad Ikram",
    description: "Your account and quotation requests.",
  },
  admin: {
    title: "Quotation Dashboard — Muhammad Ikram",
    description: "Admin dashboard — incoming quotation requests and statuses.",
  },
};

/** Which nav item should light up for a given page (project detail highlights "Projects"). */
export function isActivePage(current: PageKey, itemPath: string): boolean {
  switch (itemPath) {
    case "/":
      return current === "home";
    case "/about":
      return current === "about";
    case "/projects":
      return current === "projects" || current === "project-detail";
    case "/skills":
      return current === "skills";
    case "/experience":
      return current === "experience";
    case "/contact":
      return current === "contact";
    case "/quotation":
      return current === "quotation";
    case "/register":
      return current === "register";
    case "/login":
      return current === "login";
    case "/account":
      return current === "account";
    case "/admin":
      return current === "admin";
    default:
      return false;
  }
}

export const BRAND = {
  monogram: "MI",
  /** Charcoal from DESIGN_SYSTEM.md. */
  charcoal: "#1C1C1C",
  /** Logo brand color: vibrant emerald green (#16A34A). */
  gold: "#16A34A",
  /** Signature emerald green from A06 vector badge (#16A34A). */
  emerald: "#16A34A",
  emeraldLight: "#22C55E",
} as const;
