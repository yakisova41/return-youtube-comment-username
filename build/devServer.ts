import express from "express";
import path from "path";
import { devServer } from "../buildConfig";
import ws from "ws";

export function DevServer() {
    const workingDir = process.cwd();
    let hotServer: { reload: () => void };

    return {
        start: () => {
            hotServer = startHotServer();
            startExpress(workingDir);
        },
        reload: () => {
            hotServer.reload();
        },
    };
}

function startExpress(workingDir) {
    const app = express();

    app.get("/script", (req, res) => {
        res.header("Access-Control-Allow-Origin", "*");
        res.sendFile(path.join(workingDir, "build/tmp", "script.js"));
    });

    app.get("/index.user.js", (req, res) => {
        res.sendFile(path.join(workingDir, "build/tmp", "devCliant.user.js"));
    });

    app.listen(devServer.port, devServer.host, () => {
        console.log(
            "[" + "\x1b[32m" + "DevServer" + "\x1b[39m" + "]",
            `Dev server started on http://${devServer.host}:${devServer.port}`
        );

        console.log(
            "[" + "\x1b[32m" + "DevServer" + "\x1b[39m" + "]",
            `Script url: http://${devServer.host}:${devServer.port}/index.user.js`
        );
    });
}

function startHotServer() {
    const wserver = new ws.Server({ port: devServer.websocket });

    console.log(
        "[" + "\x1b[36m" + "HotServer" + "\x1b[39m" + "]",
        `Hot server started on ws://${devServer.host}:${devServer.websocket}`
    );

    wserver.on("connection", (ws) => {
        ws.send("connect");
    });

    return {
        reload: () => {
            wserver.clients.forEach((client) => {
                client.send("reload");
            });
        },
    };
}
