import {
    nonEmpty,
    type PicoSchema,
    withNullish,
    withNumber,
    withObject,
    withString
} from "@use-pico/schema";

export const FileShapeSchema = withObject({
    name:   withString([nonEmpty("Non-empty")]),
    path:   withString([nonEmpty("Non-empty")]),
    native: withString([nonEmpty("Non-empty")]),
    mime:   withString([nonEmpty("Non-empty")]),
    userId: withNullish(withString()),
    size:   withNumber(),
    ttl:    withNumber(),
});
export type FileShapeSchema = typeof FileShapeSchema;
export namespace FileShapeSchema {
    export type Type = PicoSchema.Output<FileShapeSchema>;
}
