import {FilterSchema} from "@use-pico/query";
import {
    merge,
    type PicoSchema,
    withBool,
    withNullish,
    withObject,
    withString
}                     from "@use-pico/schema";

export const BulkFilterSchema = merge([
    FilterSchema,
    withObject({
        service:    withNullish(withString()),
        withCommit: withNullish(withBool()),
        user:       withNullish(withBool()),
    })
]);
export type BulkFilterSchema = typeof BulkFilterSchema;
export namespace BulkFilterSchema {
    export type Type = PicoSchema.Output<BulkFilterSchema>;
}
