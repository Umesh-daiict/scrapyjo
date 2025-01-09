// src/index.js

const { scrapeJobOpenings } = require("./scraper");

(async function () {
  try {
    const jobTitles = [
      "React",
      "Node",
      "Python",
      "Software Engineer",
      "Frontend Developer",
      "Backend Developer",
    ];
    const jobCounts = await scrapeJobOpenings(jobTitles);
    console.log("Jobs:", jobCounts);
  } catch (error) {
    console.error("Error while scraping job openings:", error);
  }
})();
