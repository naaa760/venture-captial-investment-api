module.exports = {
  testEnvironment: "node", // Specifies the test environment
  testMatch: ["**/src/test.js"], // Points to your test file location
  moduleFileExtensions: ["js", "json"], // Extensions Jest should process
  transform: {}, // Disable transformation for simplicity
  collectCoverage: true, // Enables coverage collection
  coverageDirectory: "coverage", // Directory to output coverage reports
  coveragePathIgnorePatterns: ["/node_modules/"], // Ignore node_modules
};
