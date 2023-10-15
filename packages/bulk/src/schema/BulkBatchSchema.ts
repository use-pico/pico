import {z}                   from "@pico/utils";
import {BulkBatchItemSchema} from "./BulkBatchItemSchema";

export const BulkBatchSchema = z.object({
    items: z.array(BulkBatchItemSchema),
});
export namespace BulkBatchSchema {
    export type Schema = typeof BulkBatchSchema;
    export type Type = z.infer<Schema>;
}
