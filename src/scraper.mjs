import 'dotenv/config';
import playwright   from 'playwright-aws-lambda';

export async function scrapeJobOpenings(jobTitles) {
  browser = await playwright.launchChromium();
  const context = await browser.newContext({userAgent:"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36"});


//  const browser = await firefox.launch();
  //const context = await browser.newContext({
    //userAgent:
    //  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:109.0) Gecko/20100101 Firefox/109.0",
  //});
  const page = await context.newPage();
  const JobOpenings = {};
  console.log(`Scraping job openings from ${process.env.JOB_SITE_URL}...`);
     
  for (const title of jobTitles) {
    try {
      await page.goto(`${process.env.JOB_SITE_URL}`, { timeout: 60000 }); // Increased timeout and wait for network to be idle
      // await page.waitForLoadState('load')
    //   await randomDelay(page);
      // Wait for the input element to be available
      await page.waitForSelector(
        "#heroSectionDesktop-skillsAutoComplete--input",
        { timeout: 60000 }
      );
      // Fill the input and click the search button
      await page.fill("#heroSectionDesktop-skillsAutoComplete--input", title, {
        timeout: 60000,
      });
    //   await randomDelay(page);
      await page.getByRole("button", { name: "Search" }).nth(0).click();
    //   await randomDelay(page);

      await page.waitForLoadState("load");
      // await  page.screenshot({path: `example-${title}.png`,fullPage: true});

      const titleText = await page.title(); // Get the text content of the title tag

      const match = titleText.match(/(\d+)\s+Results\s+Found/); // Extract the job count using regex
      const count = match ? parseInt(match[1], 10) : 0; // Parse the job count
      console.log(`Job openings for title "${title}": ${count}`);
      JobOpenings[title] = count;
    } catch (error) {
      console.error(
        `Error while scraping job openings for title "${title}":`,
        error
      );
      const htmlContent = await page.content();
      console.log(
        `HTML content at the time of error:\n${htmlContent.slice(0, 1000)}...`
      );
    }
  }

  await browser.close();
  return JobOpenings;
}
