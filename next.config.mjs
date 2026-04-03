/** @type {import('next').NextConfig} */
const nextConfig = {
  // Switched to Vercel native build for better performance (SSR/ISR)
  // Removed output: "export" to unlock Vercel's intelligent edge optimizations
  staticPageGenerationTimeout: 300,
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    unoptimized: true, // Keep unoptimized for now to stay compatible with existing assets
  },
}

export default nextConfig
