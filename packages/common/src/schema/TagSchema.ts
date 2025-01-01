import { z } from "zod";
import { IdentitySchema } from "./IdentitySchema";

export const TagSchema = IdentitySchema.merge(
	z.object({
		code: z.string().min(1),
		label: z.string().min(1),
		group: z.string().nullable(),
		sort: z.number().nullable(),
	}),
);

export type TagSchema = typeof TagSchema;

export namespace TagSchema {
	export type Type = z.infer<TagSchema>;
}
