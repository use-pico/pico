import {type z}             from "zod";
import type {CursorSchema}  from "./CursorSchema";
import type {FilterSchema}  from "./FilterSchema";
import type {OrderBySchema} from "./OrderBySchema";

export type QuerySchema<
    TFilterSchema extends FilterSchema,
    TOrderBySchema extends OrderBySchema,
> = z.ZodObject<{
    filter: z.ZodOptional<z.ZodNullable<TFilterSchema>>;
    where: z.ZodOptional<z.ZodNullable<TFilterSchema>>;
    orderBy: z.ZodOptional<z.ZodNullable<TOrderBySchema>>;
    cursor: z.ZodOptional<z.ZodNullable<CursorSchema>>;
}, "strip">;

export namespace QuerySchema {
    export type Type<
        TFilterSchema extends FilterSchema,
        TOrderBySchema extends OrderBySchema,
    > = z.infer<QuerySchema<TFilterSchema, TOrderBySchema>>;
}
