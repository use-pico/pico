import {
    FilterSchema,
    IdentitySchema,
    withSourceSchema,
} from "@use-pico/common";
import { z } from "zod";

const entity = IdentitySchema.merge(
	z.object({
		buildingBaseId: z.string().min(1),
		inventoryId: z.string().min(1),
	}),
);

export const BuildingBaseInventorySchema = withSourceSchema({
	entity,
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
