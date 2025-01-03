/** @type {import('next').NextConfig} */
import cron from 'node-cron';
import { updateArticles } from './lib/updateArticles.mjs';

cron.schedule('* * * * *', async function () {
    console.info(await updateArticles());
});

const nextConfig = {};


export default nextConfig;
