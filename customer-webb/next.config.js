/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return [
            {
                source: '/back/:path*',
                destination: 'http://localhost:1337/:path*'
            }
            ]
        },
        reactStrictMode: false,
}

module.exports = nextConfig
