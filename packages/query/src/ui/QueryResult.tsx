import {
    type PicoSchema,
    type ResponseSchema
}                        from "@use-pico/schema";
import {
    type FC,
    PropsWithChildren
}                        from "react";
import {type IWithQuery} from "../api/IWithQuery";

export namespace QueryResult {
    export type Props<
        TResponseSchema extends ResponseSchema,
    > = PropsWithChildren<{
        result: IWithQuery.Result<TResponseSchema>;
        WithLoading?: FC;
        WithSuccess?: FC<{
            entity: NonNullable<PicoSchema.Output<TResponseSchema>>;
        }>;
        /**
         * When provided, takes precenence over WithSuccess
         */
        WithResponse?: FC<{
            entity: PicoSchema.Output<TResponseSchema>;
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
