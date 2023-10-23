import {withSourceFile}  from "@use-pico/generator";
import {normalize}       from "node:path";
import {type IGenerator} from "../../api/IGenerator";

export interface IWithUseRepositoryParams {
    repositories: IWithUseRepositoryParams.IRepository[];
}

export namespace IWithUseRepositoryParams {
    export interface IRepository {
        /**
         * Base name exported (used to name all exported objects)
         */
        name: string;
        /**
         * Required package imports
         */
        packages: IPackages;
        trpc: ITrpc;
    }

    export interface IPackages {
        /**
         * Package used to import all schema-related types (ISource implementation, IWhere and so on, can be generated by @pico).
         */
        schema: string;
    }

    export interface ITrpc {
        /**
         * Package (import) of client-side TRPC (should export named trpc)
         */
        package: string;
        /**
         * Part of the trpc call chain (base is `trpc`.${trpcPath}.`...rest of standard trpc router`
         */
        path: string;
    }
}

export const withUseRepository: IGenerator<IWithUseRepositoryParams> = async (
    {
        barrel,
        directory,
        params: {repositories}
    }) => {
    repositories.forEach((
        {
            name,
            trpc,
            packages
        }) => {
        console.log(`- Generating [withUseRepository] [${name}]`);

        withSourceFile()
            .withImports({
                imports: {
                    "@use-pico/source-client": [
                        "withUseRepository",
                    ],
                    [packages.schema]:     [
                        `type IUse${name}Repository as UseRepository`,
                        `type I${name}SourceSchema as SourceSchema`,
                    ],
                }
            })
            .withImports({
                imports: {
                    [trpc.package]: [
                        "trpc",
                    ],
                },
            })
            .withConsts({
                exports: {
                    [`Use${name}Repository`]: {
                        type: `UseRepository`,
                        body: `withUseRepository<SourceSchema>(trpc.${trpc.path}.repository)`,
                    },
                }
            })
            .saveTo({
                file: normalize(`${directory}/trpc/Use${name}Repository.tsx`),
                barrel,
            });
    });
};