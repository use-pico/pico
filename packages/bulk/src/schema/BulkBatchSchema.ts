import {
    type PicoSchema,
    schema
}                            from "@use-pico/schema";
import {BulkBatchItemSchema} from "./BulkBatchItemSchema";

export const BulkBatchSchema = schema(z => z.object({
    items: z.array(BulkBatchItemSchema),
}));
export type BulkBatchSchema = typeof BulkBatchSchema;
export namespace BulkBatchSchema {
    export type Type = PicoSchema.Output<BulkBatchSchema>;
}
