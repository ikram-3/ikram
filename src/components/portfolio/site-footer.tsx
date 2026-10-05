"use client";

import { Github, Linkedin, Globe, Mail, Phone, MapPin, ReceiptText } from "lucide-react";
import { ACCOUNT_NAV_ITEMS, NAV_ITEMS } from "@/design/tokens";
import { identity } from "@/profile";
import { useRouterStore } from "@/store/router";

export function SiteFooter() {
  const year = new Date().getFullYear();
  const navigate = useRouterStore((s) => s.navigate);

  return (
    <footer className="mt-auto border-t border-border/70 bg-card/40 pb-[env(safe-area-inset-bottom)]">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-10 sm:px-6 md:flex-row md:items-start md:justify-between">
        <div className="space-y-1.5">
          <p className="text-sm font-semibold tracking-tight">{identity.name}</p>
          <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <MapPin size={12} aria-hidden="true" /> {identity.location}
          </p>
          <p className="max-w-xs text-xs leading-relaxed text-muted-foreground">
            © {year} Muhammad Ikram. Built end-to-end with Next.js, TypeScript & Tailwind CSS.
          </p>
        </div>

        <div className="space-y-3">
          {/* Quotation CTA — mirrors the header entry point */}
          <button
            onClick={() => navigate("/quotation")}
            className="flex items-center gap-2 rounded-md bg-gold px-4 py-2 text-xs font-bold text-charcoal shadow-md transition-all duration-200 hover:scale-[1.03] hover:bg-gold-light active:scale-[0.98]"
          >
            <ReceiptText size={13} aria-hidden="true" /> Request a quotation
          </button>
          <nav aria-label="Footer pages" className="flex max-w-xs flex-wrap items-center gap-x-4 gap-y-2">
            {NAV_ITEMS.map((link) => (
              <button
                key={link.path}
                onClick={() => navigate(link.path)}
                className="rounded-sm text-xs font-medium text-muted-foreground transition-colors duration-200 hover:text-gold focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
              >
                {link.label}
              </button>
            ))}
            {ACCOUNT_NAV_ITEMS.map((link) => (
              <button
                key={link.path}
                onClick={() => navigate(link.path)}
                className="rounded-sm text-xs font-medium text-muted-foreground transition-colors duration-200 hover:text-gold focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
              >
                {link.label}
              </button>
            ))}
          </nav>
        </div>

        <nav aria-label="Footer socials" className="flex flex-wrap items-center gap-2">
          {[
            { href: identity.socials.github, label: "GitHub", Icon: Github },
            { href: identity.socials.linkedin, label: "LinkedIn", Icon: Linkedin },
            { href: identity.socials.website, label: "Website", Icon: Globe },
            { href: `mailto:${identity.email}`, label: "Email", Icon: Mail },
            { href: `tel:${identity.phone.replace(/-/g, "")}`, label: `Phone ${identity.phone}`, Icon: Phone },
          ].map(({ href, label, Icon }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
              aria-label={label}
              className="grid size-10 place-items-center rounded-md text-muted-foreground transition-colors duration-200 hover:bg-gold/10 hover:text-gold focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
            >
              <Icon size={18} />
            </a>
          ))}
        </nav>
      </div>
    </footer>
  );
}
