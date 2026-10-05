"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { signOut, useSession } from "next-auth/react";
import { useTheme } from "next-themes";
import { Moon, Sun, Menu, Github, Gavel, LogIn, LogOut, ReceiptText, User, UserRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ACCOUNT_NAV_ITEMS, NAV_ITEMS, isActivePage } from "@/design/tokens";
import { identity } from "@/profile";
import Image from "next/image";
import { useRouterStore } from "@/store/router";

const subscribeNoop = () => () => {};

function SiteLogo({ size = 38 }: { size?: number }) {
  return (
    <span className="relative flex items-center justify-center">
      {/* Outer ambient glow */}
      <span
        aria-hidden="true"
        className="absolute -inset-1 rounded-full bg-gradient-to-r from-emerald-500/40 via-gold/30 to-emerald-500/40 blur-[3px] opacity-75 group-hover:opacity-100 transition-opacity"
      />
      {/* Circular Logo Container with A06 emerald badge */}
      <span
        className="relative block overflow-hidden rounded-full ring-2 ring-emerald-500/80 shadow-md shadow-emerald-500/25 transition-transform duration-300 group-hover:scale-105"
        style={{ width: size, height: size }}
      >
        <Image
          src="/logo.png"
          alt="Muhammad Ikram Logo"
          width={size}
          height={size}
          priority
          className="h-full w-full object-cover"
        />
      </span>
      {/* Live availability indicator dot */}
      <span className="absolute -bottom-0.5 -right-0.5 flex size-2.5" aria-hidden="true">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
        <span className="relative inline-flex size-2.5 rounded-full border border-background bg-emerald-500" />
      </span>
    </span>
  );
}

function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="icon"
      /* Static label — resolvedTheme differs between server and client render,
         and a dynamic label would cause a hydration mismatch. */
      aria-label="Toggle light and dark theme"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      className="size-9 rounded-md hover:bg-gold/10 hover:text-gold"
    >
      {/* CSS-driven swap — hydration-safe, no mounted state needed */}
      <Sun size={18} className="hidden dark:block" aria-hidden="true" />
      <Moon size={18} className="block dark:hidden" aria-hidden="true" />
    </Button>
  );
}

/** Auth-aware account area: sign-in button or profile dropdown.
 *  Mount-gated so server and client trees match at hydration (session
 *  status resolves only on the client, after the session fetch). */
