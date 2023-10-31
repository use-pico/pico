import {type UseQueryResult} from "@tanstack/react-query";
import {
    type CountSchema,
    type IWithQuery,
    type QuerySchema
}                            from "@use-pico/query";
import {
    type ArraySchema,
    type PicoSchema,
    type WithIdentitySchema
}                            from "@use-pico/schema";

export interface IWithSourceQuery<
    TQuerySchema extends QuerySchema<any, any>,
    TSchema extends WithIdentitySchema,
> extends IWithQuery<
    TQuerySchema,
    ArraySchema<TSchema>
> {
    withCountQuery: IWithQuery<TQuerySchema, CountSchema>;
}

export namespace IWithSourceQuery {
    export type Result<
        TResponseSchema extends WithIdentitySchema,
    > = UseQueryResult<
        PicoSchema.Output<TResponseSchema>[],
        any
    >;
}
