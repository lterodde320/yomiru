/** @type {import('next').NextConfig} */
import cron from 'node-cron';
import { updateArticles } from './lib/updateArticles.mjs';

if(process.env.npm_lifecycle_event !== 'build') {
    cron.schedule('* * * * *', async function () {
        console.info(await updateArticles());
    });
}

const nextConfig = {
    output: "standalone",
    serverRuntimeConfig: {
        prismaUrl: process.env.PRISMA_URL,
        authSecret: process.env.NEXTAUTH_SECRET
    }
};


export default nextConfig;
