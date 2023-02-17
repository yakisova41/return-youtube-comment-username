import getArgv from "./modules/getArgv";
import { Plugin, BuildOptions } from "esbuild";
import cssModulesPlugin from "esbuild-ssr-css-modules-plugin";
import eslint from "esbuild-plugin-eslint";
import normalUserscriptBuild from "./builds/normalUserscriptBuild";
import devUserscriptBuild from "./builds/devUserscriptBuild";
import extBuild from "./builds/extBuild";

type Argv = BuildOptions & { mode: "build" | "dev" | "ext" };
const argv: Argv = getArgv();
const { mode, ...esbuildConfig } = argv;

const build = (mode: string) => {
    const plugins: Plugin[] = [
        cssModulesPlugin({
            jsCSSInject: true,
        }),
        eslint(),
    ];

    switch (mode) {
        case "build":
            normalUserscriptBuild(plugins, esbuildConfig);
            break;

        case "dev":
            devUserscriptBuild(plugins);
            break;

        case "ext":
            extBuild(plugins, esbuildConfig);
            break;
    }
};

build(mode);
