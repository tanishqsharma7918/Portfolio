/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    images: {
        unoptimized: true,
    },
    // Ensure trailing slashes for static export
    trailingSlash: true,
};

export default nextConfig;
