import {
    type PicoSchema,
    schema
} from "@use-pico/schema";

export const BulkBatchItemSchema = schema(z => z.object({
    service: z.nonEmptyString,
    bulkId:  z.nonEmptyString,
}));
export type BulkBatchItemSchema = typeof BulkBatchItemSchema;
export namespace BulkBatchItemSchema {
    export type Type = PicoSchema.Output<BulkBatchItemSchema>;
}
