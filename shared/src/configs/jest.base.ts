import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest",

  testEnvironment: "node",

  roots: ["<rootDir>/tests"],

  collectCoverage: true,

  coverageDirectory: "coverage",

  collectCoverageFrom: ["src/**/*.ts", "!src/**/*.d.ts"],

  moduleFileExtensions: ["ts", "js", "json"],

  testMatch: ["**/*.test.ts"],

  clearMocks: true,

  verbose: true,
  // coverageThreshold: {
  //   global: {
  //     branches: 50,
  //     functions: 50,
  //     lines: 50,
  //     statements: 50,
  //   },
  // },
};

export default config;
