import {
    type PicoSchema,
    schema
}                              from "@use-pico/schema";
import {BulkStatusCountSchema} from "./BulkStatusCountSchema";

export const BulkStatsSchema = schema(z => z.object({
    statusCount: BulkStatusCountSchema,
}));
export type BulkStatsSchema = typeof BulkStatsSchema;
export namespace BulkStatsSchema {
    export type Type = PicoSchema.Output<BulkStatsSchema>;
}
