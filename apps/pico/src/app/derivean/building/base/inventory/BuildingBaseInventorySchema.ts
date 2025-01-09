import { FilterSchema } from "@use-pico/common";
import { z } from "zod";
import { withBuildingBaseInventorySchema } from "~/app/derivean/db/sdk";

export const BuildingBaseInventorySchema = withBuildingBaseInventorySchema({
	shape: z.object({
		inventoryId: z.string().min(1),
	}),
	filter: FilterSchema.merge(
		z.object({
			buildingBaseId: z.string().optional(),
			inventoryId: z.string().optional(),
		}),
	),
});

export type BuildingBaseInventorySchema = typeof BuildingBaseInventorySchema;
