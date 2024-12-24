import { FilterSchema } from "@use-pico/common";
import { z } from "zod";

export const ItemFilterSchema = FilterSchema.merge(
	z.object({
		name: z.string().nullish(),
	}),
);

export type ItemFilterSchema = typeof ItemFilterSchema;

export namespace ItemFilterSchema {
	export type Type = z.infer<ItemFilterSchema>;
}
