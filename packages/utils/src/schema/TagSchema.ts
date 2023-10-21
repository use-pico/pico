import {
    nonEmpty,
    type PicoSchema,
    withNullish,
    withNumber,
    withObject,
    withString
} from "@use-pico/schema";

export const TagSchema = withObject({
    id:    withString([nonEmpty("Non-empty")]),
    code:  withString([nonEmpty("Non-empty")]),
    label: withString([nonEmpty("Non-empty")]),
    group: withString([nonEmpty("Non-empty")]),
    sort:  withNullish(withNumber()),
});
export type TagSchema = typeof TagSchema;
export namespace TagSchema {
    export type Type = PicoSchema.Output<TagSchema>;
}
