import {FilterSchema} from "@use-pico/query";
import {
    merge,
    type PicoSchema,
    schema
}                     from "@use-pico/schema";

export const BulkItemFilterSchema = merge([
    FilterSchema,
    schema(z => z.object({
        bulkId:   z.string$,
        service:  z.string$,
        status:   z.number$,
        statusIn: z.array(z.number).nullish(),
    })),
]);
export type BulkItemFilterSchema = typeof BulkItemFilterSchema;
export namespace BulkItemFilterSchema {
    export type Type = PicoSchema.Output<BulkItemFilterSchema>;
}
