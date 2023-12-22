"use strict";

const js = require("@eslint/js");
const stylisticJs = require("@stylistic/eslint-plugin-js");
const globals = require("globals");

module.exports = [
    js.configs.recommended,
    {
        languageOptions: {
            ecmaVersion: "latest",
            sourceType: "commonjs",
            globals: globals.node
        },

        plugins: {
            "@stylistic/js": stylisticJs
        },

        rules: {
            "@stylistic/js/brace-style": ["error", "1tbs", { allowSingleLine: true }],
            camelcase: ["error", { properties: "never" }],
            curly: ["error", "all"],
            "@stylistic/js/eol-last": ["error", "always"],
            "@stylistic/js/indent": ["error", 4, { SwitchCase: 1 }],
            "@stylistic/js/keyword-spacing": "error",
            "@stylistic/js/linebreak-style": ["error", "unix"],
            "@stylistic/js/no-trailing-spaces": "error",
            "no-with": "error",
            "@stylistic/js/semi": ["error", "always"],
            // ...
        }
    }
];
