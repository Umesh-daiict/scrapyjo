// src/index.js

const { scrapeJobOpenings } = require("./scraper");

(async function () {})();
export const handler = async (event) => {

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
    const response = {
      statusCode: 200,
      body: JSON.stringify(jobCounts),
    };
    return response;
  } catch (error) {
    const response = {
      statusCode: 400,
      body: JSON.stringify(error),
    };
    return response;
  }
};
