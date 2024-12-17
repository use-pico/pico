import { z } from "zod";

export const TagSchema = z.object({
	id: z.string(),
	code: z.string(),
	label: z.string(),
	group: z.string().nullable(),
	sort: z.number().nullable(),
});

export type TagSchema = typeof TagSchema;

export namespace TagSchema {
	export type Type = z.infer<TagSchema>;
}
