import { FilterSchema } from "@use-pico/common";
import { z } from "zod";

export const BlueprintFilterSchema = FilterSchema.merge(
	z.object({
		kind: z.string().nullish(),
	}),
);

export type BlueprintFilterSchema = typeof BlueprintFilterSchema;

export namespace BlueprintFilterSchema {
	export type Type = z.infer<BlueprintFilterSchema>;
}
