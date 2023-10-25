import {
    type PicoSchema,
    schema
} from "@use-pico/schema";

export const BulkSchema = schema(z => z.object({
    id:      z.nonEmptyString,
    service: z.nonEmptyString,
    name:    z.nonEmptyString,
    status:  z.number,
    commit:  z.bool,
    created: z.nonEmptyString,
    userId:  z.nonEmptyString,
}));
export type BulkSchema = typeof BulkSchema;
export namespace BulkSchema {
    export type Type = PicoSchema.Output<BulkSchema>;
}
