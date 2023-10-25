import {
    type PicoSchema,
    schema
} from "@use-pico/schema";

export const BulkShapeSchema = schema(z => z.object({
    name:    z.nonEmptyString,
    service: z.nonEmptyString,
}));
export type BulkShapeSchema = typeof BulkShapeSchema;
export namespace BulkShapeSchema {
    export type Type = PicoSchema.Output<BulkShapeSchema>;
}
