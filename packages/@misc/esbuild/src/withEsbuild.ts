import {type BuildOptions} from "esbuild";
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
        ...config,
    };
};
