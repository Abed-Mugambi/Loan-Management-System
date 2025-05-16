module.exports = {
    // setupFilesAfterEnv: ['@testing-library/jest-dom'],
    setupFilesAfterEnv: ['<rootDir>/setupTests.js'],
    testEnvironment: 'jsdom',
    // Add this to ensure Jest uses Babel
    transform: {
        '^.+\\.jsx?$': 'babel-jest',
    },

     moduleNameMapper: {
    '\\.(css|less|scss|sass)$': '<rootDir>/__mocks__/styleMock.js',
  },
};

