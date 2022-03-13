const withPWA = require("next-pwa");
const runtimeCaching = require("next-pwa/cache");

/** @type {import('next').NextConfig} */
const nextConfig = withPWA({
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
  pwa: {
    dest: "public",
    // register: true,
    // runtimeCaching,
  },
  images: {
    domains: ["fakeimg.pl"],
  },
});

module.exports = nextConfig;
