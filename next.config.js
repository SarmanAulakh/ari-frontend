/** @type {import('next').NextConfig} */

const MS_PER_SECOND = 1000;
const SECONDS_PER_DAY = 86400;

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.NEXT_PUBLIC_ANALYZE === 'true',
});

const nextConfig = withBundleAnalyzer({
  reactStrictMode: true,
  compiler: {
    emotion: true,
  },
  images: {
    domains: ['storage.googleapis.com', 'ipfs.io'],
  },
  onDemandEntries: {
    // period (in ms) where the server will keep pages in the buffer
    maxInactiveAge: SECONDS_PER_DAY * MS_PER_SECOND,
    // number of pages that should be kept simultaneously without being disposed
    pagesBufferLength: 100,
  },
  output: 'standalone',
})

module.exports = nextConfig
