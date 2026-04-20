import type { NextConfig } from "next";

const config: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "res.cloudinary.com" },
    ],
  },
  async redirects() {
    return [
      {
        source: "/toko/:slug",
        destination: "/:slug",
        permanent: true,
      },
    ];
  },
};

export default config;
