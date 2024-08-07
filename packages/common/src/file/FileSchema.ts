import { z } from "zod";

export const FileSchema = z.object({
	id: z.string().min(1),
	created: z.string().min(1),
	mime: z.string().min(1),
	name: z.string().min(1),
	native: z.string().min(1),
	path: z.string().min(1),
	size: z.number(),
	ttl: z.number().nullish(),
	updated: z.string().min(1).nullish(),
	userId: z.string().min(1).nullish(),
});
export type FileSchema = typeof FileSchema;
export namespace FileSchema {
	export type Type = z.infer<FileSchema>;
}
