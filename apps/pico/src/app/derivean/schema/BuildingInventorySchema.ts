import { FilterSchema } from "@use-pico/common";
import { z } from "zod";
import { withBuildingInventorySchema } from "~/app/derivean/db/sdk";

export const BuildingInventorySchema = withBuildingInventorySchema({
	shape: z.object({
		buildingId: z.string().min(1),
		inventoryId: z.string().min(1),
	}),
	filter: FilterSchema.merge(
		z.object({
			buildingId: z.string().optional(),
			inventoryId: z.string().optional(),
		}),
	),
});

export type BuildingInventorySchema = typeof BuildingInventorySchema;
