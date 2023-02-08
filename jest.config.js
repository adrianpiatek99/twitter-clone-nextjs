const nextJest = require("next/jest");
const createJestConfig = nextJest({
  dir: "./"
});
const customJestConfig = {
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  moduleDirectories: ["node_modules", "<rootDir>/"],
  moduleNameMapper: {
    "^api/(.*)$": "<rootDir>/pages/api/$1",
    "^utils/(.*)$": "<rootDir>/src/utils/$1",
    "^constants/(.*)$": "<rootDir>/src/constants/$1",
    "^context/(.*)$": "<rootDir>/src/context/$1",
    "^hooks/(.*)$": "<rootDir>/src/hooks/$1",
    "^icons/(.*)$": "<rootDir>/src/icons/$1",
    "^network/(.*)$": "<rootDir>/src/network/$1",
    "^schema/(.*)$": "<rootDir>/src/schema/$1",
    "^store/(.*)$": "<rootDir>/src/store/$1",
    "^styled/(.*)$": "<rootDir>/src/styled/$1",
    "^components/(.*)$": "<rootDir>/src/styled/components/$1",
    "^core/(.*)$": "<rootDir>/src/styled/components/core/$1",
    "^shared/(.*)$": "<rootDir>/src/styled/components/shared/$1",
    "^templates/(.*)$": "<rootDir>/src/styled/components/templates/$1"
  },
  modulePathIgnorePatterns: ["<rootDir>/__tests__/test-utils"],
  testEnvironment: "jest-environment-jsdom"
};
module.exports = createJestConfig(customJestConfig);
