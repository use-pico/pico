import { IdentitySchema } from "@use-pico/common";
import { z } from "zod";

export const InventorySchema = IdentitySchema.merge(
	z.object({
		name: z.string().min(1),
	}),
);

export type InventorySchema = typeof InventorySchema;

export namespace InventorySchema {
	export type Type = z.infer<InventorySchema>;
}
