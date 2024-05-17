import type {UseQueryResult} from "@tanstack/react-query";
import type {
    CountSchema,
    FilterSchema,
    OrderBySchema,
    QuerySchema,
    WithIdentitySchema
}                            from "@use-pico2/common";
import {type z}              from "zod";
import {type IWithQuery}     from "./IWithQuery";

export interface IWithSourceQuery<
    TQuerySchema extends QuerySchema<FilterSchema, OrderBySchema>,
    TSchema extends WithIdentitySchema,
> extends IWithQuery<
    TQuerySchema,
    z.ZodArray<TSchema>
> {
    withCountQuery: IWithQuery<TQuerySchema, CountSchema>;
}

export namespace IWithSourceQuery {
    export type Result<
        TResponseSchema extends WithIdentitySchema,
    > = UseQueryResult<
        z.infer<TResponseSchema>[],
        any
    >;
}
