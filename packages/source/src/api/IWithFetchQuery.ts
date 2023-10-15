import {
    type FilterSchema,
    type WithIdentitySchema
}                       from "@pico/query";
import {type WithQuery} from "@pico/rpc";

export type IWithFetchQuery<
    TFilterSchema extends FilterSchema,
    TResponseSchema extends WithIdentitySchema,
> = WithQuery<TFilterSchema, TResponseSchema>;
