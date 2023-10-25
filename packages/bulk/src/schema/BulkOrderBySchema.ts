import {OrderSchema} from "@use-pico/query";
import {
    type PicoSchema,
    schema
}                    from "@use-pico/schema";

export const BulkOrderBySchema = schema(z => z.record(z.enum(["created", "name"]), OrderSchema));
export type BulkOrderBySchema = typeof BulkOrderBySchema;
export namespace BulkOrderBySchema {
    export type Type = PicoSchema.Output<BulkOrderBySchema>;
}
