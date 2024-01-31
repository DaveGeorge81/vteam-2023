/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return [
            {
                source: '/back/:path*',
                destination: 'http://server:1337/:path*'
            }
        ];
    },
    reactStrictMode: false,
};

module.exports = nextConfig;
