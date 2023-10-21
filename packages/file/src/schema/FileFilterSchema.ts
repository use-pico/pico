import {FilterSchema} from "@use-pico/query";
import {
    merge,
    type PicoSchema,
    withNullish,
    withObject,
    withString
}                     from "@use-pico/schema";

export const FileFilterSchema = merge([
    FilterSchema,
    withObject({
        native: withNullish(withString()),
        path:   withNullish(withString()),
        mime:   withNullish(withString()),
    }),
]);
export type FileFilterSchema = typeof FileFilterSchema;
export namespace FileFilterSchema {
    export type Type = PicoSchema.Output<FileFilterSchema>;
}
