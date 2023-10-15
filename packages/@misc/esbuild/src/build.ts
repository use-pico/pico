import {
    build as coolBuild,
    type BuildOptions
}                    from "esbuild";
import {withEsbuild} from "./withEsbuild";

export const build = async (config?: BuildOptions) => coolBuild(withEsbuild(config));
