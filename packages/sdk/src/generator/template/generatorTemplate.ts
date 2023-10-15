import {resolvePackageJson}      from "@use-pico/generator";
import {normalize}               from "node:path";
import {type ISdkGeneratorProps} from "../../api/ISdkGeneratorProps";
import {withSdk}                 from "../../withSdk";
import {generatorSdkBarrel}      from "../generatorSdkBarrel";
import {
    type IWithTemplateParams,
    withTemplate
}                                from "./withTemplate";

export type IGeneratorTemplateProps =
    ISdkGeneratorProps
    & IWithTemplateParams;

export const generatorTemplate = (
    {
        packageName = resolvePackageJson().name,
        barrel = false,
        folder = "src/sdk",
        ...params
    }: IGeneratorTemplateProps) => {
    if (!packageName) {
        throw new Error("Cannot resolve packageName");
    }

    const $params = {
        packageName,
        barrel,
        directory: normalize(`${process.cwd()}/${folder}`),
    } as const;

    return withSdk([
        async () => {
            await withTemplate({
                ...$params,
                params: params,
            });
            barrel && await generatorSdkBarrel({
                ...$params,
                params: {},
            });
        },
    ]);
};
