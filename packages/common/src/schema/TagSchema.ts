import {z} from "zod";

export const TagSchema = z.object({
	id: z.string().min(1),
	code: z.string().min(1),
	label: z.string().min(1),
	group: z.string().min(1),
	sort: z.number().optional(),
});
export type TagSchema = typeof TagSchema;
export namespace TagSchema {
	export type Type = z.infer<TagSchema>;
}
