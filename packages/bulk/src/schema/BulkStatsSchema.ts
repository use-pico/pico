import {
    type PicoSchema,
    withObject
}                              from "@use-pico/schema";
import {BulkStatusCountSchema} from "./BulkStatusCountSchema";

export const BulkStatsSchema = withObject({
    statusCount: BulkStatusCountSchema,
});
export type BulkStatsSchema = typeof BulkStatsSchema;
export namespace BulkStatsSchema {
    export type Type = PicoSchema.Output<BulkStatsSchema>;
}
