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
    TQuerySchema extends QuerySchema<FilterSchema, OrderBySchema>
> extends Omit<
    WithQuery<
        TQuerySchema,
        ArraySchema<TResponseSchema>
    >,
    "schema"
> {
    schema: {
        schema: TResponseSchema;
        request: TQuerySchema;
        response: ArraySchema<TResponseSchema>;
    };

    store: IQueryStore<TQuerySchema>;

    /**
     * Get count of items provided by this query (using current query store)
     */
    useCount: WithQuery<never, CountSchema>["useQuery"];
    /**
     * GEt count of items provided by this query using query request directly.
     */
    useCountEx: WithQuery<TQuerySchema, CountSchema>["useQueryEx"];

    useFilter(): (filter: PicoSchema.Output<TQuerySchema["shape"]["filter"]>) => void;

    useShallowFilter(): (filter?: PicoSchema.Output<TQuerySchema["shape"]["filter"]>) => void;

    useOrderBy(): (orderBy: PicoSchema.Output<TQuerySchema["shape"]["orderBy"]>) => void;

    useShallowOrderBy(): (orderBy?: PicoSchema.Output<TQuerySchema["shape"]["orderBy"]>) => void;

    WithFilter: withFilter.WithFilter<TQuerySchema>;
}
