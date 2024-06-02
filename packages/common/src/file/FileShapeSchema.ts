import {z} from "zod";

export const FileShapeSchema = z.object({
    mime: z.string().min(1),
    name: z.string().min(1),
	native: z.string().min(1),
    path: z.string().min(1),
    size: z.number(),
    ttl:  z.number(),
	userId: z.string().optional(),
});
export type FileShapeSchema = typeof FileShapeSchema;
export namespace FileShapeSchema {
	export type Type = z.infer<FileShapeSchema>;
}
