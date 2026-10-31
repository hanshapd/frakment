import { defineConfig } from "oxlint";
import core from "ultracite/oxlint/core";
import next from "ultracite/oxlint/next";
import react from "ultracite/oxlint/react";
import vitest from "ultracite/oxlint/vitest";

export default defineConfig({
  extends: [core, react, next, vitest],
  rules: {
    "func-style": "off",
    "sort-keys": "off",
    "react/set-state-in-effect": "off",
    "react/static-components": "off",
    "react/immutability": "off",
    "react/refs": "off",
    "promise/prefer-await-to-then": "off",
    "no-shadow": "off",
    "jsx-a11y/prefer-tag-over-role": "off",
    "jsx-a11y/heading-has-content": "off",
    "no-empty-function": "off",
    "unicorn/prefer-logical-operator-over-ternary": "off",
    "unicorn/prefer-module": "off",
    "node/global-require": "off",
    "eslint/require-await": "off",
    "eslint/no-unused-vars": "off",
  },
  ignorePatterns: [
    "public/r/**",
    "public/skills/**",
    ".agents/**",
    ".cursor/**",
    ".changeset/**",
    ".claude/**",
    ".web-kits/**",
    "audio/**",
    "registry/**",
    "cli/**",
    "scripts/**",
    "components/ui/**",
    "examples/**",
    ".source/**",
    ".next/**",
  ],
});