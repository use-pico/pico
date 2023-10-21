import {
    nonEmpty,
    type PicoSchema,
    withAny,
    withNumber,
    withObject,
    withString
} from "@use-pico/schema";

export const BulkItemShapeSchema = withObject({
    bulkId:  withString([nonEmpty("Non-empty")]),
    service: withString([nonEmpty("Non-empty")]),
    status:  withNumber(),
    values:  withAny(),
    request: withAny(),
});
export type BulkItemShapeSchema = typeof BulkItemShapeSchema;
export namespace BulkItemShapeSchema {
    export type Type = PicoSchema.Output<BulkItemShapeSchema>;
}
