import { scrapeJobOpenings } from './src/scraper.mjs';

console.log('Running the scraper... [only work on lambda function]');

export const handler = async (event) => {
    console.log('Received event:', JSON.stringify(event, null, 2));
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
        throw error;
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message }),
        };
    }
};

console.log(await handler({}))