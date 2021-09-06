const config = require('./jest.config');

config.testMatch = ['**/*.integration.test.ts'];
config.setupFiles = ['<rootDir>/setup-integration-test.ts'];

module.exports = config;
