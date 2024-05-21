/** @type {import('next').NextConfig} */
import withNextIntl from 'next-intl/plugin';
const nextConfig = {
    reactStrictMode: true,
    compiler: {
        styledComponents: true
    },
    env: {
        NEXT_PUBLIC_API_URL: "http://localhost:3000/",
    }
}

export default withNextIntl('./src/i18n.ts')(nextConfig);