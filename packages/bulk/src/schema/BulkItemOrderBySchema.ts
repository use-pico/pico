import {OrderSchema} from "@use-pico/query";
import {
    type PicoSchema,
    withEnum,
    withRecord
}                    from "@use-pico/schema";

export const BulkItemOrderBySchema = withRecord(withEnum(["status"]), OrderSchema);
export type BulkItemOrderBySchema = typeof BulkItemOrderBySchema;
export namespace BulkItemOrderBySchema {
    export type type = PicoSchema.Output<BulkItemOrderBySchema>;
}

