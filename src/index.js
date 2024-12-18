// src/index.js
require('dotenv').config();

const { chromium } = require('playwright');
const { scrapeJobOpenings } = require('./scraper');

(async () => {
    const browser = await chromium.launch();
    const page = await browser.newPage();

    try {
        const jobCounts = await scrapeJobOpenings(page);
        console.log(`Total job openings: React - ${jobCounts.react}, Node - ${jobCounts.node}, Python - ${jobCounts.python}`);
    } catch (error) {
        console.error('Error while scraping job openings:', error);
    } finally {
        await browser.close();
    }
})();