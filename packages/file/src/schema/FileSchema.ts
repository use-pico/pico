import {
    type PicoSchema,
    schema
} from "@use-pico/schema";

export const FileSchema = schema(z => z.object({
    id:      z.nonEmptyString,
    created: z.nonEmptyString,
    mime:    z.nonEmptyString,
    name:    z.nonEmptyString,
    native:  z.nonEmptyString,
    path:    z.nonEmptyString,
    size:    z.number,
    ttl:     z.number$,
    updated: z.nonEmptyString.nullish(),
    userId:  z.nonEmptyString.nullish(),
}));
export type FileSchema = typeof FileSchema;
export namespace FileSchema {
    export type Type = PicoSchema.Output<FileSchema>;
}
