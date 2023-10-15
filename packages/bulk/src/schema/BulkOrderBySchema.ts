import {z} from "@use-pico/utils";

export const BulkOrderBySchema = z.record(z.enum(["created", "name"]), z.enum(["asc", "desc"]));
export type BulkOrderBySchema = typeof BulkOrderBySchema;
export namespace BulkOrderBySchema {
    export type Type = z.infer<BulkOrderBySchema>;
}
