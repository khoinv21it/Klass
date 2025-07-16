import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "assets.example.com",
        port: "",
        pathname: "/account123/**",
        search: "",
      },
    ],
    domains: [
      "cdnv2.tgdd.vn",
      "cdn.tgdd.vn",
      "cdn.haitrieu.com",
      "i.imgur.com",
    ],
  },
};

export default nextConfig;
