// module.exports = {
//     setupFilesAfterEnv: ["./jest.setup.js"],
//     collectCoverageFrom: [
//         '**/*.{js,jsx,ts,tsx}',
//         '!**/*.d.ts',
//         '!**/node_modules/**',
//       ],
//       testPathIgnorePatterns: ['/node_modules/', '/.next/'],
//       transform: {
//         '^.+\\.(js|jsx|ts|tsx)$': '<rootDir>/node_modules/babel-jest',
//       },
//     moduleNameMapper: {
//         "^@components(.*)$": "<rootDir>/shared/components$1",
//         "^@pages(.*)$": "<rootDir>/pages$1",
//         "^@hooks(.*)$": "<rootDir>/hooks$1",
//       },
//   };
const config = {
  verbose: true,
};

module.exports = config;

// Or async function
module.exports = async () => {
  return {
    setupFilesAfterEnv: ["./jest.setup.js"],
    testEnvironment: "jsdom",
    moduleNameMapper: {
      "@data/*": "<rootDir>/data",
      "@components/*": "<rootDir>/shared/Components$1",
      "@shared/*": "<rootDir>/shared/Utils$1",
      "^@pages(.*)$": "<rootDir>/pages$1",
    },
    transform: {
      "^.+\\.(js|jsx|ts|tsx)$": "<rootDir>/node_modules/babel-jest",
    },
    verbose: true,
  };
};
