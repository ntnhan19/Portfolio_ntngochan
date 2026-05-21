import type { NextConfig } from "next";

const isProduction = process.env.NODE_ENV === "production";
const basePath = isProduction ? "/Portfolio_ntngochan" : "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  allowedDevOrigins: isProduction ? undefined : ["172.24.64.1"],
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
