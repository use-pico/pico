import {FilterSchema} from "@use-pico/query";
import {
    merge,
    type PicoSchema,
    withArray,
    withNullish,
    withNumber,
    withObject,
    withString
}                     from "@use-pico/schema";

export const BulkItemFilterSchema = merge([
    FilterSchema,
    withObject({
        bulkId:   withNullish(withString()),
        service:  withNullish(withString()),
        status:   withNullish(withNumber()),
        statusIn: withNullish(withArray(withNumber())),
    })
]);
export type BulkItemFilterSchema = typeof BulkItemFilterSchema;
export namespace BulkItemFilterSchema {
    export type Type = PicoSchema.Output<BulkItemFilterSchema>;
}
