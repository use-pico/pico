import {
    type PicoSchema,
    withBool,
    withObject,
    withString
} from "@use-pico/schema";

export const FileCommitSchema = withObject({
    name:    withString(),
    path:    withString(),
    chunkId: withString(),
    mime:    withString(),
    replace: withBool(),
});
export type FileCommitSchema = typeof FileCommitSchema;
export namespace FileCommitSchema {
    export type Type = PicoSchema.Output<FileCommitSchema>;
}
