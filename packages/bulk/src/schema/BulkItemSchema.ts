import {
    nonEmpty,
    type PicoSchema,
    withAny,
    withNullish,
    withNumber,
    withObject,
    withString
}                   from "@use-pico/schema";
import {BulkSchema} from "./BulkSchema";

export const BulkItemSchema = withObject({
    id:       withString([nonEmpty("Non-empty")]),
    bulkId:   withString([nonEmpty("Non-empty")]),
    bulk:     BulkSchema,
    service:  withString([nonEmpty("Non-empty")]),
    status:   withNumber(),
    values:   withNullish(withAny()),
    request:  withNullish(withAny()),
    response: withNullish(withAny()),
    created:  withString([nonEmpty("Non-empty")]),
    userId:   withString([nonEmpty("Non-empty")]),
});
export type BulkItemSchema = typeof BulkItemSchema;
export namespace BulkItemSchema {
    export type Type = PicoSchema.Output<BulkItemSchema>;
}
