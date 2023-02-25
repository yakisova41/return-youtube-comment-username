import chokidar from "chokidar";
import path from "path";
import webSocket from "ws";
import fs from "fs-extra";

const workingDir = process.cwd();

const packageJson = JSON.parse(
    fs.readFileSync(path.join(workingDir, "package.json"), "utf8")
);

let host: string;
let port: number;
let sockport: number;
let hot: boolean;
packageJson.userScript.devServer?.host
    ? (host = packageJson.userScript.devServer.host)
    : (host = "127.0.0.1");
packageJson.userScript.devServer?.port
    ? (port = packageJson.userScript.devServer.port)
    : (port = 8080);
packageJson.userScript.devServer?.websocket
    ? (sockport = packageJson.userScript.devServer.websocket)
    : (sockport = 5001);
packageJson.userScript.devServer?.hot ? (hot = true) : (hot = false);

if (hot) {
    const wserver = new webSocket.Server({ port: sockport });

    console.log(
        `\x1b[46m\n\n\x1b[1m HotReload server Running: ws://localhost:${sockport}\n\x1b[49m`
    );

    wserver.on("connection", (ws) => {
        ws.send("connect");
    });

    const watcher = chokidar.watch(path.join(__dirname, "/../tmp/"));
    watcher.on("ready", () => {
        watcher.on("change", (e) => {
            wserver.clients.forEach((client) => {
                console.log("Reloading...");

                client.send("reload");
            });
        });
    });
}
