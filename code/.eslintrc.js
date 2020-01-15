module.exports = {
  // Specifies the ESLint parser
  parser: "@typescript-eslint/parser",
  plugins: ["redux-saga-typescript"],
  parserOptions: {
    // Allows for the parsing of modern ECMAScript features
    ecmaVersion: 2018,
    // Allows for the use of imports
    sourceType: "module",
    ecmaFeatures: {
      // Allows for the parsing of JSX
      jsx: true
    },
    project: "./tsconfig.json"
  },
  env: {
    es6: true
  },
  rules: {
    "redux-saga-typescript/yield-return-type": "error"
  },
  settings: {
    react: {
      // Tells eslint-plugin-react to automatically detect the version of React to use
      version: "detect"
    }
  }
};
