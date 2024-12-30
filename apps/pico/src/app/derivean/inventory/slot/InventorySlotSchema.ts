import {
    FilterSchema,
    IdentitySchema,
    withRepositorySchema,
} from "@use-pico/common";
import { z } from "zod";

export const InventorySlotSchema = withRepositorySchema({
	entity: IdentitySchema.merge(
		z.object({
			inventoryId: z.string().min(1),
			slotId: z.string().min(1),
		}),
	),
	shape: z.object({
		inventoryId: z.string().min(1),
		slotId: z.string().min(1),
	}),
	filter: FilterSchema.merge( 
		z.object({
			inventoryId: z.string().optional(),
			slotId: z.string().optional(),
		}),
	),
});

export type InventorySlotSchema = typeof InventorySlotSchema;
