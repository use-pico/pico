import {CursorSchema}          from "@pico/query";
import {z}                     from "@pico/utils";
import {BulkItemFilterSchema}  from "./BulkItemFilterSchema";
import {BulkItemOrderBySchema} from "./BulkItemOrderBySchema";

export const BulkItemQuerySchema = z.object({
    where:   BulkItemFilterSchema.nullish(),
    filter:  BulkItemFilterSchema.nullish(),
    orderBy: BulkItemOrderBySchema.nullish(),
    cursor:  CursorSchema.nullish(),
});
export type BulkItemQuerySchema = typeof BulkItemQuerySchema;
export namespace BulkItemQuerySchema {
    export type Type = z.infer<BulkItemQuerySchema>;
}
