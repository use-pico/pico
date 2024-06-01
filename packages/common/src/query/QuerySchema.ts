import {type z}             from "zod";
import type {CursorSchema}  from "./CursorSchema";
import type {FilterSchema}  from "./FilterSchema";
import type {OrderBySchema} from "./OrderBySchema";

/**
 * Query schema defines shape of the query used to fetch data.
 *
 * @template TFilterSchema Filter schema used to filter data.
 * @template TOrderBySchema OrderBy schema used to order data.
 *
 * @group query
 *
 * @remarks
 * Basic idea of this schema is to define a standard way how to fetch data from the source. It should be used in all queries to provide consistent API.
 *
 * `Filter` is dynamic part fully available to the user, when `where` is filter defined by your application which cannot be change by the user.
 */
export type QuerySchema<
    TFilterSchema extends FilterSchema,
    TOrderBySchema extends OrderBySchema,
> = z.ZodObject<{
    /**
     * User-land filter.
     */
    filter: z.ZodOptional<z.ZodNullable<TFilterSchema>>;
    /**
     * "Hard" filter, overrides "filter"; this is useful for bound queries (for example given `clientId` should not be changed).
     */
    where: z.ZodOptional<z.ZodNullable<TFilterSchema>>;
    /**
     * Order by schema.
     */
    orderBy: z.ZodOptional<z.ZodNullable<TOrderBySchema>>;
    /**
     * Paging support.
     */
    cursor: z.ZodOptional<z.ZodNullable<CursorSchema>>;
}, "strip">;

export namespace QuerySchema {
    export type Type<
        TFilterSchema extends FilterSchema,
        TOrderBySchema extends OrderBySchema,
    > = z.infer<QuerySchema<TFilterSchema, TOrderBySchema>>;
}
