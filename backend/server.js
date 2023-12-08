/**
 * The bike rental backend server app.
 * © Vteam 2023 Group 8.
 */
const port = 1337;
const express = require('express');
const routeAPI = require('./routes/api.js');
const db = require("./models/db_model.js");
const process = require('node:process');

const app = express();

//app.set("json spaces", 2);

function shutDown(code) {
    console.log(`\nReceived ${code}. Closing database connection.`);
    db.closeDB();

    server.close(() => {
        console.log("Closing HTTP server.");
    });
}

process.on('exit', (code) => {
    console.log(`\nExiting with code: ${code}`);
});

process.on('SIGINT', (code) => {
    shutDown(code);
});

process.on('SIGTERM', (code) => {
    shutDown(code);
});

process.on('SIGHUP', (code) => {
    shutDown(code);
});

app.use(express.static("public"))

app.use("/api/v1", routeAPI);

const server = app.listen(port, () => {
    console.log(`Bike server listening on port ${port}`);
});

