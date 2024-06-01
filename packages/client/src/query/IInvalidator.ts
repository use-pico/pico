import {
    type QueryClient,
    type QueryKey
} from "@tanstack/react-query";

export namespace IInvalidator {
    export interface Props {
        queryClient: QueryClient;
    }

    export type Result = () => Promise<void>;
}

export interface IInvalidator {
    readonly key: QueryKey;

    invalidator?(props: IInvalidator.Props): Promise<unknown | readonly unknown[]>;
}
