import {
    PicoSchema,
    withNullish,
    withNumber,
    withObject,
    withString
} from "@use-pico/schema";

export const FileSchema = withObject({
    id:      withString(),
    path:    withString(),
    name:    withString(),
    mime:    withString(),
    native:  withString(),
    created: withString(),
    updated: withNullish(withString()),
    userId:  withNullish(withString()),
    size:    withNumber(),
    ttl:     withNullish(withNumber()),
});
export type FileSchema = typeof FileSchema;
export namespace FileSchema {
    export type Type = PicoSchema.Output<FileSchema>;
}
