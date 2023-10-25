import {
    type PicoSchema,
    schema
} from "@use-pico/schema";

export const BulkItemShapeSchema = schema(z => z.object({
    bulkId:  z.nonEmptyString,
    service: z.nonEmptyString,
    status:  z.number,
    values:  z.any,
    request: z.any,
}));
export type BulkItemShapeSchema = typeof BulkItemShapeSchema;
export namespace BulkItemShapeSchema {
    export type Type = PicoSchema.Output<BulkItemShapeSchema>;
}
