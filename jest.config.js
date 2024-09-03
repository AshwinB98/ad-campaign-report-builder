const nextJest = require("next/jest");

const createJestConfig = nextJest({
  dir: "./",
});

const customJestConfig = {
  coverageProvider: "v8",
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.[jt]sx?$": "babel-jest",
  },
  moduleNameMapper: {
    "^@/components/(.*)$": "<rootDir>/components/$1",
    "^@/pages/(.*)$": "<rootDir>/pages/$1",
  },
  moduleFileExtensions: ["js", "jsx", "ts", "tsx"],
  collectCoverage: true,
  coverageDirectory: "coverage",
  collectCoverageFrom: [
    "**/*.{js,jsx,ts,tsx}",
    "!**/node_modules/**",
    "!**/.next/**",
    "!**/coverage/**",
    "!jest.config.js",
  ],
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
};

module.exports = async function () {
  const makeConfig = await createJestConfig(customJestConfig);
  const finalJestConfig = await makeConfig();

  finalJestConfig.transformIgnorePatterns[0] =
    "/node_modules/(?!@react-dnd|react-dnd|dnd-core|react-dnd-html5-backend/)";

  return finalJestConfig;
};
