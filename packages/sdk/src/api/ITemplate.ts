import {type IfExtends} from "@use-pico/types";

export type ITemplate<TParams = void> = IfExtends<
    {
        /**
         * Package name where SDK is generated (name of your app or monorepo library name (like @myapp/model))
         */
        packageName: string;
        /**
         * Precomputed normalized target path
         */
        directory: string;
        /**
         * Should also index.ts be generated/updated?
         */
        barrel: boolean;
    },
    {
        params: TParams
    }
>;
