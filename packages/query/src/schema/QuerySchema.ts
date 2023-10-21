import {type Schema}        from "@use-pico/schema";
import {CursorSchema}       from "./CursorSchema";
import {type FilterSchema}  from "./FilterSchema";
import {type OrderBySchema} from "./OrderBySchema";

export type QuerySchema<
    TFilterSchema extends FilterSchema,
    TOrderBySchema extends OrderBySchema,
> = ReturnType<withQuerySchema<TFilterSchema, TOrderBySchema>>;

export namespace QuerySchema {
    export type Type<
        TFilterSchema extends FilterSchema,
        TOrderBySchema extends OrderBySchema,
    > = Schema.Output<QuerySchema<TFilterSchema, TOrderBySchema>>;
}

export namespace withQuerySchema {
    export interface Props<
        TFilterSchema extends FilterSchema,
        TOrderBySchema extends OrderBySchema,
    > {
        filter: TFilterSchema;
        orderBy: TOrderBySchema;
    }
}

export const withQuerySchema = <
    TFilterSchema extends FilterSchema,
    TOrderBySchema extends OrderBySchema,
>({
      filter,
      orderBy,
  }: withQuerySchema.Props<TFilterSchema, TOrderBySchema>
) => {
    return z.object({
        /**
         * Optional filter, which should be mandatory filter (for example, clientId on invoices)
         */
        filter: filter.nullish(),
        /**
         * Optional filter saying more specific filter options (this is where application user puts
         * search/filters).
         */
        where:   filter.nullish(),
        orderBy: orderBy.nullish(),
        cursor:  CursorSchema.nullish(),
    });
};
export type withQuerySchema<
    TFilterSchema extends FilterSchema,
    TOrderBySchema extends OrderBySchema,
> = typeof withQuerySchema<TFilterSchema, TOrderBySchema>;
