import {type ResponseSchema}      from "@pico/schema";
import {type z}                   from "@pico/utils";
import {type FC}                  from "react";
import {type WithQuery}           from "../api/WithQuery";
import {type ErrorResponseSchema} from "../schema/ErrorResponseSchema";

export namespace QueryResult {
    export interface Props<
        TResponseSchema extends ResponseSchema,
    > {
        result: WithQuery.Result<TResponseSchema>;
        WithLoading?: FC<object>;
        WithSuccess?: FC<{
            data: z.infer<TResponseSchema>;
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
