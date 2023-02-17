import esbuild, { BuildOptions, Plugin } from "esbuild";
import path from "path";
import glob from "glob";
import extensionBuild from "../plugins/extensionBuild";

export default (plugins: Plugin[], additionConfig: BuildOptions) => {
    const workingDir = process.cwd();

    const entryPoints = glob.sync("./src/extension/**/*.ts");

    const config: BuildOptions = {
        logLevel: "info",
        entryPoints,
        define: {
            "process.env.NODE_ENV": "'production'",
        },
        outdir: path.join(workingDir, "/dist/extension"),
        bundle: true,
        plugins: [...plugins, extensionBuild()],
        minify: true,
    };

    Object.keys(additionConfig).forEach((key) => {
        config[key] = additionConfig[key];
    });

    esbuild.build(config).catch(() => process.exit(1));
};
