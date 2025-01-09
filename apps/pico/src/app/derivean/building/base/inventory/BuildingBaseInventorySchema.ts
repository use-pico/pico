import { FilterSchema, withIntSchema } from "@use-pico/common";
import { z } from "zod";
import { withBuildingBaseInventorySchema } from "~/app/derivean/db/sdk";
import { InventorySchema } from "~/app/derivean/inventory/InventorySchema";

export const BuildingBaseInventorySchema = withBuildingBaseInventorySchema({
	shape: InventorySchema.shape.merge(
		z.object({
			level: withIntSchema(),
		}),
	),
	filter: FilterSchema.merge(
		z.object({
			buildingBaseId: z.string().optional(),
			inventoryId: z.string().optional(),
		}),
	),
});

export type BuildingBaseInventorySchema = typeof BuildingBaseInventorySchema;
