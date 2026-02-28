import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["res.cloudinary.com", "i.pinimg.com"], // Add your image domains here
  },
  /* config options here */
  reactCompiler: true,
};

export default nextConfig;
