import { ConsoleApp } from "./console";
import { productionBuild } from "./buildConfigs/production";
import { develpmentBuild } from "./buildConfigs/development";
import scssPlugin from "./plugins/esbuildSsrScssModulesPlugin";

const app = new ConsoleApp();

const commonPlugins = [
  scssPlugin({
    jsCSSInject: true,
  }),
];

app.addCommand("build", (argv) => {
  productionBuild(argv, commonPlugins);
});
app.addCommand("dev", (argv) => {
  develpmentBuild(argv, commonPlugins);
});
app.run();
