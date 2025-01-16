import { FilterSchema, withFloatSchema } from "@use-pico/common";
import { z } from "zod";
import { withDefaultInventorySchema } from "~/app/derivean/db/sdk";

export const DefaultInventorySchema = withDefaultInventorySchema({
	shape: z.object({
		resourceId: z.string().min(1),
		amount: withFloatSchema(),
		limit: withFloatSchema(),
	}),
	filter: FilterSchema,
});

export type DefaultInventorySchema = typeof DefaultInventorySchema;
