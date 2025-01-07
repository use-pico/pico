import {
	FilterSchema,
	IdentitySchema,
	withSourceSchema,
} from "@use-pico/common";
import { z } from "zod";
import { BuildingBaseSchema } from "~/app/derivean/building/base/BuildingBaseSchema";
import { InventorySchema } from "~/app/derivean/inventory/InventorySchema";

const entity = IdentitySchema.merge(
	z.object({
		buildingBaseId: z.string().min(1),
		inventoryId: z.string().min(1),
	}),
);

export const BuildingBaseInventorySchema = withSourceSchema({
	entity,
	output: entity.merge(
		z.object({
			buildingBase: BuildingBaseSchema.output,
			inventory: InventorySchema.output,
		}),
	),
	shape: z.object({
		inventoryId: z.string().min(1),
	}),
	filter: FilterSchema.merge(
		z.object({
			buildingBaseId: z.string().optional(),
			inventoryId: z.string().optional(),
		}),
	),
	sort: ["name"],
});

export type BuildingBaseInventorySchema = typeof BuildingBaseInventorySchema;
