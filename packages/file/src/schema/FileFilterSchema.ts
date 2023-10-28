import {FilterSchema} from "@use-pico/query";
import {
    merge,
    type PicoSchema,
    schema
}                     from "@use-pico/schema";

export const FileFilterSchema = merge([
    FilterSchema,
    schema(z => z.object({
        native: z.string$,
        name: z.string$,
        path:   z.string$,
        mime:   z.string$,
    })),
]);
export type FileFilterSchema = typeof FileFilterSchema;
export namespace FileFilterSchema {
    export type Type = PicoSchema.Output<FileFilterSchema>;
}
