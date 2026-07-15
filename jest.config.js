module.exports = {
  rootDir: "src",
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.(j|t)sx?$": "babel-jest",
  },
  moduleNameMapper: {
    "\\.(css)$": "identity-obj-proxy",
    "single-spa-react/parcel": "single-spa-react/lib/cjs/parcel.cjs",
    "single-spa$": "<rootDir>/__mocks__/single-spa.js",
  },
  setupFilesAfterEnv: ["@testing-library/jest-dom"],
  collectCoverageFrom: [
    "features/**/*.ts",
    "http/**/*.ts",
    "store/**/*.ts",
    "root.component.tsx",
    "!**/*.test.ts",
    "!**/*.test.tsx",
  ],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
};
