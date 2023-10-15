import {type FilterSchema}       from "@use-pico/query";
import {type WithQuery}          from "@use-pico/rpc";
import {type WithIdentitySchema} from "@use-pico/schema";

export type IWithFetchQuery<
    TFilterSchema extends FilterSchema,
    TResponseSchema extends WithIdentitySchema,
> = WithQuery<TFilterSchema, TResponseSchema>;
