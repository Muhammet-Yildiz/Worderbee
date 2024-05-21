/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    compiler: {
      styledComponents: true
    },
    env : {
      NEXT_PUBLIC_API_URL: "http://localhost:3000",
    }
  }
  const withNextIntl = require('next-intl/plugin')(
    './src/i18n.ts'
  );
  module.exports = withNextIntl(nextConfig)
  