import { FilterSchema } from "@use-pico/common";
import { z } from "zod";
import { withBuildingInventorySchema } from "~/app/derivean/db/sdk";

export const Building_Inventory_Schema = withBuildingInventorySchema({
	shape: z.object({
		//
	}),
	filter: FilterSchema.merge(
		z.object({
			//
		}),
	),
});

export type Building_Inventory_Schema = typeof Building_Inventory_Schema;
