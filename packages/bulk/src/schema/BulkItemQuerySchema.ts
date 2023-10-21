import {withQuerySchema}       from "@use-pico/query";
import {type PicoSchema}       from "@use-pico/schema";
import {BulkItemFilterSchema}  from "./BulkItemFilterSchema";
import {BulkItemOrderBySchema} from "./BulkItemOrderBySchema";

export const BulkItemQuerySchema = withQuerySchema({
    filter:  BulkItemFilterSchema,
    orderBy: BulkItemOrderBySchema,
});
export type BulkItemQuerySchema = typeof BulkItemQuerySchema;
export namespace BulkItemQuerySchema {
    export type Type = PicoSchema.Output<BulkItemQuerySchema>;
}
