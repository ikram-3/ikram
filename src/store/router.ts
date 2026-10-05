// CLIENT ROUTER — hash-based page routing for the single Next.js route.
// Each page is a separate module in src/views; this store resolves the active
// page, keeps the URL deep-linkable (#/projects/bitebox-pos), and owns
// scroll-to-top on navigation.

import { create } from "zustand";
import type { PageKey } from "@/design";

export interface RouteTarget {
  page: PageKey;
  slug: string | null;
}

/** Normalize a hash fragment into a canonical path like "/projects/bitebox-pos". */
export function parsePath(hash: string): string {
  let h = hash.replace(/^#/, "").trim();
  if (!h.startsWith("/")) h = `/${h}`;
  if (h.length > 1 && h.endsWith("/")) h = h.slice(0, -1);
  return h || "/";
}

/** Resolve a canonical path to a page key + optional project slug. Unknown paths fall back home. */
export function routeFromPath(path: string): RouteTarget {
  if (path === "/" || path === "") return { page: "home", slug: null };
  if (path === "/about") return { page: "about", slug: null };
  if (path === "/projects") return { page: "projects", slug: null };
  if (path.startsWith("/projects/")) {
    const slug = path.slice("/projects/".length).trim();
    return { page: "project-detail", slug: slug || null };
  }
  if (path === "/skills") return { page: "skills", slug: null };
  if (path === "/experience") return { page: "experience", slug: null };
  if (path === "/contact") return { page: "contact", slug: null };
  if (path === "/quotation") return { page: "quotation", slug: null };
  if (path === "/register") return { page: "register", slug: null };
  if (path === "/login") return { page: "login", slug: null };
  if (path === "/account") return { page: "account", slug: null };
  if (path === "/admin") return { page: "admin", slug: null };
  return { page: "home", slug: null };
}

interface RouterState extends RouteTarget {
  /** Canonical current path, e.g. "/projects". */
  path: string;
  /** Navigate to a path; writes the hash so back/forward and deep links work. */
  navigate: (path: string) => void;
  /** Re-read location.hash (hashchange listener / initial mount). */
  sync: () => void;
}

function apply(path: string): RouteTarget & { path: string } {
  const normalized = parsePath(path);
  return { path: normalized, ...routeFromPath(normalized) };
}

export const useRouterStore = create<RouterState>((set, get) => ({
  path: "/",
  page: "home",
  slug: null,
  navigate: (path) => {
    const next = apply(path);
    if (typeof window !== "undefined") {
      const currentHash = parsePath(window.location.hash);
      if (currentHash !== next.path) {
        window.location.hash = next.path; // fires hashchange → sync()
      }
      window.scrollTo({ top: 0, behavior: "auto" });
    }
    // Set state even if the hash was unchanged (same-page nav = scroll to top).
    set(next);
  },
  sync: () => {
    if (typeof window === "undefined") return;
    const next = apply(window.location.hash);
    // Avoid redundant renders when state already matches.
    if (get().path !== next.path || get().page !== next.page || get().slug !== next.slug) {
      set(next);
    }
  },
}));
