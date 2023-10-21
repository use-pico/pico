import {
    type CountSchema,
    type FilterSchema,
    type IQueryStore,
    type OrderBySchema,
    type QuerySchema,
}                        from "@use-pico/query";
import {
    type ArraySchema,
    type PicoSchema,
    type ResponseSchema
}                        from "@use-pico/schema";
import {type withFilter} from "@use-pico/source";
import {type WithQuery}  from "./WithQuery";

export interface WithSourceQuery<
    TResponseSchema extends ResponseSchema,
    TFilterSchema extends FilterSchema,
    TOrderBySchema extends OrderBySchema,
> extends Omit<
    WithQuery<
        QuerySchema<
            TFilterSchema,
            TOrderBySchema
        >,
        ArraySchema<TResponseSchema>
    >,
    "schema"
> {
    schema: {
        schema: TResponseSchema;
        filter: TFilterSchema;
        orderBy: TOrderBySchema;
        request: QuerySchema<TFilterSchema, TOrderBySchema>;
        response: ArraySchema<TResponseSchema>;
    };

    query: IQueryStore<TFilterSchema, TOrderBySchema>;

    /**
     * Get count of items provided by this query (using current query store)
     */
    useCount: WithQuery<never, CountSchema>["useQuery"];
    /**
     * GEt count of items provided by this query using query request directly.
     */
    useCountEx: WithQuery<QuerySchema<TFilterSchema, TOrderBySchema>, CountSchema>["useQueryEx"];

    useFilter(): (filter: PicoSchema.Output<TFilterSchema>) => void;

    useShallowFilter(): (filter?: PicoSchema.Output<TFilterSchema>) => void;

    useOrderBy(): (orderBy: PicoSchema.Output<TOrderBySchema>) => void;

    useShallowOrderBy(): (orderBy?: PicoSchema.Output<TOrderBySchema>) => void;

    WithFilter: withFilter.WithFilter<TFilterSchema, TOrderBySchema>;
}
