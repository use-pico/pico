import {type FilterSchema}       from "@pico/query";
import {type WithQuery}          from "@pico/rpc";
import {type WithIdentitySchema} from "@pico/schema";

export type IWithFetchQuery<
    TFilterSchema extends FilterSchema,
    TResponseSchema extends WithIdentitySchema,
> = WithQuery<TFilterSchema, TResponseSchema>;
