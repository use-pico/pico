import {
    nonEmpty,
    type PicoSchema,
    withObject,
    withString
} from "@use-pico/schema";

export const BulkShapeSchema = withObject({
    name:    withString([nonEmpty("Non-empty")]),
    service: withString([nonEmpty("Non-empty")]),
});
export type BulkShapeSchema = typeof BulkShapeSchema;
export namespace BulkShapeSchema {
    export type Type = PicoSchema.Output<BulkShapeSchema>;
}
