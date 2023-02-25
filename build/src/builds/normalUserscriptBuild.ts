import esbuild, { BuildOptions, Plugin } from "esbuild";
import path from "path";
import writeUserscriptHeader from "../plugins/writeUserscriptHeader";
import fs from "fs-extra";

export default (plugins: Plugin[], additionConfig: BuildOptions) => {
    const workingDir = process.cwd();

    const packageJson = JSON.parse(
        fs.readFileSync(path.join(workingDir, "package.json"), "utf8")
    );

    const config: BuildOptions = {
        logLevel: "info",
        entryPoints: [path.join(workingDir, "src", "index.ts")],
        define: {
            "process.env.NODE_ENV": "'production'",
        },
        outfile: path.join(workingDir, "dist", "index.user.js"),
        bundle: true,
        plugins: [...plugins, writeUserscriptHeader()],
    };

    if (packageJson.userScript?.esbuild !== undefined) {
        Object.keys(packageJson.userScript.esbuild).forEach((key) => {
            config[key] = packageJson.userScript.esbuild[key];
        });
    }

    Object.keys(additionConfig).forEach((key) => {
        config[key] = additionConfig[key];
    });

    esbuild.build(config).catch(() => process.exit(1));
};
