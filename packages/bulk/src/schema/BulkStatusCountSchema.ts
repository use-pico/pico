import {z} from "@pico/utils";

export const BulkStatusCountSchema = z.object({
    new:     z.number(),
    pending: z.number(),
    success: z.number(),
    error:   z.number(),
    settled: z.number(),
});
export type BulkStatusCountSchema = typeof BulkStatusCountSchema;
export namespace BulkStatusCountSchema {
    export type Type = z.infer<BulkStatusCountSchema>;
}
