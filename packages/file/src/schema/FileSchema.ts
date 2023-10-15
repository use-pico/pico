import {z} from "@use-pico/utils";

export const FileSchema = z.object({
    id:      z.string(),
    path:    z.string(),
    name:    z.string(),
    mime:    z.string(),
    native:  z.string(),
    created: z.string(),
    updated: z.string().nullish(),
    userId:  z.string().nullish(),
    size:    z.number(),
    ttl:     z.number().nullish(),
});
export type FileSchema = typeof FileSchema;
export namespace FileSchema {
    export type Type = z.infer<FileSchema>;
}
