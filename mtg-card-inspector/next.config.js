// Minimal Next.js JS config. Copy options from next.config.ts here (if any), then delete next.config.ts.
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cards.scryfall.io",
      },
    ],
  },
};

module.exports = nextConfig;
