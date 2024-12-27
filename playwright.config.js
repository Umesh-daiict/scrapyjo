module.exports = {
  timeout: 15000,
  use: {
    headless: false, // Run in headful mode for debugging
    slowMo: 50, // Slow down by 50ms
    devtools: true, // Open devtools automatically
    ignoreDefaultArgs: ['--disable-extensions'],
    viewport: { width: 800, height: 600 },
  },
  projects: [
    {
      name: 'chromium',
      use: { browserName: 'chromium' },
    },
  ],
};