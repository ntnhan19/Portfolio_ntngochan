import type { NextConfig } from "next";

// Kiểm tra xem dự án có đang được build trên Vercel hay không
const isVercel = process.env.VERCEL === "1";
const isProduction = process.env.NODE_ENV === "production";

// Nếu build trên Vercel thì KHÔNG dùng basePath. 
// Nếu không phải Vercel và là môi trường Production (GitHub Pages) thì mới dùng "/Portfolio_ntngochan"
const basePath = isVercel ? "" : (isProduction ? "/Portfolio_ntngochan" : "");

const nextConfig: NextConfig = {
  output: "export", 
  basePath,
  allowedDevOrigins: isProduction ? undefined : ["172.24.64.1"],
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
