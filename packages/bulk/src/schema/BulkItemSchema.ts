import {
    type PicoSchema,
    schema
}                   from "@use-pico/schema";
import {BulkSchema} from "./BulkSchema";

export const BulkItemSchema = schema(z => z.object({
    id:       z.nonEmptyString,
    bulkId:   z.nonEmptyString,
    bulk:     BulkSchema,
    service:  z.nonEmptyString,
    status:   z.number,
    values:   z.any$,
    request:  z.any$,
    response: z.any$,
    created:  z.nonEmptyString,
    userId:   z.nonEmptyString,
}));
export type BulkItemSchema = typeof BulkItemSchema;
export namespace BulkItemSchema {
    export type Type = PicoSchema.Output<BulkItemSchema>;
}
