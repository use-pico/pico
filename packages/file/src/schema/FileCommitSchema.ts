import {z} from "@pico/utils";

export const FileCommitSchema = z.object({
    name:    z.string(),
    path:    z.string(),
    chunkId: z.string(),
    mime:    z.string(),
    replace: z.boolean(),
});
export type FileCommitSchema = typeof FileCommitSchema;
export namespace FileCommitSchema {
    export type Type = z.infer<FileCommitSchema>;
}
