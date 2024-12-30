// src/index.js
require('dotenv').config();

const { chromium } = require('playwright');
const { scrapeJobOpenings } = require('./scraper');

(async () => {
    const browser = await chromium.launch();
    const page = await browser.newPage();
    await page.setExtraHTTPHeaders({
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3',
        'Accept-Language': 'en-US,en;q=0.9',
        'Referer': 'https://www.google.com/',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
        'Connection': 'keep-alive',
        'Cache-Control': 'max-age=100'
    });

    try {
        const jobCounts = await scrapeJobOpenings(page);
        console.log(`Total job openings: React - ${jobCounts.react}, Node - ${jobCounts.node}, Python - ${jobCounts.python}`);
    } catch (error) {
        console.error('Error while scraping job openings:', error);
    } finally {
        await browser.close();
    }
})();