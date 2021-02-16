module.exports = {
    verbose: true,
    preset: '@shelf/jest-dynamodb',
    setupFiles: [
        "<rootDir>/jest.setEnvVars.js"
      ]
};
