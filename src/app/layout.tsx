import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/portfolio/theme-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://ikram.is-great.net"),
  title: "Muhammad Ikram — Software Engineer · Full-Stack × Applied AI × Automation",
  description:
    "Software Engineer building production AI agents & complete business platforms — RAG chatbots with citations, POS, CMS, hospital & ERP systems. Python · Next.js · FastAPI · Laravel. KPITB Generative AI Fellow.",
  keywords: [
    "Muhammad Ikram",
    "Software Engineer",
    "Full-Stack",
    "Applied AI",
    "RAG",
    "Automation",
    "Next.js",
    "FastAPI",
    "Laravel",
  ],
  authors: [{ name: "Muhammad Ikram" }],
  openGraph: {
    title: "Muhammad Ikram — Software Engineer",
    description:
      "I build production AI agents and complete business platforms — from RAG assistants to restaurant POS, hospital systems, and enterprise ERP.",
    images: [{ url: "/images/project/og-image.png", width: 1440, height: 720, alt: "Muhammad Ikram — Software Engineer portfolio" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Muhammad Ikram — Software Engineer",
    description:
      "Production AI agents & complete business platforms. Ships end-to-end, deploys one-click.",
    images: ["/images/project/og-image.png"],
  },
  icons: {
    icon: [
      { url: "/icon.png", type: "image/png" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    shortcut: "/favicon.ico",
    apple: "/apple-icon.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#1C1C1C",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground min-h-screen flex flex-col`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
