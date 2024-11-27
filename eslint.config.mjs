import globals from "globals";
import pluginJs from "@eslint/js";
import pluginReact from "eslint-plugin-react";

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ["**/*.{js,mjs,cjs,jsx}"],
    languageOptions: {
      globals: {
        ...globals.browser, // Inclui as variáveis globais do navegador
        ...globals.node, // Inclui as variáveis globais do Node.js
      },
    },
    rules: {
      "no-undef": "error", // Regra para evitar uso de variáveis indefinidas
    },
  },
  pluginJs.configs.recommended,
  pluginReact.configs.flat.recommended,
];
