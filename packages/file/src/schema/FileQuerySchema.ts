import {withQuerySchema}   from "@use-pico/query";
import {type PicoSchema}   from "@use-pico/schema";
import {FileFilterSchema}  from "./FileFilterSchema";
import {FileOrderBySchema} from "./FileOrderBySchema";

export const FileQuerySchema = withQuerySchema({
    filter:  FileFilterSchema,
    orderBy: FileOrderBySchema,
});
export type FileQuerySchema = typeof FileQuerySchema;
export namespace FileQuerySchema {
    export type Type = PicoSchema.Output<FileQuerySchema>;
}
