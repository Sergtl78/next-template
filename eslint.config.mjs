import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";
import { fixupConfigRules } from "@eslint/compat";
import ts from "typescript-eslint";
import prettierConfigRecommended from "eslint-plugin-prettier/recommended";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

const patchedConfig = fixupConfigRules([...compat.extends("next/core-web-vitals")]);
const config = [
  ...patchedConfig,
  ...ts.configs.recommended,
  prettierConfigRecommended, // Last since it disables some previously set rules
  // Add more flat configs here
  { ignores: [".next/*","*.mjs", "*.config.*"] },
];

export default config;
