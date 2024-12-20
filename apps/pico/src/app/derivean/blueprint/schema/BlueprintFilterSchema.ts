import { z } from "zod";

export const BlueprintFilterSchema = z.object({
	id: z.string().nullish(),
	idIn: z.array(z.string()).nullish(),
	fulltext: z.string().nullish(),
	kind: z.string().nullish(),
});

export type BlueprintFilterSchema = typeof BlueprintFilterSchema;

export namespace BlueprintFilterSchema {
	export type Type = z.infer<BlueprintFilterSchema>;
}
