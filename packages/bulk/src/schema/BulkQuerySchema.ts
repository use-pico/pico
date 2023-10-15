import {CursorSchema}      from "@pico/query";
import {z}                 from "@pico/utils";
import {BulkFilterSchema}  from "./BulkFilterSchema";
import {BulkOrderBySchema} from "./BulkOrderBySchema";

export const BulkQuerySchema = z.object({
    where:   BulkFilterSchema.nullish(),
    filter:  BulkFilterSchema.nullish(),
    orderBy: BulkOrderBySchema.nullish(),
    cursor:  CursorSchema.nullish(),
});
export type BulkQuerySchema = typeof BulkQuerySchema;
export namespace BulkQuerySchema {
    export type Type = z.infer<BulkQuerySchema>;
}
