import {
    type PicoSchema,
    schema
} from "@use-pico/schema";

export const FileShapeSchema = schema(z => z.object({
    mime:   z.string().nonEmpty(),
    name:   z.string().nonEmpty(),
    native: z.string().nonEmpty(),
    path:   z.string().nonEmpty(),
    size:   z.number(),
    ttl:    z.number(),
    userId: z.string().nullish(),
}));
export type FileShapeSchema = typeof FileShapeSchema;
export namespace FileShapeSchema {
    export type Type = PicoSchema.Output<FileShapeSchema>;
}
