import {type z}            from "zod";
import {withQuerySchema}   from "../query/withQuerySchema";
import {FileFilterSchema}  from "./FileFilterSchema";
import {FileOrderBySchema} from "./FileOrderBySchema";

export const FileQuerySchema = withQuerySchema({
	filter:  FileFilterSchema,
	orderBy: FileOrderBySchema,
});
export type FileQuerySchema = typeof FileQuerySchema;
export namespace FileQuerySchema {
	export type Type = z.infer<FileQuerySchema>;
}
