"use client";

import { useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { SessionProvider } from "next-auth/react";
import { SiteHeader } from "@/components/portfolio/site-header";
import { SiteFooter } from "@/components/portfolio/site-footer";
import { GoldCursor, PageTransition, ScrollProgress, BackToTop } from "@/design";
import { PAGE_META, type PageKey } from "@/design/tokens";
import { getProjectBySlug } from "@/profile";
import { useRouterStore } from "@/store/router";
import { HomePage } from "@/views/home-page";
import { AboutPage } from "@/views/about-page";
import { ProjectsPage } from "@/views/projects-page";
import { ProjectDetailPage } from "@/views/project-detail-page";
import { SkillsPage } from "@/views/skills-page";
import { ExperiencePage } from "@/views/experience-page";
import { ContactPage } from "@/views/contact-page";
import { QuotationPage } from "@/views/quotation-page";
import { LoginPage, RegisterPage } from "@/views/auth-page";
import { AccountPage } from "@/views/account-page";
import { AdminPage } from "@/views/admin-page";

function ActiveView({ page, slug }: { page: PageKey; slug: string | null }) {
  switch (page) {
    case "about":
      return <AboutPage />;
    case "projects":
      return <ProjectsPage />;
    case "project-detail":
      return <ProjectDetailPage slug={slug} />;
    case "skills":
      return <SkillsPage />;
    case "experience":
      return <ExperiencePage />;
    case "contact":
      return <ContactPage />;
    case "quotation":
      return <QuotationPage />;
    case "register":
      return <RegisterPage />;
    case "login":
      return <LoginPage />;
    case "account":
      return <AccountPage />;
    case "admin":
      return <AdminPage />;
    case "home":
    default:
      return <HomePage />;
  }
}

/**
 * Site shell — mounts the separate page modules behind a hash router
 * (#/about, #/projects/<slug>, #/quotation, #/register, …), owns per-page
 * titles, page-swap transitions, the custom gold cursor, and the auth
 * session provider. All pages import the shared profile + design modules.
 */
function Shell() {
  const page = useRouterStore((s) => s.page);
  const slug = useRouterStore((s) => s.slug);
  const path = useRouterStore((s) => s.path);
  const sync = useRouterStore((s) => s.sync);

  // Keep router state in step with the URL (deep links + back/forward).
  useEffect(() => {
    sync();
    const onHashChange = () => sync();
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, [sync]);

  // Per-page document titles.
  useEffect(() => {
    if (page === "project-detail" && slug) {
      const project = getProjectBySlug(slug);
      document.title = project ? `${project.name} — Muhammad Ikram` : PAGE_META["project-detail"].title;
    } else {
      document.title = PAGE_META[page].title;
    }
  }, [page, slug]);

  // Scroll to top whenever the active page changes (route switches, back/forward).
  const viewKey = page === "project-detail" ? `project-detail:${slug ?? ""}` : page;
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [viewKey]);

  return (
    <>
      {/* Skip to content — keyboard accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[70] focus:rounded-md focus:border focus:border-gold/50 focus:bg-background focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-gold"
      >
        Skip to content
      </a>

      <ScrollProgress />
      <GoldCursor />
      <SiteHeader />

      <main id="main-content" className="flex-1 pt-16">
        <AnimatePresence mode="wait" initial={false}>
          <PageTransition key={`${viewKey}@${path === "/" ? "root" : "nav"}`}>
            <ActiveView page={page} slug={slug} />
          </PageTransition>
        </AnimatePresence>
      </main>

      <SiteFooter />
      <BackToTop />
    </>
  );
}

export function SiteShell() {
  return (
    <SessionProvider>
      <Shell />
    </SessionProvider>
  );
}
