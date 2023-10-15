import {
    type CountSchema,
    type FilterSchema,
    type IQueryStore,
    type OrderBySchema,
    type QuerySchema,
}                            from "@pico/query";
import {type ResponseSchema} from "@pico/schema";
import {type withFilter}     from "@pico/source";
import {type z}              from "@pico/utils";
import {type WithQuery}      from "./WithQuery";

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
        z.ZodArray<TResponseSchema>
    >,
    "schema"
> {
    schema: {
        schema: TResponseSchema;
        filter: TFilterSchema;
        orderBy: TOrderBySchema;
        request: QuerySchema<TFilterSchema, TOrderBySchema>;
        response: z.ZodArray<TResponseSchema>;
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

    useFilter(): (filter: z.infer<TFilterSchema>) => void;

    useShallowFilter(): (filter?: z.infer<TFilterSchema>) => void;

    useOrderBy(): (orderBy: z.infer<TOrderBySchema>) => void;

    useShallowOrderBy(): (orderBy?: z.infer<TOrderBySchema>) => void;

    WithFilter: withFilter.WithFilter<TFilterSchema, TOrderBySchema>;
}
