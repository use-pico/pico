import {z}            from "zod";
import {FilterSchema} from "../query/FilterSchema";

export const FileFilterSchema = FilterSchema.merge(z.object({
    native: z.string().optional(),
    name:   z.string().optional(),
    path:   z.string().optional(),
    mime:   z.string().optional(),
}));
export type FileFilterSchema = typeof FileFilterSchema;
export namespace FileFilterSchema {
    export type Type = z.infer<FileFilterSchema>;
}
