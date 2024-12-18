module.exports = {
  timeout: 15000,
  use: {
    headless: true,
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