import {sortOf}          from "@use-pico/query";
import {type PicoSchema} from "@use-pico/schema";

export const BulkOrderBySchema = sortOf(["created", "name"]);
export type BulkOrderBySchema = typeof BulkOrderBySchema;
export namespace BulkOrderBySchema {
    export type Type = PicoSchema.Output<BulkOrderBySchema>;
}
