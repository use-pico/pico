import {z}                     from "@pico/utils";
import {BulkStatusCountSchema} from "./BulkStatusCountSchema";

export const BulkStatsSchema = z.object({
    statusCount: BulkStatusCountSchema,
});
export type BulkStatsSchema = typeof BulkStatsSchema;
export namespace BulkStatsSchema {
    export type Type = z.infer<BulkStatsSchema>;
}
