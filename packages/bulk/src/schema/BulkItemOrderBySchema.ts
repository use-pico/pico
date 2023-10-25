import {OrderSchema} from "@use-pico/query";
import {
    type PicoSchema,
    schema
}                    from "@use-pico/schema";

export const BulkItemOrderBySchema = schema(z => z.record(z.enum(["status"]), OrderSchema));
export type BulkItemOrderBySchema = typeof BulkItemOrderBySchema;
export namespace BulkItemOrderBySchema {
    export type type = PicoSchema.Output<BulkItemOrderBySchema>;
}

