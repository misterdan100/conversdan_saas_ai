import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      // disable apostrophe
      "react/no-unescaped-entities": "off",
      // disable "is defined but never used" errors
      "no-unused-vars": "off",
      // disable "is defined but never used" errors for TypeScript
      "@typescript-eslint/no-unused-vars": "off"
    }
  }
];

export default eslintConfig;
