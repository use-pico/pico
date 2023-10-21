import {OrderSchema} from "@use-pico/query";
import {
    type PicoSchema,
    withEnum,
    withRecord
}                    from "@use-pico/schema";

export const BulkOrderBySchema = withRecord(withEnum(["created", "name"]), OrderSchema);
export type BulkOrderBySchema = typeof BulkOrderBySchema;
export namespace BulkOrderBySchema {
    export type Type = PicoSchema.Output<BulkOrderBySchema>;
}
