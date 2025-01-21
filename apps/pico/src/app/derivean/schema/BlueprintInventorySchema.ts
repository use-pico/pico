import { FilterSchema } from "@use-pico/common";
import { z } from "zod";
import { withBlueprintInventorySchema } from "~/app/derivean/db/sdk";

export const BlueprintInventorySchema = withBlueprintInventorySchema({
	shape: z.object({
		blueprintId: z.string().min(1),
		inventoryId: z.string().min(1),
	}),
	filter: FilterSchema.merge(
		z.object({
			blueprintId: z.string().optional(),
			inventoryId: z.string().optional(),
		}),
	),
});

export type BlueprintInventorySchema = typeof BlueprintInventorySchema;
