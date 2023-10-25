import {FilterSchema} from "@use-pico/query";
import {
    merge,
    type PicoSchema,
    schema
}                     from "@use-pico/schema";

export const FileFilterSchema = merge([
    FilterSchema,
    schema(z => z.object({
        native: z.string().nullish(),
        path:   z.string().nullish(),
        mime:   z.string().nullish(),
    })),
]);
export type FileFilterSchema = typeof FileFilterSchema;
export namespace FileFilterSchema {
    export type Type = PicoSchema.Output<FileFilterSchema>;
}
