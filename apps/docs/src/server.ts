#!/usr/bin/env node
import {createServer} from "http";
import next           from "next";
import {parse}        from "url";

const app = next({dir: `${__dirname}/..`});
app.prepare().then(() => {
    const port = parseInt(process.env.PORT || "9090", 10);
    const handle = app.getRequestHandler();
    createServer((req, res) => handle(req, res, parse(req.url!, true))).listen(port);
    console.log(`> Leight Docs running at http://localhost:${port}`);
});
