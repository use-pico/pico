import {type BuildOptions} from "esbuild";
import CssModulesPlugin    from "esbuild-css-modules-plugin";
import {glob}              from "glob";

export const withEsbuild = (config?: BuildOptions): BuildOptions => {
    return {
        entryPoints: glob.sync("./src/**/*.ts"),
        bundle:      false,
        target:      [
            "es2022"
        ],
        platform:    "node",
        format:      "esm",
        sourcemap:   false,
        outdir:      "lib",
        packages:    "external",
        plugins: [
            CssModulesPlugin({
                force:               true,
                emitDeclarationFile: ".css.d.ts",
                localsConvention:    "camelCaseOnly",
                namedExports:        true,
                inject:              false,
            })
        ],
        ...config,
    };
};
