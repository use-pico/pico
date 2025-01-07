import {
	FilterSchema,
	IdentitySchema,
	withSourceSchema,
} from "@use-pico/common";
import { z } from "zod";

export const UserInventorySchema = withSourceSchema({
	entity: IdentitySchema.merge(
		z.object({
			userId: z.string().min(1),
			inventoryId: z.string().min(1),
		}),
	),
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
	sort: ["name"],
});

export type UserInventorySchema = typeof UserInventorySchema;
