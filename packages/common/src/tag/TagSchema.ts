import { z } from "zod";
import { EntitySchema } from "../source/EntitySchema";

export const TagSchema = z.object({
	...EntitySchema.shape,
	code: z.string().min(1),
	label: z.string().min(1),
	group: z.string().nullish(),
	sort: z.number().default(0),
});

export type TagSchema = typeof TagSchema;

export namespace TagSchema {
	export type Type = z.infer<TagSchema>;
}
