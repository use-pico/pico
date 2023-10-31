import {sortOf}          from "@use-pico/query";
import {type PicoSchema} from "@use-pico/schema";

export const FileOrderBySchema = sortOf(["name", "path"]);
export type FileOrderBySchema = typeof FileOrderBySchema;
export namespace FileOrderBySchema {
    export type Type = PicoSchema.Output<FileOrderBySchema>;
}
