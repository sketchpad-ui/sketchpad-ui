/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['sketchpad-ui', '@sketchpad/tokens', '@sketchpad/sketch-core'],
  async redirects() {
    return [
      { source: '/components/button', destination: '/docs/components/button', permanent: true },
      { source: '/components/forms', destination: '/docs/components/input', permanent: true },
      { source: '/components/navigation', destination: '/docs/components/tabs', permanent: true },
      { source: '/components/data', destination: '/docs/components/table', permanent: true },
      { source: '/components/:path*', destination: '/docs/components/:path*', permanent: true },
    ];
  },
};

export default nextConfig;
