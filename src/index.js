// src/index.js
require("dotenv").config();

const { scrapeJobOpenings } = require("./scraper");
exports.handler = async (event) => {
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
 
    
    return { statusCode: 200, body: jobCounts };
  } catch (error) {
    console.error('Error during scraping:', error);
    return { statusCode: 500, body: JSON.stringify(error.message) };
  } 
}