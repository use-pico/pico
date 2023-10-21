import {withQuerySchema}   from "@use-pico/query";
import {type PicoSchema}   from "@use-pico/schema";
import {BulkFilterSchema}  from "./BulkFilterSchema";
import {BulkOrderBySchema} from "./BulkOrderBySchema";

export const BulkQuerySchema = withQuerySchema({
    filter:  BulkFilterSchema,
    orderBy: BulkOrderBySchema,
});
export type BulkQuerySchema = typeof BulkQuerySchema;
export namespace BulkQuerySchema {
    export type Type = PicoSchema.Output<BulkQuerySchema>;
}
