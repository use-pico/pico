import {sortOf}          from "@use-pico/query";
import {type PicoSchema} from "@use-pico/schema";

export const BulkItemOrderBySchema = sortOf(["status"]);
export type BulkItemOrderBySchema = typeof BulkItemOrderBySchema;
export namespace BulkItemOrderBySchema {
    export type type = PicoSchema.Output<BulkItemOrderBySchema>;
}

