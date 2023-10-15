import {withSourceFile}  from "@pico/generator";
import fg                from "fast-glob";
import {normalize}       from "node:path";
import {type IGenerator} from "../api/IGenerator";

export interface IGeneratorSdkBarrelParams {
}

export const generatorSdkBarrel: IGenerator<IGeneratorSdkBarrelParams> = async (
    {
        barrel,
        directory,
    }) => {
    if (!barrel) {
        return;
    }
    const $directory = directory.replaceAll("\\", "/");
    const file = withSourceFile();
    file.withExports({
        exportsOf: fg.sync(normalize(`${directory}/**/*`).replaceAll("\\", "/")).map(item => "." + item.replaceAll($directory, "").replace(".tsx", "").replace(".ts", ""))
    });
    file.saveTo({
        file:   `${directory}/index.ts`,
        barrel: false,
    });
};
