import {
    type PicoSchema,
    schema
} from "@use-pico/schema";

export const BulkStatusCountSchema = schema(z => z.object({
    new:     z.number,
    pending: z.number,
    success: z.number,
    error:   z.number,
    settled: z.number,
}));
export type BulkStatusCountSchema = typeof BulkStatusCountSchema;
export namespace BulkStatusCountSchema {
    export type Type = PicoSchema.Output<BulkStatusCountSchema>;
}
