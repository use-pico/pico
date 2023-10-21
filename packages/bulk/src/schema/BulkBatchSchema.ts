import {
    type PicoSchema,
    withArray,
    withObject
}                            from "@use-pico/schema";
import {BulkBatchItemSchema} from "./BulkBatchItemSchema";

export const BulkBatchSchema = withObject({
    items: withArray(BulkBatchItemSchema),
});
export type BulkBatchSchema = typeof BulkBatchSchema;
export namespace BulkBatchSchema {
    export type Type = PicoSchema.Output<BulkBatchSchema>;
}
