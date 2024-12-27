const { chromium } = require('playwright');

async function scrapeJobOpenings() {
    const browser = await chromium.launch();
    const page = await browser.newPage();
    const jobTitles = ['React'];
    let totalJobOpenings = 0;
    // Set User-Agent and other headers
    // await page.setExtraHTTPHeaders({
    //     'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.90 Safari/537.36',
    //     'Accept-Language': 'en-US,en;q=0.9',
    //     'Referer': 'https://www.google.com/'
    // });

    for (const title of jobTitles) {
        console.log(`Scraping job openings from ${process.env.JOB_SITE_URL}...`);
        await page.goto(`${process.env.JOB_SITE_URL}/srp/results?query=react`); // Replace with actual job site URL
       console.log(await page.content())
        await page.waitForSelector('title'); // Wait for the title tag to be loaded

        const titleText = await page.title(); // Get the text content of the title tag
        const match = titleText.match(/(\d+)\s+Results\s+Found/); // Extract the job count using regex
        const count = match ? parseInt(match[1], 10) : 0; // Parse the job count
        totalJobOpenings += isNaN(count) ? 0 : count;
  }
    console.log(`Total job openings: ${totalJobOpenings} for ${jobTitles.join(', ')}`);
    await browser.close();
    return totalJobOpenings;
}

module.exports = { scrapeJobOpenings };