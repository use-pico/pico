import { FilterSchema } from "@use-pico/common";
import { z } from "zod";

export const InventoryFilterSchema = FilterSchema.merge(
	z.object({
		//
	}),
);

export type InventoryFilterSchema = typeof InventoryFilterSchema;

export namespace InventoryFilterSchema {
	export type Type = z.infer<InventoryFilterSchema>;
}
