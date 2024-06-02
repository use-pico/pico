import {type z}             from "zod";
import {withMutationSchema} from "../query/withMutationSchema";
import {FileQuerySchema}    from "./FileQuerySchema";
import {FileShapeSchema}    from "./FileShapeSchema";

export const FileMutationSchema = withMutationSchema({
	shape: FileShapeSchema,
	query: FileQuerySchema,
});
export type FileMutationSchema = typeof FileMutationSchema;
export namespace FileMutationSchema {
	export type Type = z.infer<FileMutationSchema>;
}
