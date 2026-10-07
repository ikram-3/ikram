import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/portfolio/theme-provider";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-heading",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = process.env.NEXTAUTH_URL || "https://ikram-neon.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Muhammad Ikram | Full-Stack Software Engineer & AI Specialist",
    template: "%s | Muhammad Ikram",
  },
  description:
    "I design and build high-performance web applications, production AI assistants, and enterprise business systems. Based in Pakistan, available worldwide.",
  keywords: [
    "Muhammad Ikram",
    "Software Engineer",
    "Full-Stack Developer",
    "AI Engineer",
    "Next.js Developer",
    "FastAPI",
    "Python Developer",
    "Web Application Developer",
    "Generative AI",
    "PostgreSQL",
    "Pakistan",
  ],
  authors: [{ name: "Muhammad Ikram", url: siteUrl }],
  creator: "Muhammad Ikram",
  publisher: "Muhammad Ikram",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Muhammad Ikram | Full-Stack Software Engineer & AI Specialist",
    description:
      "Crafting fast, clean web apps and custom AI systems that solve real business problems. Check out my live projects and case studies.",
    url: siteUrl,
    siteName: "Muhammad Ikram Portfolio",
    images: [
      {
        url: "/images/profile/modern-tech-hero-portrait.png",
        width: 1416,
        height: 1111,
        alt: "Muhammad Ikram — Software Engineer",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Muhammad Ikram | Software Engineer",
    description:
      "Full-stack web applications, AI assistants, and custom software systems built with clean code and reliable performance.",
    images: ["/images/profile/modern-tech-hero-portrait.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
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
  themeColor: "#EA580C",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Muhammad Ikram",
    jobTitle: "Software Engineer",
    url: siteUrl,
    image: `${siteUrl}/images/profile/profile.png`,
    sameAs: [
      "https://github.com/ikram-3",
      "https://linkedin.com/in/ikramds",
    ],
    knowsAbout: [
      "Software Engineering",
      "Full-Stack Web Development",
      "Applied Artificial Intelligence",
      "Next.js",
      "Python",
      "FastAPI",
      "PostgreSQL",
    ],
    alumniOf: "University of Swat",
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${jakarta.variable} ${jetbrainsMono.variable} font-sans antialiased bg-background text-foreground min-h-screen flex flex-col`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
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
