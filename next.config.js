/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true, // Recommended for the `pages` directory, default in `app`.
  swcMinify: true,
  output: 'standalone',
  compiler: {
    removeConsole: process.env.NODE_ENV !== 'development',
  },
  env: {
    app_url: process.env.NEXT_APP_URL,
    server: process.env.NEXT_PUBLIC_APP_HOST,
    service: process.env.NEXT_PUBLIC_API_HOST,
    mellatTransactionId: process.env.NEXT_PUBLIC_BANK_MELLAT,
    ayandeTransactionId: process.env.NEXT_PUBLIC_BANK_AYANDE,
    walletTransactionId: process.env.NEXT_PUBLIC_BANK_WALLET,
    academy_url:process.env.ACADEMY_URL
  },
  images: {
    domains: [
      'http://localhost:3000',
      'localhost:3000',
      'cdn.pmlm.ir',
      'file.pmlm.ir',
      'localhost:3000/fa',
      'localhost:3000/fa',
      'https:/file.pmlm.ir',
      'file.pmlm.ir',
    ],
  },
  async headers() {
    return [
      {
        source: '/fa/:path*',
        headers: [
          {
            key: 'x-custom-header',
            value: `${process.env.CONTAINER_IP}`,
          },
        ],
      },
      {
        source: '/en/:path*',
        headers: [
          {
            key: 'x-custom-header',
            value: `${process.env.CONTAINER_IP}`,
          },
        ],
      },
      {
        source: '/ar/:path*',
        headers: [
          {
            key: 'x-custom-header',
            value: `${process.env.CONTAINER_IP}`,
          },
        ],
      },
    ];
  },
 
};

const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
  cacheStartUrl: true,
  dynamicStartUrl: true,
  cacheOnFrontEndNav: true,
  disable: false,
  reloadOnOnline: true,
  
});


module.exports = withPWA(nextConfig);
