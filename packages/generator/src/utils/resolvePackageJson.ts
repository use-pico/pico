import {type IfExtends}   from "@pico/types";
import {isObject}         from "@pico/utils";
import {
    existsSync,
    readFileSync
}                         from "node:fs";
import {type PackageJson} from "type-fest";

export const resolvePackageJson = <TExtends = void>(): IfExtends<PackageJson, TExtends> => {
    const packageJsonFile = `${process.cwd()}/package.json`;
    if (!existsSync(packageJsonFile)) {
        throw new Error(`Cannot resolve package.json in [${packageJsonFile}].`);
    }
    const content = readFileSync(packageJsonFile, {encoding: "utf8"});
    if (!content) {
        throw new Error(`Cannot read package.json from [${packageJsonFile}].`);
    }
    const packageJson = JSON.parse(content);
    if (!isObject(packageJson)) {
        throw new Error(`Cannot JSON.parse package.json from [${packageJsonFile}], result is not an object.`);
    }
    return packageJson as any;
};
