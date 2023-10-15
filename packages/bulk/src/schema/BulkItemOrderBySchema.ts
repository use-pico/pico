import {z} from "@pico/utils";

export const BulkItemOrderBySchema = z.record(z.enum(["status"]), z.enum(["asc", "desc"]));
export type BulkItemOrderBySchema = typeof BulkItemOrderBySchema;
export namespace BulkItemOrderBySchema {
    export type type = z.infer<BulkItemOrderBySchema>;
}

