/**
 * Code copyright 2022 Max Rohde
 * Code released under the MIT license
 * https://opensource.org/licenses/mit-license.php
 *
 * Modifications copyright (C) 2023 yakisova41
 */

import type { OnLoadArgs, OnLoadResult, Plugin, PluginBuild } from "esbuild";
import { compileCss, CompileCssConfiguration } from "node-css-require";
import sha256 from "sha256";
import sass from "sass";
import path from "path";

export type { CompileCssConfiguration } from "node-css-require";

export interface CSSClientPluginOptions {
  jsCSSInject?: boolean;
  onCSSGenerated?: (css: string) => void;
  cssConfig?: CompileCssConfiguration;
}

async function generateCSSInject(sourcePath: string, css: string) {
  const styleId = sha256(sourcePath);

  return `(function(){
        if (!document.getElementById('${styleId}')) {
            var e = document.createElement('style');
            e.id = '${styleId}';
            e.textContent = \`${css}\`;
            document.head.appendChild(e);
        }
    })();`;
}

const scssPlugin = (opts?: CSSClientPluginOptions): Plugin => {
  return {
    name: "scss-plugin-client",
    setup: (build: PluginBuild) => {
      build.onLoad(
        {
          filter: /\.(scss|css)$/,
        },
        async (args: OnLoadArgs): Promise<OnLoadResult> => {
          const sassRes = sass.compile(args.path, {
            style: "compressed",
          });

          const res = await compileCss(
            sassRes.css,
            path.basename(args.path, ".scss")
          );

          let js: string;
          if (opts?.jsCSSInject) {
            js = `${await generateCSSInject(args.path, res.css)}\n${res.js}`;
          } else {
            js = res.css;
          }
          if (opts?.onCSSGenerated) {
            opts.onCSSGenerated(res.css);
          }
          return {
            contents: js,
            loader: "js",
          };
        }
      );
    },
  };
};

const pluginFactory = (opts?: CSSClientPluginOptions): Plugin => {
  return scssPlugin(opts);
};

export default pluginFactory;
