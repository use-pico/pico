import { z } from "zod";

export const InventoryShapeSchema = z.object({
	name: z.string().min(1),
});

export type InventoryShapeSchema = typeof InventoryShapeSchema;

export namespace InventoryShapeSchema {
	export type Type = z.infer<InventoryShapeSchema>;
}
