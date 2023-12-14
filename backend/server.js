/**
 * The bike rental backend server app.
 * © Vteam 2023 Group 8.
 */
const port = 1337;
import express from 'express';
import routeAPI from './routes/api.js';
import { closeDB } from "./models/db_model.js";
import { on } from 'node:process';

const app = express();

//app.set("json spaces", 2);

function shutDown(code) {
    console.log(`\nReceived ${code}.`);
    console.log("Closing HTTP server.");

    server.close(() => {
        console.log("Closing database connection.");
        closeDB();
    });
}

on('exit', (code) => {
    console.log(`Exiting with code: ${code}`);
});

on('SIGINT', (code) => {
    shutDown(code);
});

on('SIGTERM', (code) => {
    shutDown(code);
});

on('SIGHUP', (code) => {
    shutDown(code);
});

app.use("public")

app.use("/api/v1", routeAPI);

const server = app.listen(port, () => {
    console.log(`Bike server listening on port ${port}`);
});

