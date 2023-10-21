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
    TFilterSchema extends FilterSchema,
    TOrderBySchema extends OrderBySchema,
> extends WithQuery<QuerySchema<TFilterSchema, TOrderBySchema>, TResponseSchema> {
    query: IQueryStore<TFilterSchema, TOrderBySchema>;

    useFilter(): (filter: PicoSchema.Output<TFilterSchema>) => void;

    useShallowFilter(): (filter?: PicoSchema.Output<TFilterSchema>) => void;

    useOrderBy(): (orderBy: PicoSchema.Output<TOrderBySchema>) => void;

    useShallowOrderBy(): (orderBy?: PicoSchema.Output<TOrderBySchema>) => void;
}
