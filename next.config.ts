import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Use standalone output only for Docker / custom server containers; Vercel uses native serverless
  ...(process.env.BUILD_STANDALONE === "true" ? { output: "standalone" } : {}),
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
  images: {
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
