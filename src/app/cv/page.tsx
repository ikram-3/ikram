"use client";

import Link from "next/link";
import { ArrowLeft, Download, ExternalLink, FileText, Printer } from "lucide-react";
import { identity } from "@/profile";
import { Button } from "@/components/ui/button";

export default function CvPage() {
  const pdfUrl = "/document/Muhammad_Ikram.pdf";

  return (
    <div className="flex h-screen flex-col bg-[#0B0D10] text-foreground antialiased">
      {/* Top Header / Action Toolbar */}
      <header className="z-10 flex h-16 shrink-0 items-center justify-between border-b border-white/10 bg-[#13161C]/95 px-4 backdrop-blur-md sm:px-6">
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-semibold text-neutral-200 transition-all hover:border-orange-500/50 hover:bg-orange-500/10 hover:text-orange-400"
          >
            <ArrowLeft size={14} />
            <span>Back to Portfolio</span>
          </Link>

          <div className="hidden items-center gap-2 border-l border-white/10 pl-3 sm:flex">
            <span className="grid size-7 place-items-center rounded-md bg-orange-500/10 text-orange-500">
              <FileText size={15} />
            </span>
            <div>
              <p className="text-xs font-bold leading-tight text-white">{identity.name} — Curriculum Vitae</p>
              <p className="text-[10px] text-neutral-400">CV</p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <Button
            asChild
            variant="outline"
            size="sm"
            className="hidden border-white/10 bg-white/5 text-xs text-neutral-200 hover:bg-white/10 hover:text-white sm:inline-flex"
          >
            <a href={pdfUrl} target="_blank" rel="noopener noreferrer">
              <ExternalLink size={13} className="mr-1.5" />
              Open in New Tab
            </a>
          </Button>

          <Button
            asChild
            size="sm"
            className="rounded-lg bg-gradient-to-r from-orange-500 to-amber-500 text-xs font-semibold text-white shadow-md shadow-orange-500/20 hover:from-orange-600 hover:to-amber-600"
          >
            <a href={pdfUrl} download="Muhammad_Ikram.pdf">
              <Download size={14} className="mr-1.5" />
              Download Resume
            </a>
          </Button>
        </div>
      </header>

      {/* Embedded PDF Viewer Frame */}
      <main className="relative flex-1 w-full bg-[#181A1E]">
        <iframe
          src={`${pdfUrl}#toolbar=1&navpanes=0`}
          title="Muhammad Ikram — Curriculum Vitae"
          className="h-full w-full border-0"
        />
      </main>
    </div>
  );
}
