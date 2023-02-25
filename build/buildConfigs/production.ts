import { Argv } from "../console";
import { BuildOptions, build, Plugin } from "esbuild";
import path from "path";
import { userScriptHeader, manifest } from "../../buildConfig";
import { writeUserscriptHeader } from "../plugins/writeUserScriptHeader";
import glob from "glob";
import fsPromises from "fs/promises";
import fs from "fs-extra";
import eslint from "esbuild-plugin-eslint";

export const productionBuild = (argv: Argv, commonPlugins: Plugin[]) => {
  const { mode, minify } = argv;

  switch (mode) {
    case "userScript":
      userScriptBuild(minify === true, commonPlugins);
      break;
    case "extension":
      extensionBuild(minify === true, commonPlugins);
      break;
    default:
      console.log("default");
      break;
  }
};

function userScriptBuild(minify: boolean, commonPlugins: Plugin[]) {
  const workingDir = process.cwd();
  const scriptName = userScriptHeader["@name"];
  const version = userScriptHeader["@version"];

  const options: BuildOptions = {
    logLevel: "info",
    plugins: [
      ...commonPlugins,
      writeUserscriptHeader(userScriptHeader),
      eslint(),
    ],
    define: {
      "process.env.NODE_ENV": "'production'",
    },
    bundle: true,
    minify,
    entryPoints: [path.join(workingDir, "src", "index.ts")],
    outfile: path.join(
      workingDir,
      "dist",
      `${scriptName}-${version}` + (minify ? ".min" : "") + ".user.js"
    ),
  };

  build(options);
}

async function extensionBuild(minify: boolean, commonPlugins: Plugin[]) {
  const workingDir = process.cwd();
  const scriptName = userScriptHeader["@name"];
  const version = userScriptHeader["@version"];

  await fs.remove(path.join(workingDir, "dist", `${scriptName}-${version}`));

  const entryPoints = glob.sync("./src/extension/**/*.ts");

  const options: BuildOptions = {
    logLevel: "info",
    plugins: [...commonPlugins, eslint()],
    define: {
      "process.env.NODE_ENV": "'production'",
    },
    bundle: true,
    minify,
    entryPoints,
    outdir: path.join(workingDir, "/dist/", `${scriptName}-${version}`),
  };

  await build(options);

  fsPromises.writeFile(
    path.join(
      workingDir,
      "/dist/",
      `${scriptName}-${version}`,
      "manifest.json"
    ),
    JSON.stringify(manifest)
  );

  if (
    fs.existsSync(
      path.join(workingDir, "/dist/", `${scriptName}-${version}`, "_locales")
    ) === false
  ) {
    await fsPromises.mkdir(
      path.join(workingDir, "/dist/", `${scriptName}-${version}`, "_locales")
    );
  }

  if (fs.existsSync(path.join(workingDir, "src/extension/assets/"))) {
    fs.copySync(
      path.join(workingDir, "src/extension", "assets"),
      path.join(workingDir, "/dist/", `${scriptName}-${version}`, "/assets")
    );
  }

  const langFiles = glob.sync("./src/extension/_locales/*");
  langFiles.forEach(async (langFilePath) => {
    const split = langFilePath.split("/");

    if (
      fs.existsSync(
        path.join(
          workingDir,
          "/dist/",
          `${scriptName}-${version}`,
          "/_locales/",
          split[4]
        )
      ) === false
    ) {
      await fsPromises.mkdir(
        path.join(
          workingDir,
          "/dist/",
          `${scriptName}-${version}`,
          "/_locales/",
          split[4]
        )
      );
    }

    fsPromises.copyFile(
      path.join(langFilePath, "messages.json"),
      path.join(
        workingDir,
        "/dist/",
        `${scriptName}-${version}`,
        "/_locales/",
        split[4],
        "messages.json"
      )
    );
  });
}
