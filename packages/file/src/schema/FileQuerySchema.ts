import {CursorSchema}      from "@pico/query";
import {z}                 from "@pico/utils";
import {FileFilterSchema}  from "./FileFilterSchema";
import {FileOrderBySchema} from "./FileOrderBySchema";

export const FileQuerySchema = z.object({
    where:   FileFilterSchema.nullish(),
    filter:  FileFilterSchema.nullish(),
    orderBy: FileOrderBySchema.nullish(),
    cursor:  CursorSchema.nullish(),
});
export type FileQuerySchema = typeof FileQuerySchema;
export namespace FileQuerySchema {
    export type Type = z.infer<FileQuerySchema>;
}
