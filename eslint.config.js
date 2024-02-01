"use strict";

const js = require("@eslint/js");
const lintRules = require("./eslint.rules.js").lintRules;
const globals = require("globals");

module.exports = [
    {
        ignores: ["**/coverage/", "**/leaflet.js", "admin/", "customer-webb", "phone-app"]
    },

    js.configs.recommended,

    {
        files: ["eslint.*.js", "backend/**/*.js", "bike-sim/**/*.js"],

        languageOptions: {
            ecmaVersion: "latest",
            sourceType: "commonjs",
            globals: globals.node
        },

        ...lintRules
    },

    {
        files: ["backend/**/*.mjs", "bike-sim/**/*.mjs"],

        languageOptions: {
            ecmaVersion: "latest",
            sourceType: "module",
            globals: globals.browser
        },

        ...lintRules
    }
];

