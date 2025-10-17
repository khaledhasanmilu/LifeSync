
module.exports = {
  testEnvironment: 'node',
  testMatch: ['**/__tests__/**/*.js?(x)', '**/?(*.)+(spec|test).js?(x)'],
  globalSetup: './test/setup.js',
  forceExit: true,
  clearMocks: true,
  resetMocks: true,
  restoreMocks: true,
};
