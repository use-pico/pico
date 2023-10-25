import {
    type PicoSchema,
    schema
} from "@use-pico/schema";

export const FileCommitSchema = schema(z => z.object({
    name:    z.string,
    path:    z.string,
    chunkId: z.string,
    mime:    z.string,
    replace: z.bool,
}));
export type FileCommitSchema = typeof FileCommitSchema;
export namespace FileCommitSchema {
    export type Type = PicoSchema.Output<FileCommitSchema>;
}
