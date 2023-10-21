import {
    nonEmpty,
    type PicoSchema,
    withObject,
    withString
} from "@use-pico/schema";

export const BulkBatchItemSchema = withObject({
    service: withString([nonEmpty("Non-empty")]),
    bulkId:  withString([nonEmpty("Non-empty")]),
});
export type BulkBatchItemSchema = typeof BulkBatchItemSchema;
export namespace BulkBatchItemSchema {
    export type Type = PicoSchema.Output<BulkBatchItemSchema>;
}
