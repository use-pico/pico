import { z } from "zod";

export const BlueprintSchema = z.object({
	id: z.string(),
	name: z.string(),
	kind: z.enum(["building", "item"]),
});

export type BlueprintSchema = typeof BlueprintSchema;

export namespace BlueprintSchema {
	export type Type = z.infer<BlueprintSchema>;
}
