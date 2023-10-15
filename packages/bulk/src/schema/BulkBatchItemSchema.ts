import {z} from "@pico/utils";

export const BulkBatchItemSchema = z.object({
    service: z.string().nonempty({message: "Non-empty"}),
    bulkId:  z.string().nonempty({message: "Non-empty"}),
});
export type BulkBatchItemSchema = typeof BulkBatchItemSchema;
export namespace BulkBatchItemSchema {
    export type Type = z.infer<BulkBatchItemSchema>;
}
