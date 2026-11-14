/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // The repo lives on an exFAT drive where macOS writes `._*` AppleDouble
    // sidecars into .next/cache/images; the dev optimizer then serves those
    // 4 KB stubs as broken images. Serve originals in dev; prod still optimizes.
    unoptimized: process.env.NODE_ENV === "development",
  },
};

export default nextConfig;
