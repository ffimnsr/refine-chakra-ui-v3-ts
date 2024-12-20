const { pathsToModuleNameMapper } = require("ts-jest")
const { compilerOptions } = require("./tsconfig.json")

const paths = compilerOptions.paths ? compilerOptions.paths : {}

module.exports = {
  verbose: true,
  silent: false,
  preset: "ts-jest",
  rootDir: "./",
  testEnvironment: "./fix-jsdom-env.ts",
  setupFilesAfterEnv: ["<rootDir>/test/jest.setup.ts"],
  testPathIgnorePatterns: ["<rootDir>/node_modules/"],
  moduleNameMapper: {
    ...pathsToModuleNameMapper(paths, { prefix: "<rootDir>/" }),
    "\\.css$": "identity-obj-proxy",
  },
  displayName: "chakra-ui-v3",
  transform: {
    "^.+\\.svg$": "<rootDir>/test/svgTransform.ts",
    "^.+\\.tsx?$": [
      "ts-jest",
      {
        tsconfig: "<rootDir>/tsconfig.test.json",
      },
    ],
  },
  coveragePathIgnorePatterns: ["<rootDir>/src/index.ts"],
}
