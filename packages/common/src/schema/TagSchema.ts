import { z } from "zod";
import { IdentitySchema } from "./IdentitySchema";

export const TagSchema = z.object({
	...IdentitySchema.shape,
	code: z.string().min(1),
	label: z.string().min(1),
	group: z.string().nullish(),
	sort: z.number().default(0),
});

export type TagSchema = typeof TagSchema;

export namespace TagSchema {
	export type Type = z.infer<TagSchema>;
}
