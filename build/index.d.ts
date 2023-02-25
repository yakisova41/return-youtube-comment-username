declare module "*.css" {
  const classes: { [className: string]: string };
  export = classes;
}

declare module "*.scss" {
  interface IClassNames {
    [className: string]: string;
  }
  const classes: IClassNames;
  const digest: string;
  const css: string;
  export default classes;
  export { classes, digest, css };
}
