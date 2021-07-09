module.exports = {
  env: {
    browser: true,
    node: true,
    es2021: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:prettier/recommended",
    "plugin:react/recommended",
    "plugin:meteor/recommended",
  ],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: "module",
    parser: "babel-eslint",
    ecmaFeatures: {
      jsx: true,
    },
    allowImportExportEverywhere: true,
  },
  plugins: ["prettier", "react", "meteor"],
  rules: {},
  settings: {
    "import/resolver": "meteor",
    react: {
      version: "detect",
    },
  },
};
