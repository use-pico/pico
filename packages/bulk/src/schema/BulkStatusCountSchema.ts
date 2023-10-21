import {
    type PicoSchema,
    withNumber,
    withObject
} from "@use-pico/schema";

export const BulkStatusCountSchema = withObject({
    new:     withNumber(),
    pending: withNumber(),
    success: withNumber(),
    error:   withNumber(),
    settled: withNumber(),
});
export type BulkStatusCountSchema = typeof BulkStatusCountSchema;
export namespace BulkStatusCountSchema {
    export type Type = PicoSchema.Output<BulkStatusCountSchema>;
}
