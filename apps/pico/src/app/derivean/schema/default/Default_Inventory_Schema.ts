import { FilterSchema, withFloatSchema } from "@use-pico/common";
import { z } from "zod";
import { withDefaultInventorySchema } from "~/app/derivean/db/sdk";

export const Default_Inventory_Schema = withDefaultInventorySchema({
	shape: z.object({
		resourceId: z.string().min(1),
		amount: withFloatSchema(),
		limit: withFloatSchema(),
	}),
	filter: FilterSchema,
});

export type Default_Inventory_Schema = typeof Default_Inventory_Schema;
