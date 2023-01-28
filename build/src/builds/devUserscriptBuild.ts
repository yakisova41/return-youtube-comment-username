import esbuild, { BuildOptions, Plugin } from "esbuild";
import path from "path";
import fs from "fs-extra";
import writeUserscriptHeader from "../plugins/writeUserscriptHeader";

export default (plugins: Plugin[]) => {
    const workingDir = process.cwd();

    const packageJson = JSON.parse(
        fs.readFileSync(path.join(workingDir, "package.json"), "utf8")
    );

    const hotReloadCliantconfig: BuildOptions = {
        entryPoints: [path.join(workingDir, "build/cliant", "index.ts")],
        outfile: path.join(workingDir, "/dist", "index.user.js"),
        bundle: true,
        plugins: [writeUserscriptHeader()],
    };

    const config: BuildOptions = {
        logLevel: "info",
        entryPoints: [path.join(workingDir, "/src", "index.ts")],
        outfile: path.join(workingDir, "build/tmp", "dev.user.js"),
        bundle: true,
        watch: true,
        plugins: plugins,
    };

    if (packageJson.userScript?.esbuild !== undefined) {
        Object.keys(packageJson.userScript.esbuild).forEach((key) => {
            if (key !== "entryPoints") {
                hotReloadCliantconfig[key] =
                    packageJson.userScript.esbuild[key];
            }
            config[key] = packageJson.userScript.esbuild[key];
        });
    }

    esbuild
        .build(hotReloadCliantconfig)
        .catch(() => process.exit(1))
        .then(() => {
            esbuild.build(config).catch(() => process.exit(1));
        });
};
