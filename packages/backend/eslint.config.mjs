import rootConfig from "../../eslint.config.mjs";

const eslintConfig = [
  ...rootConfig,
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
  },
];

export default eslintConfig;
