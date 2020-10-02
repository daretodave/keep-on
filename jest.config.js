module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  transformIgnorePatterns: ['^.+\\.js$'],
  "modulePathIgnorePatterns": [
    "<rootDir>/lib"
  ],
  globals: {
    'ts-jest': {
      tsConfig: 'tsconfig.json'
    }
  },
  "collectCoverageFrom": [
    "src/**/*.{js,jsx,ts,tsx}",
    "!<rootDir>/node_modules/",
    "!<rootDir>/lib/"
  ],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$",
  collectCoverage: true,
  testPathIgnorePatterns: ["<rootDir>/lib", "<rootDir>/node_modules"],
};