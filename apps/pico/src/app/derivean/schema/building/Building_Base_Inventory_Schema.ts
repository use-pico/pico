import { FilterSchema } from "@use-pico/common";
import { z } from "zod";
import { withBuildingBaseInventorySchema } from "~/app/derivean/db/sdk";
import { Inventory_Schema } from "~/app/derivean/schema/inventory/Inventory_Schema";

export const Building_Base_Inventory_Schema = withBuildingBaseInventorySchema({
	shape: Inventory_Schema.shape,
	filter: FilterSchema.merge(
		z.object({
			buildingBaseId: z.string().optional(),
			inventoryId: z.string().optional(),
		}),
	),
});

export type Building_Base_Inventory_Schema =
	typeof Building_Base_Inventory_Schema;
