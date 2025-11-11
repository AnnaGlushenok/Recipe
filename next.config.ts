import type {NextConfig} from "next";

const nextConfig: NextConfig = {
    /* config options here */
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "msnnmlrran8m6azp.public.blob.vercel-storage.com",
            },
        ],
    },
};
export default nextConfig;
