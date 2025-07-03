import globals from "globals";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import jsxA11y from "eslint-plugin-jsx-a11y";
import importPlugin from "eslint-plugin-import";
import tseslint from "typescript-eslint";
import reactX from "eslint-plugin-react-x";
import reactDom from "eslint-plugin-react-dom";

export default tseslint.config([
  {
    ignores: ["dist/**", "node_modules/**", "coverage/**"],
  },
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2022,
      globals: globals.browser,
      parser: tseslint.parser,
      parserOptions: {
        sourceType: "module",
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      react,
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
      jsxA11y,
      import: importPlugin,
      "@typescript-eslint": tseslint.plugin,
    },
    rules: {
      "react/jsx-uses-react": "off",
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",
      "react/jsx-sort-props": [
        "warn",
        { shorthandFirst: true, callbacksLast: true },
      ],
      "react/jsx-no-useless-fragment": "warn",
      "react/jsx-key": "error",
      "react/no-array-index-key": "warn",
      ...reactHooks.configs.recommended.rules,
      ...reactRefresh.configs.vite.rules,
      "import/order": [
        "error",
        {
          groups: [
            "builtin",
            "external",
            "internal",
            "parent",
            "sibling",
            "index",
          ],
          pathGroups: [
            {
              pattern: "react",
              group: "external",
              position: "before",
            },
            {
              pattern: "react-*",
              group: "external",
              position: "before",
            },
          ],
          pathGroupsExcludedImportTypes: ["builtin"],
          "newlines-between": "always",
          alphabetize: {
            order: "asc",
            caseInsensitive: true,
          },
        },
      ],
      "import/no-duplicates": "error",
      "import/no-unresolved": "off",
      "import/named": "error",
      "import/default": "error",
      "import/no-unused-modules": "warn",
      "import/no-mutable-exports": "error",
      "import/no-commonjs": "warn",
      "import/no-amd": "error",
      "import/no-nodejs-modules": "off",
      "no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
      "prefer-const": "error",
      "no-var": "error",
      "no-console": "warn",
      "no-debugger": "error",
      "no-alert": "warn",
      "no-eval": "error",
      "no-implied-eval": "error",
      "no-new-func": "error",
      "no-script-url": "error",
      eqeqeq: ["error", "always"],
      curly: ["error", "all"],
      "no-multiple-empty-lines": ["error", { max: 2 }],
      "no-trailing-spaces": "error",
      "eol-last": "error",
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_" },
      ],
      "@typescript-eslint/no-non-null-assertion": "warn",
      indent: "off",
      quotes: "off",
      semi: "off",
      "comma-dangle": "off",
      "object-curly-spacing": "off",
      "array-bracket-spacing": "off",
      "arrow-parens": "off",
      "max-len": "off",
    },
    settings: {
      react: {
        version: "detect",
      },
      "import/resolver": {
        node: {
          extensions: [".js", ".jsx", ".ts", ".tsx"],
        },
        alias: {
          map: [["@", "./src"]],
          extensions: [".js", ".jsx", ".ts", ".tsx"],
        },
      },
    },
    extends: [
      reactX.configs["recommended-typescript"],
      reactDom.configs.recommended,
    ],
  },
]);
