import {
    type PicoSchema,
    schema
} from "@use-pico/schema";

export const FileShapeSchema = schema(z => z.object({
    mime:   z.nonEmptyString,
    name:   z.nonEmptyString,
    native: z.nonEmptyString,
    path:   z.nonEmptyString,
    size:   z.number,
    ttl:    z.number,
    userId: z.string$,
}));
export type FileShapeSchema = typeof FileShapeSchema;
export namespace FileShapeSchema {
    export type Type = PicoSchema.Output<FileShapeSchema>;
}
