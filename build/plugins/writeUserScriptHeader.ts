import fs from "fs";
import { Plugin } from "esbuild";

export function writeUserscriptHeader(userScriptHeader: {
  [key: string]: string;
}): Plugin {
  return {
    name: "writeUserscriptHeader",
    setup(build) {
      build.onEnd(() => {
        const outFile = build.initialOptions.outfile;
        const buildResult = fs.readFileSync(outFile);

        let userscriptHeaders: string[] = [];

        userscriptHeaders.push("// ==UserScript==");
        Object.keys(userScriptHeader).forEach((key) => {
          if (key[0] === "@") {
            userscriptHeaders.push(`// ${key} ${userScriptHeader[key]}`);
          }
        });
        userscriptHeaders.push("// ==/UserScript==");

        fs.writeFileSync(
          outFile,
          [userscriptHeaders.join("\n"), buildResult].join("\n\n")
        );
      });
    },
  };
}
