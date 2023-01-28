import fs from "fs";
import { Plugin } from "esbuild";
import path from "path";

export default (): Plugin => ({
    name: "writeUserscriptHeader",
    setup(build) {
        build.onEnd(() => {
            const workingDir = process.cwd();

            const packageJson = JSON.parse(
                fs.readFileSync(path.join(workingDir, "package.json"), "utf8")
            );

            const outFile = build.initialOptions.outfile;
            const buildResult = fs.readFileSync(outFile);

            let userscriptHeaders: string[] = [];

            userscriptHeaders.push("// ==UserScript==");
            Object.keys(packageJson.userScript).forEach((key) => {
                if (key[0] === "@") {
                    userscriptHeaders.push(
                        `// ${key} ${packageJson["userScript"][key]}`
                    );
                }
            });
            userscriptHeaders.push("// ==/UserScript==");

            fs.writeFileSync(
                outFile,
                [userscriptHeaders.join("\n"), buildResult].join("\n\n")
            );
        });
    },
});
