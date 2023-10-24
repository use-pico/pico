import {
    type NullishSchema,
    type ObjectSchema,
    type PicoSchema
}                           from "@use-pico/schema";
import {CursorSchema}       from "./CursorSchema";
import {type FilterSchema}  from "./FilterSchema";
import {type OrderBySchema} from "./OrderBySchema";

export type QuerySchema<
    TFilterSchema extends FilterSchema,
    TOrderBySchema extends OrderBySchema,
> = ObjectSchema<{
    filter: NullishSchema<TFilterSchema>;
    where: NullishSchema<TFilterSchema>;
    orderBy: NullishSchema<TOrderBySchema>;
    cursor: NullishSchema<CursorSchema>;
}>;

export namespace QuerySchema {
    export type Type<
        TFilterSchema extends FilterSchema,
        TOrderBySchema extends OrderBySchema,
    > = PicoSchema.Output<QuerySchema<TFilterSchema, TOrderBySchema>>;
}
