import {
    type FilterSchema,
    type IQueryStore,
    type OrderBySchema,
    type QuerySchema,
}                       from "@use-pico/query";
import {
    type PicoSchema,
    type ResponseSchema
}                       from "@use-pico/schema";
import {type WithQuery} from "./WithQuery";

export interface WithFindByQuery<
    TResponseSchema extends ResponseSchema,
    TQuerySchema extends QuerySchema<FilterSchema, OrderBySchema>,
> extends WithQuery<TQuerySchema, TResponseSchema> {
    query: IQueryStore<TQuerySchema>;

    useFilter(): (filter: PicoSchema.Output<TQuerySchema["shape"]["filter"]>) => void;

    useShallowFilter(): (filter?: PicoSchema.Output<TQuerySchema["shape"]["filter"]>) => void;

    useOrderBy(): (orderBy: PicoSchema.Output<TQuerySchema["shape"]["orderBy"]>) => void;

    useShallowOrderBy(): (orderBy?: PicoSchema.Output<TQuerySchema["shape"]["orderBy"]>) => void;
}
