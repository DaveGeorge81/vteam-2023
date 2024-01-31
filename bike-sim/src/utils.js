/**
 * Bike rental simulation utils.
 * © Jonas B., Vteam 2023 Group 8.
 */
"use strict";

const chars = "aaabcdeeefghiiijklmnoooprstuvy";
const numbs = "00123456789";

/**
 * Generate a random name.
 */
exports.randomName = function() {
    // Generate forename
    let nChars = Math.floor(3 + 3 * Math.random()); // 3 – 5
    const charsLen = chars.length;
    const nameArr = [];

    for (let i = 0; i < nChars; i++) {
        const ind = Math.floor(charsLen * Math.random());
        const char = chars.at(ind);

        if (i === 0) {
            nameArr.push(char.toUpperCase());
        } else {
            nameArr.push(char);
        }
    }

    nameArr.push(" ");

    // Generate surname
    nChars = Math.floor(4 + 3 * Math.random()); // 4 – 6

    for (let i = 0; i < nChars; i++) {
        const ind = Math.floor(charsLen * Math.random());
        const char = chars.at(ind);

        if (i === 0) {
            nameArr.push(char.toUpperCase());
        } else {
            nameArr.push(char);
        }
    }

    return "".concat(...nameArr);
};

/**
 * Generate a random bank account number.
 */
exports.randomAccount = function() {
    const numbsLen = numbs.length;
    const numbArr = [];

    for (let i = 0; i < 4; i++) {
        const ind = Math.floor(numbsLen * Math.random());
        const char = numbs.at(ind);

        numbArr.push(char);
    }

    numbArr.push("-");

    for (let i = 0; i < 6; i++) {
        const ind = Math.floor(numbsLen * Math.random());
        const char = numbs.at(ind);

        numbArr.push(char);
    }

    return "".concat(...numbArr);
};

