import {orderByOf}       from "@use-pico/query";
import {type PicoSchema} from "@use-pico/schema";

export const FileOrderBySchema = orderByOf(["name", "path"]);
export type FileOrderBySchema = typeof FileOrderBySchema;
export namespace FileOrderBySchema {
    export type Type = PicoSchema.Output<FileOrderBySchema>;
}
