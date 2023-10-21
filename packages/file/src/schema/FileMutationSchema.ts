import {type PicoSchema}    from "@use-pico/schema";
import {withMutationSchema} from "@use-pico/source";
import {FileQuerySchema}    from "./FileQuerySchema";
import {FileShapeSchema}    from "./FileShapeSchema";

export const FileMutationSchema = withMutationSchema({
    shape: FileShapeSchema,
    query: FileQuerySchema,
});
export type FileMutationSchema = typeof FileMutationSchema;
export namespace FileMutationSchema {
    export type Type = PicoSchema.Output<FileMutationSchema>;
}
