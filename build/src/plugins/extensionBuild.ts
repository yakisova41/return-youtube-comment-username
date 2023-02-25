import fs from "fs-extra";
import { Plugin } from "esbuild";
import path from "path";
import glob from "glob";

export default (): Plugin => ({
    name: "extensionBuild",
    setup: (build) => {
        build.onStart(() => {
            const workingDir = process.cwd();

            fs.copySync(
                path.join(workingDir, "/manifest.json"),
                path.join(workingDir, "/dist/extension/manifest.json")
            );

            if (
                fs.existsSync(path.join(workingDir, "/src/extension/_locales"))
            ) {
                fs.copySync(
                    path.join(workingDir, "/src/extension/_locales/"),
                    path.join(workingDir, "/dist/extension/_locales/")
                );
            }

            const matches = glob.sync("./assets/**/*");

            matches.forEach((match) => {
                const split = match.split("/");
                const filename = split[split.length - 1];
                fs.copySync(
                    path.join(workingDir, match),
                    path.join(workingDir, "/dist/extension/", filename)
                );
            });
        });
    },
});
