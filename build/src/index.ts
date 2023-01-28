import getArgv from "./modules/getArgv";
import { Plugin } from "esbuild";
import cssModulesPlugin from "esbuild-ssr-css-modules-plugin";
import eslint from "esbuild-plugin-eslint";
import normalUserscriptBuild from "./builds/normalUserscriptBuild";
import devUserscriptBuild from "./builds/devUserscriptBuild";
import extBuild from "./builds/extBuild";

const argv = getArgv();

const build = (mode: string) => {
    const plugins: Plugin[] = [
        cssModulesPlugin({
            jsCSSInject: true,
        }),
        eslint(),
    ];

    switch (mode) {
        case "build":
            normalUserscriptBuild(plugins);
            break;

        case "dev":
            devUserscriptBuild(plugins);
            break;

        case "ext":
            extBuild(plugins);
            break;
    }
};

build(argv["mode"]);
