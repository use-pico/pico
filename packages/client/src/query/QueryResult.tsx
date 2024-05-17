import type {ResponseSchema} from "@use-pico2/common";
import {
    type FC,
    type PropsWithChildren
}                            from "react";
import {type z}              from "zod";
import {IWithQuery}          from "./IWithQuery";

export namespace QueryResult {
    export type Props<
        TResponseSchema extends ResponseSchema,
    > = PropsWithChildren<{
        result: IWithQuery.Result<TResponseSchema>;
        WithLoading?: FC;
        WithSuccess?: FC<{
            entity: NonNullable<z.infer<TResponseSchema>>;
        }>;
        WithResponse?: FC<{
            entity: z.infer<TResponseSchema>;
        }>;
        WithError?: FC<{
            error: any;
        }>;
    }>
}

export const QueryResult = <
    TResponseSchema extends ResponseSchema,
>(
    {
        result,
        WithLoading,
        WithSuccess,
        WithResponse,
        WithError,
        children
    }: QueryResult.Props<TResponseSchema>
) => {
    if (result.isLoading && WithLoading) {
        return <WithLoading/>;
    } else if (result.isSuccess && result.data && WithSuccess) {
        return <WithSuccess entity={result.data}/>;
    } else if (result.isSuccess && WithResponse) {
        return <WithResponse entity={result.data}/>;
    } else if (result.isError && WithError) {
        return <WithError error={result.error}/>;
    }
    return children;
};
