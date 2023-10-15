import {z} from "@use-pico/utils";

export const FileOrderBySchema = z.record(z.enum(["name", "path"]), z.enum(["asc", "desc"]));
export type FileOrderBySchema = typeof FileOrderBySchema;
export namespace FileOrderBySchema {
    export type Type = z.infer<FileOrderBySchema>;
}
