module.exports = {
    formatJobCount: (count) => {
        return `Total job openings: ${count}`;
    },
    handleError: (error) => {
        console.error('An error occurred:', error);
    }
};