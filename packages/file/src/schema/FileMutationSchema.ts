import {z}               from "@pico/utils";
import {FileQuerySchema} from "./FileQuerySchema";
import {FileShapeSchema} from "./FileShapeSchema";

export const FileMutationSchema = z.object({
    create: FileShapeSchema.nullish(),
    update: z.object({
        update: FileShapeSchema.partial().nullish(),
        query:  FileQuerySchema,
    }).nullish(),
    upsert: z.object({
        create: FileShapeSchema.nullish(),
        update: z.object({
            update: FileShapeSchema.partial().nullish(),
            query:  FileQuerySchema,
        }).nullish(),
    }).nullish(),
    delete: z.object({
        query: FileQuerySchema,
    }).nullish(),
});
export type FileMutationSchema = typeof FileMutationSchema;
export namespace FileMutationSchema {
    export type Type = z.infer<FileMutationSchema>;
}
