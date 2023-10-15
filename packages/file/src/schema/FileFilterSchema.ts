import {z} from "@use-pico/utils";

export const FileFilterSchema = z.object({
    native:   z.string().nullish(),
    path:     z.string().nullish(),
    mime:     z.string().nullish(),
    id:       z.string().nullish(),
    idIn:     z.array(z.string()).nullish(),
    fulltext: z.string().nullish(),
});
export type FileFilterSchema = typeof FileFilterSchema;
export namespace FileFilterSchema {
    export type Type = z.infer<FileFilterSchema>;
}
