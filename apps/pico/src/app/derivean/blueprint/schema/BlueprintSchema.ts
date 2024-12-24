import { IdentitySchema } from "@use-pico/common";
import { z } from "zod";

export const BlueprintSchema = IdentitySchema.merge(
	z.object({
		name: z.string(),
		kind: z.enum(["building", "item"]),
	}),
);

export type BlueprintSchema = typeof BlueprintSchema;

export namespace BlueprintSchema {
	export type Type = z.infer<BlueprintSchema>;
}
