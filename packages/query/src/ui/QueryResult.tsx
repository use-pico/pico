import {
    type PicoSchema,
    type ResponseSchema
}                                 from "@use-pico/schema";
import {type FC}                  from "react";
import {type WithQuery}           from "../api/WithQuery";
import {type ErrorResponseSchema} from "../schema/ErrorResponseSchema";

export namespace QueryResult {
    export interface Props<
        TResponseSchema extends ResponseSchema,
    > {
        result: WithQuery.Result<TResponseSchema>;
        WithLoading?: FC;
        WithSuccess?: FC<{
            data: PicoSchema.Output<TResponseSchema>;
        }>;
        WithError?: FC<{
            error: ErrorResponseSchema.Type;
        }>;
    }
}

export const QueryResult = <
    TResponseSchema extends ResponseSchema,
>(
    {
        result,
        WithLoading,
        WithSuccess,
        WithError,
    }: QueryResult.Props<TResponseSchema>
) => {
    if (result.isLoading && WithLoading) {
        return <WithLoading/>;
    } else if (result.isSuccess && WithSuccess) {
        return <WithSuccess data={result.data}/>;
    } else if (result.isError && WithError) {
        return <WithError error={result.error}/>;
    }
    return null;
};
