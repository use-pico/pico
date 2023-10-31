import {
    type CountSchema,
    type IWithQuery,
    type QuerySchema,
    useQueryEx
}                                from "@use-pico/query";
import type {WithIdentitySchema} from "@use-pico/schema";
import {type IWithSourceQuery}   from "../api/IWithSourceQuery";

export namespace useCountEx {
    export interface Props<
        TQuerySchema extends QuerySchema<any, any>,
        TSchema extends WithIdentitySchema,
    > extends IWithQuery.Options<TQuerySchema, CountSchema> {
        withSourceQuery: IWithSourceQuery<TQuerySchema, TSchema>;
    }
}

export const useCountEx = <
    TQuerySchema extends QuerySchema<any, any>,
    TSchema extends WithIdentitySchema,
>(
    {
        withSourceQuery,
        ...options
    }: useCountEx.Props<TQuerySchema, TSchema>
) => {
    return useQueryEx({
        withQuery: withSourceQuery.withCountQuery,
        ...options
    });
};
