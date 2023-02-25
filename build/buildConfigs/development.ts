import { Argv } from "../console";
import { BuildOptions, build, context, Plugin } from "esbuild";
import path from "path";
import { userScriptHeader } from "../../buildConfig";
import { writeUserscriptHeader } from "../plugins/writeUserScriptHeader";
import { DevServer } from "../devServer";

export const develpmentBuild = (argv: Argv, commonPlugins: Plugin[]) => {
  const { mode, minify } = argv;

  switch (mode) {
    case "userScript":
      userScriptBuild(minify === true, commonPlugins);
      break;
    default:
      userScriptBuild(minify === true, commonPlugins);
      break;
  }
};

async function userScriptBuild(minify: boolean, commonPlugins: Plugin[]) {
  const workingDir = process.cwd();

  const options: BuildOptions = {
    logLevel: "info",
    plugins: [
      ...commonPlugins,
      {
        name: "onend",
        setup(build) {
          build.onEnd(() => {
            devserver.reload();
          });
        },
      },
    ],
    define: {
      "process.env.NODE_ENV": "'development'",
    },
    bundle: true,
    minify,
    entryPoints: [path.join(workingDir, "src", "index.ts")],
    outfile: path.join(workingDir, "build/tmp/" + "script.js"),
  };

  const ctx = await context(options);

  await build({
    plugins: [writeUserscriptHeader(userScriptHeader)],
    logLevel: "silent",
    entryPoints: [path.join(workingDir, "build", "devCliant.user.ts")],
    outfile: path.join(workingDir, "build/tmp/" + "devCliant.user.js"),
    bundle: true,
    minify: true,
    define: {
      "process.env.NODE_ENV": "'production'",
    },
  });

  const devserver = DevServer();

  ctx.watch().then(() => {
    devserver.start();
  });
}
