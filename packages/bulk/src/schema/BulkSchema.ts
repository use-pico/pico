import {
    nonEmpty,
    type PicoSchema,
    withBool,
    withNumber,
    withObject,
    withString
} from "@use-pico/schema";

export const BulkSchema = withObject({
    id:      withString([nonEmpty("Non-empty")]),
    service: withString([nonEmpty("Non-empty")]),
    name:    withString([nonEmpty("Non-empty")]),
    status:  withNumber(),
    commit:  withBool(),
    created: withString([nonEmpty("Non-empty")]),
    userId:  withString([nonEmpty("Non-empty")]),
});
export type BulkSchema = typeof BulkSchema;
export namespace BulkSchema {
    export type Type = PicoSchema.Output<BulkSchema>;
}
