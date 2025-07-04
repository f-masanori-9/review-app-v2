import typescriptEslintParser from "@typescript-eslint/parser";
import unusedImports from "eslint-plugin-unused-imports";

const eslintConfig = [
  {
    plugins: {
      "unused-imports": unusedImports,
    },
    rules: {
      "@typescript-eslint/no-unused-vars": "off",
      "unused-imports/no-unused-imports": "error",
      "unused-imports/no-unused-vars": [
        "warn",
        {
          vars: "all",
          varsIgnorePattern: "^_",
          args: "after-used",
          argsIgnorePattern: "^_",
        },
      ],
    },
  },
  {
    languageOptions: {
      parser: typescriptEslintParser,
    },
  },
  {
    files: ["packages/*/src/_gen/**/*.ts", "packages/*/src/_gen/**/*.d.ts"],
    rules: {
      "@typescript-eslint/no-empty-object-type": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-unused-vars": "off",
      "@typescript-eslint/no-wrapper-object-types": "off",
    },
  },
];

export default eslintConfig;
