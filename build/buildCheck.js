const fs = require("fs");
const path = require("path");
const { exec } = require("child_process");

if (!fs.existsSync(path.join(__dirname, "node_modules"))) {
    exec("npm install");
}

if (!fs.existsSync(path.join(__dirname, "dist"))) {
    exec("npx tsc");
}
