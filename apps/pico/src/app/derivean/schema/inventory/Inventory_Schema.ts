import { FilterSchema, withFloatSchema } from "@use-pico/common";
import { z } from "zod";
import { withInventorySchema } from "~/app/derivean/db/sdk";

export const Inventory_Schema = withInventorySchema({
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

export type Inventory_Schema = typeof Inventory_Schema;
