import {
    type FilterSchema,
    type IQueryStore,
    type OrderBySchema,
    type QuerySchema,
}                            from "@pico/query";
import {type ResponseSchema} from "@pico/types";
import {type z}              from "@pico/utils";
import {type WithQuery}      from "./WithQuery";

export interface WithFindByQuery<
    TResponseSchema extends ResponseSchema,
    TFilterSchema extends FilterSchema,
    TOrderBySchema extends OrderBySchema,
> extends WithQuery<QuerySchema<TFilterSchema, TOrderBySchema>, TResponseSchema> {
    query: IQueryStore<TFilterSchema, TOrderBySchema>;

    useFilter(): (filter: z.infer<TFilterSchema>) => void;

    useShallowFilter(): (filter?: z.infer<TFilterSchema>) => void;

    useOrderBy(): (orderBy: z.infer<TOrderBySchema>) => void;

    useShallowOrderBy(): (orderBy?: z.infer<TOrderBySchema>) => void;
}
