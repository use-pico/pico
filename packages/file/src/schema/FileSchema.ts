import {
    PicoSchema,
    schema
} from "@use-pico/schema";

export const FileSchema = schema(z => z.object({
    id:      z.string().nonEmpty(),
    created: z.string().nonEmpty(),
    mime:    z.string().nonEmpty(),
    name:    z.string().nonEmpty(),
    native:  z.string().nonEmpty(),
    path:    z.string().nonEmpty(),
    size:    z.number(),
    ttl:     z.number().nullish(),
    updated: z.string().nonEmpty().nullish(),
    userId:  z.string().nonEmpty().nullish(),
}));
export type FileSchema = typeof FileSchema;
export namespace FileSchema {
    export type Type = PicoSchema.Output<FileSchema>;
}
