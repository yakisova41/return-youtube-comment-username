import express from "express";
import getArgv from "./modules/getArgv";
import path from "path";
import fs from "fs-extra";

const workingDir = process.cwd();

const packageJson = JSON.parse(
    fs.readFileSync(path.join(workingDir, "package.json"), "utf8")
);

const argv = getArgv();

let host: string;
let port: number;
packageJson.userScript.devServer?.host
    ? (host = packageJson.userScript.devServer.host)
    : (host = "127.0.0.1");
packageJson.userScript.devServer?.port
    ? (port = packageJson.userScript.devServer.port)
    : (port = 8080);

const app = express();

app.get("/index.user.js", (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.sendFile(path.join(workingDir, "/dist/", "index.user.js"));
});

app.get("/script", (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    if ((argv["mode"] = "dev")) {
        res.sendFile(path.join(workingDir, "/build/tmp", "dev.user.js"));
    }
});

try {
    app.listen(port, host, () => {
        let realscript = "";

        if ((argv["mode"] = "dev")) {
            realscript = `\n Real script url: http://${host}:${port}/script`;
        }

        console.log(
            `\x1b[43m\n\n\x1b[1m Userscript url: http://${host}:${port}/index.user.js${realscript}\n\x1b[49m`
        );
    });
} catch (err) {
    process.exit(1);
}
