import {type QueryKey}   from "@tanstack/react-query";
import {type IWithQuery} from "./IWithQuery";

export interface IInvalidator {
    readonly key: QueryKey;

    invalidator?(props: IWithQuery.InvalidatorProps): Promise<void | ReadonlyArray<unknown>>;
}

export namespace IInvalidator {
    export type Result = () => Promise<void>;
}
