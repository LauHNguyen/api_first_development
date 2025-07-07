module.exports = {
   preset: 'ts-jest',
   testEnvironment: 'node',
   testMatch: ['**/*.test.ts'],
   moduleFileExtensions: ['ts', 'js'],
   collectCoverage: true,
   coverageThreshold: {
      global: {
         branches: 80,
         functions: 80,
         lines: 80,
         statements: 80,
      },
   },
};
