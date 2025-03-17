"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
require('dotenv').config();
console.log("Starting server...", process.env.SERVER_URL);
const defaultServer = require("./default-server");
const https = require("https");
const fs = require("fs");
defaultServer.start(function (err, app) {
    if (err) {
        throw err;
    }
    const httpsEnabled = false; // : boolean = Boolean(process.env.HTTPS) || false;
    const defaultPort = httpsEnabled ? 8443 : 3000;
    const serverUrl = process.env.SERVER_URL || 'http://localhost';
    const port = Number(process.env.API_PORT) || Number(process.env.PORT) || defaultPort;
    let server;
    if (httpsEnabled) {
        const options = {
            key: fs.readFileSync("./certs/cert.key", "utf8"),
            cert: fs.readFileSync("./certs/cert.crt", "utf8"),
        };
        server = https.createServer(options, app).listen(port, function () {
            console.log(`API host listening at ${serverUrl}:${port}`);
        });
    }
    else {
        server = app.listen(port, function () {
            console.log(`API host listening at ${serverUrl}:${port}`);
        });
    }
    server.setTimeout(0);
});