function AccountArea() {
  // Hydration-safe "mounted" — false on the server, true after hydration,
  // with no effect-body setState (React compiler friendly).
  const mounted = useSyncExternalStore(
    subscribeNoop,
    () => true,
    () => false
  );
  const { data: session, status } = useSession();
  const navigate = useRouterStore((s) => s.navigate);

  if (!mounted) {
    return (
      <span className="hidden size-9 rounded-full border border-border/70 sm:block" aria-hidden="true" />
    );
  }

  if (status === "authenticated" && session?.user) {
    const isAdmin = session.user.role === "admin";
    const initial = (session.user.name ?? session.user.email ?? "U").slice(0, 1).toUpperCase();
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            aria-label="Account menu"
            className="grid size-9 place-items-center rounded-full border border-gold/50 bg-gold/10 font-mono text-xs font-bold text-gold transition-transform duration-200 hover:scale-105 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
          >
            {initial}
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel>
            <p className="truncate text-sm font-semibold">{session.user.name}</p>
            <p className="truncate text-xs font-normal text-muted-foreground">{session.user.email}</p>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => navigate("/account")}>
            <User size={14} aria-hidden="true" /> My account
          </DropdownMenuItem>
          {isAdmin ? (
            <DropdownMenuItem onClick={() => navigate("/admin")}>
              <Gavel size={14} aria-hidden="true" /> Quotation dashboard
            </DropdownMenuItem>
          ) : null}
          <DropdownMenuSeparator />
          <DropdownMenuItem
            variant="destructive"
            onClick={() => void signOut({ redirect: false })}
          >
            <LogOut size={14} aria-hidden="true" /> Sign out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  if (status === "loading") {
    return (
      <span className="grid size-9 place-items-center rounded-full border border-border/70 bg-secondary/40" aria-hidden="true">
        <UserRound size={15} className="text-muted-foreground/60" />
      </span>
    );
  }

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={() => navigate("/login")}
      className="hidden h-9 rounded-md border-gold/50 px-3.5 text-sm font-semibold text-foreground transition-colors duration-200 hover:bg-gold/10 hover:text-gold sm:inline-flex"
      aria-label="Sign in to your account"
    >
      <LogIn size={15} aria-hidden="true" /> Sign in
    </Button>
  );
}

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const page = useRouterStore((s) => s.page);
  const navigate = useRouterStore((s) => s.navigate);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (path: string) => {
    setOpen(false);
    navigate(path);
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-border/70 bg-background/85 backdrop-blur-md shadow-sm"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <button
          onClick={() => go("/")}
          className="group flex items-center gap-3 rounded-md focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none"
          aria-label="Muhammad Ikram — home"
        >
          <SiteLogo size={38} />
          <span className="hidden flex-col leading-tight sm:flex text-left">
            <span className="text-sm font-bold tracking-tight text-foreground transition-colors group-hover:text-gold">
              {identity.name}
            </span>
            <span className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
              <span className="inline-block size-1.5 rounded-full bg-emerald-500" />
              {identity.role}
            </span>
          </span>
        </button>

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {NAV_ITEMS.map((link) => {
              const active = isActivePage(page, link.path);
              return (
                <li key={link.path}>
                  <button
                    onClick={() => go(link.path)}
                    aria-current={active ? "page" : undefined}
                    className={`relative rounded-md px-3 py-2 text-sm font-medium transition-colors duration-200 hover:bg-gold/10 hover:text-gold focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none ${
                      active ? "text-gold" : "text-muted-foreground"
                    }`}
                  >
                    {link.label}
                    {/* Active indicator */}
                    <span
                      aria-hidden="true"
                      className={`absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-gold transition-opacity duration-200 ${
                        active ? "opacity-100" : "opacity-0"
                      }`}
                    />
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-1.5">
          {/* Quotation CTA — the "come here for a quotation" entry point */}
          <Button
            size="sm"
            onClick={() => go("/quotation")}
            aria-label="Request a project quotation"
            className="hidden h-9 rounded-md bg-gold px-4 text-sm font-bold text-charcoal shadow-md shadow-gold/25 transition-all duration-200 hover:scale-[1.03] hover:bg-gold-light active:scale-[0.98] md:inline-flex"
          >
            <ReceiptText size={15} aria-hidden="true" /> Get a Quote
          </Button>

          <a
            href={identity.socials.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub profile (opens in new tab)"
            className="hidden size-9 place-items-center rounded-md text-muted-foreground transition-colors duration-200 hover:bg-gold/10 hover:text-gold focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none lg:grid"
          >
            <Github size={18} />
          </a>
          <ThemeToggle />
          <AccountArea />

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="size-9 lg:hidden hover:bg-gold/10 hover:text-gold"
                aria-label="Open navigation menu"
              >
                <Menu size={20} />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" aria-describedby={undefined} className="w-72">
              <SheetHeader>
                <SheetTitle className="flex items-center gap-3">
                  <SiteLogo size={36} />
                  <span className="text-left font-bold">{identity.name}</span>
                </SheetTitle>
              </SheetHeader>
              <nav aria-label="Mobile" className="mt-2 overflow-y-auto px-4 pb-6" style={{ maxHeight: "calc(100dvh - 6rem)" }}>
                {/* Quotation CTA first on mobile */}
                <button
                  onClick={() => go("/quotation")}
                  className={`mb-3 flex w-full items-center justify-center gap-2 rounded-md bg-gold px-4 py-3 text-sm font-bold text-charcoal shadow-md transition-all duration-200 hover:bg-gold-light ${
                    isActivePage(page, "/quotation") ? "ring-2 ring-gold ring-offset-2" : ""
                  }`}
                >
                  <ReceiptText size={16} aria-hidden="true" /> Get a Quote
                </button>

                <ul className="flex flex-col gap-1">
                  {NAV_ITEMS.map((link) => {
                    const active = isActivePage(page, link.path);
                    return (
                      <li key={link.path}>
                        <button
                          onClick={() => go(link.path)}
                          aria-current={active ? "page" : undefined}
                          className={`block w-full rounded-md px-3 py-3 text-left text-base font-medium transition-colors duration-200 hover:bg-gold/10 hover:text-gold ${
                            active ? "bg-gold/10 text-gold" : "text-foreground"
                          }`}
                        >
                          {link.label}
                        </button>
                      </li>
                    );
                  })}
                </ul>

                <p className="mb-1.5 mt-5 px-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                  Account
                </p>
                <ul className="flex flex-col gap-1">
                  {ACCOUNT_NAV_ITEMS.map((link) => (
                    <li key={link.path}>
                      <button
                        onClick={() => go(link.path)}
                        className={`block w-full rounded-md px-3 py-2.5 text-left text-sm font-medium transition-colors duration-200 hover:bg-gold/10 hover:text-gold ${
                          isActivePage(page, link.path) ? "bg-gold/10 text-gold" : "text-muted-foreground"
                        }`}
                      >
                        {link.label}
                      </button>
                    </li>
                  ))}
                </ul>

                <a
                  href={identity.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 flex items-center gap-2 rounded-md px-3 py-3 text-sm text-muted-foreground transition-colors duration-200 hover:bg-gold/10 hover:text-gold"
                >
                  <Github size={16} /> github.com/ikram-3
                </a>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
