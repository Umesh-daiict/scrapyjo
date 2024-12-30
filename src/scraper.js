const { chromium } = require('playwright');

async function scrapeJobOpenings() {
    const browser = await chromium.launch();
    const page = await browser.newPage();
    const jobTitles = ['React'];
    let totalJobOpenings = 0;

    // Set User-Agent and other headers
    await page.setExtraHTTPHeaders({
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3',
        'Accept-Language': 'en-US,en;q=0.9',
        'Referer': 'https://www.google.com/',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
        'Connection': 'keep-alive',
        'Cache-Control': 'max-age=0'
    });

    for (const title of jobTitles) {
        console.log(`Scraping job openings from ${process.env.JOB_SITE_URL}...`);
        await page.goto(`${process.env.JOB_SITE_URL}`); // Use job title in query
        // await page.waitForSelector('title'); // Wait for the title tag to be loaded
        await page.waitForTimeout(5000); // Wait for 5 seconds
        const titleText = await page.title(); // Get the text content of the title tag

        const match = titleText.match(/(\d+)\s+Results\s+Found/); // Extract the job count using regex
        const count = match ? parseInt(match[1], 10) : 0; // Parse the job count
        totalJobOpenings += isNaN(count) ? 0 : count;
    }

    await browser.close();
    return totalJobOpenings;
}

module.exports = { scrapeJobOpenings };