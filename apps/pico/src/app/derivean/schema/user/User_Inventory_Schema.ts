import { FilterSchema } from "@use-pico/common";
import { z } from "zod";
import { withUserInventorySchema } from "~/app/derivean/db/sdk";

export const User_Inventory_Schema = withUserInventorySchema({
	shape: z.object({
		userId: z.string().min(1),
		inventoryId: z.string().min(1),
	}),
	filter: FilterSchema.merge(
		z.object({
			userId: z.string().optional(),
			inventoryId: z.string().optional(),
		}),
	),
});

export type User_Inventory_Schema = typeof User_Inventory_Schema;
