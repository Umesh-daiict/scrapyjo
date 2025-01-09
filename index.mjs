import { scrapeJobOpenings } from './src/scraper.mjs';

console.log('Running the scraper... [only work on lambda function]');

export const handler = async (event) => {
    const jobTitles = [
        "React",
        "Node",
        "Python",
        "Software Engineer",
        "Frontend Developer",
        "Backend Developer",
    ];

    try {
        const jobCounts = await scrapeJobOpenings(jobTitles);
        return {
            statusCode: 200,
            body: JSON.stringify(jobCounts),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message }),
        };
    }
};