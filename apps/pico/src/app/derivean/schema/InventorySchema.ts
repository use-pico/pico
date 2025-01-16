import { FilterSchema, withFloatSchema } from "@use-pico/common";
import { z } from "zod";
import { withInventorySchema } from "~/app/derivean/db/sdk";

export const InventorySchema = withInventorySchema({
	shape: z.object({
		resourceId: z.string().min(1),
		amount: withFloatSchema(),
		limit: withFloatSchema(),
	}),
	filter: FilterSchema.merge(
		z.object({
			resourceId: z.string().optional(),
		}),
	),
});

export type InventorySchema = typeof InventorySchema;
