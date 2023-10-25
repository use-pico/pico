import {FilterSchema} from "@use-pico/query";
import {
    merge,
    type PicoSchema,
    schema
}                     from "@use-pico/schema";

export const BulkFilterSchema = merge([
    FilterSchema,
    schema(z => z.object({
        service:    z.string$,
        withCommit: z.bool$,
        user:       z.bool$,
    })),
]);
export type BulkFilterSchema = typeof BulkFilterSchema;
export namespace BulkFilterSchema {
    export type Type = PicoSchema.Output<BulkFilterSchema>;
}
