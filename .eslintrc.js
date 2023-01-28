module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    extends: ["plugin:react/recommended", "prettier"],
    parser: "@typescript-eslint/parser",
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 2022,
        project: "./tsconfig.json",
        sourceType: "module",
        tsconfigRootDir: __dirname,
    },
    plugins: ["@typescript-eslint", "react", "react-hooks"],
    overrides: [
        {
            files: ["*.tsx", "*.ts"],
            rules: {
                "react/prop-types": "off",
            },
        },
    ],
    settings: {
        react: {
            version: "detect",
        },
    },
};
