"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { signOut, useSession } from "next-auth/react";
import { useTheme } from "next-themes";
import { Moon, Sun, Menu, Github, Gavel, LogIn, LogOut, Mail, ReceiptText, User, UserRound } from "lucide-react";
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

function SiteLogo({ size = 36 }: { size?: number }) {
  return (
    <span
      className="relative block overflow-hidden rounded-full ring-2 ring-orange-500 shadow-md shadow-orange-500/25 transition-transform duration-300 group-hover:scale-105"
      style={{ width: size, height: size }}
    >
      <Image
        src="/logo.png"
        alt="Muhammad Ikram"
        width={size}
        height={size}
        priority
        className="h-full w-full object-cover"
      />
    </span>
  );
}

function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="icon"
      aria-label="Toggle light and dark theme"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      className="size-8 rounded-full text-neutral-300 hover:bg-white/10 hover:text-white"
    >
      <Sun size={16} className="hidden dark:block" aria-hidden="true" />
      <Moon size={16} className="block dark:hidden" aria-hidden="true" />
    </Button>
  );
}

function AccountArea() {
  const mounted = useSyncExternalStore(
    subscribeNoop,
    () => true,
    () => false
  );
  const { data: session, status } = useSession();
  const navigate = useRouterStore((s) => s.navigate);

  if (!mounted) {
    return (
      <span className="hidden size-8 rounded-full border border-white/20 sm:block" aria-hidden="true" />
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
            className="grid size-8 place-items-center rounded-full border border-orange-500/60 bg-orange-500/20 font-mono text-xs font-bold text-orange-400 transition-transform duration-200 hover:scale-105 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
          >
            {initial}
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56 rounded-xl border border-white/10 bg-[#16181D] text-white p-1.5 shadow-2xl">
          <DropdownMenuLabel className="px-3 py-2">
            <p className="truncate text-xs font-semibold text-white">{session.user.name ?? "Signed in"}</p>
            <p className="truncate text-[11px] font-normal text-neutral-400">{session.user.email}</p>
          </DropdownMenuLabel>
          <DropdownMenuSeparator className="bg-white/10" />

          {ACCOUNT_NAV_ITEMS.map((item) => (
            <DropdownMenuItem
              key={item.path}
              onClick={() => navigate(item.path)}
              className="flex cursor-pointer items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium text-neutral-200 hover:bg-white/10 hover:text-white"
            >
              <User size={13} aria-hidden="true" /> {item.label}
            </DropdownMenuItem>
          ))}

          {isAdmin ? (
            <DropdownMenuItem
              onClick={() => navigate("/admin")}
              className="flex cursor-pointer items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium text-orange-400 hover:bg-orange-500/10"
            >
              <Gavel size={13} aria-hidden="true" /> Quotation Manager (Admin)
            </DropdownMenuItem>
          ) : null}

          <DropdownMenuSeparator className="bg-white/10" />
          <DropdownMenuItem
            onClick={() => signOut({ redirect: false }).then(() => navigate("/"))}
            className="flex cursor-pointer items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium text-rose-400 hover:bg-rose-500/10"
          >
            <LogOut size={13} aria-hidden="true" /> Sign out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <button
      onClick={() => navigate("/login")}
      aria-label="Sign in"
      className="hidden items-center gap-1.5 rounded-full border border-white/20 bg-white/5 px-3 py-1.5 text-xs font-semibold text-white transition-all hover:bg-white/15 active:scale-95 sm:inline-flex"
    >
      <LogIn size={13} aria-hidden="true" />
      <span>Sign in</span>
    </button>
  );
}

export function SiteHeader() {
  const page = useRouterStore((s) => s.page);
  const navigate = useRouterStore((s) => s.navigate);
  const [open, setOpen] = useState(false);

  const go = (path: string) => {
    setOpen(false);
    navigate(path);
  };

  return (
    <header className="fixed inset-x-0 top-3 sm:top-5 z-50 pointer-events-none px-3 sm:px-4">
      <div className="pointer-events-auto mx-auto flex max-w-5xl items-center justify-between gap-2 sm:gap-4 rounded-full border border-white/10 bg-[#16181D]/95 px-3 sm:px-4 py-2 sm:py-2.5 shadow-2xl backdrop-blur-xl transition-all">
        {/* Left: Avatar + Identity */}
        <button
          onClick={() => go("/")}
          className="group flex items-center gap-2.5 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500"
          aria-label="Muhammad Ikram — home"
        >
          <SiteLogo size={36} />
          <span className="hidden flex-col leading-tight sm:flex text-left">
            <span className="text-xs sm:text-sm font-bold tracking-tight text-white transition-colors group-hover:text-orange-400">
              {identity.name}
            </span>
            <span className="text-[10px] sm:text-[11px] font-medium text-neutral-400">
              {identity.role}
            </span>
          </span>
        </button>

        {/* Center: Navigation Links */}
        <nav aria-label="Primary navigation" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {NAV_ITEMS.map((link) => {
              const active = isActivePage(page, link.path);
              return (
                <li key={link.path}>
                  <button
                    onClick={() => go(link.path)}
                    aria-current={active ? "page" : undefined}
                    className={`rounded-full px-3.5 py-1.5 text-xs sm:text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 ${
                      active
                        ? "bg-gradient-to-r from-orange-500 to-amber-500 text-white font-semibold shadow-sm shadow-orange-500/30"
                        : "text-neutral-300 hover:text-white hover:bg-white/10"
                    }`}
                  >
                    {link.label}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Right: Actions */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Get a Quote Button */}
          <button
            onClick={() => go("/quotation")}
            aria-label="Request a project quotation"
            className="flex items-center gap-1.5 rounded-full bg-gradient-to-r from-orange-500 via-orange-500 to-amber-600 px-3.5 sm:px-4 py-1.5 text-xs sm:text-sm font-bold text-white shadow-md shadow-orange-500/25 transition-all duration-200 hover:scale-[1.02] hover:shadow-orange-500/40 active:scale-[0.98]"
          >
            <Mail size={13} className="hidden xs:inline shrink-0" aria-hidden="true" />
            <span>Get a Quote</span>
          </button>

          {/* GitHub link */}
          <a
            href={identity.socials.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub profile (opens in new tab)"
            className="hidden size-8 place-items-center rounded-full text-neutral-300 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 md:grid"
          >
            <Github size={16} />
          </a>

          <ThemeToggle />
          <AccountArea />

          {/* Mobile hamburger menu */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="size-8 rounded-full text-neutral-300 hover:bg-white/10 hover:text-white lg:hidden"
                aria-label="Open navigation menu"
              >
                <Menu size={18} />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" aria-describedby={undefined} className="w-72 border-white/10 bg-[#14161B] text-white">
              <SheetHeader>
                <SheetTitle className="flex items-center gap-3">
                  <SiteLogo size={36} />
                  <span className="text-left font-bold text-white">{identity.name}</span>
                </SheetTitle>
              </SheetHeader>
              <nav aria-label="Mobile" className="mt-4 overflow-y-auto px-4 pb-6" style={{ maxHeight: "calc(100dvh - 6rem)" }}>
                <button
                  onClick={() => go("/quotation")}
                  className="mb-4 flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-orange-500 to-amber-600 px-4 py-2.5 text-sm font-bold text-white shadow-md shadow-orange-500/30"
                >
                  <ReceiptText size={15} aria-hidden="true" /> Get a Quote
                </button>

                <ul className="space-y-1">
                  {NAV_ITEMS.map((link) => {
                    const active = isActivePage(page, link.path);
                    return (
                      <li key={link.path}>
                        <button
                          onClick={() => go(link.path)}
                          className={`flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                            active
                              ? "bg-orange-500/20 text-orange-400 font-semibold"
                              : "text-neutral-300 hover:bg-white/10 hover:text-white"
                          }`}
                        >
                          <span>{link.label}</span>
                          {active ? <span className="size-1.5 rounded-full bg-orange-500" /> : null}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
