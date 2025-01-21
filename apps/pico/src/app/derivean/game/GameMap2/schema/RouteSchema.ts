import { withJsonArraySchema } from "@use-pico/common";
import { z } from "zod";
import { BlueprintInventorySchema } from "~/app/derivean/game/GameMap2/schema/BlueprintInventorySchema";

export const RouteSchema = z.object({
	id: z.string().min(1),
	fromId: z.string().min(1),
	toId: z.string().min(1),
	fromName: z.string().min(1),
	toName: z.string().min(1),
	inventory: withJsonArraySchema(BlueprintInventorySchema),
});

export type RouteSchema = typeof RouteSchema;

export namespace RouteSchema {
	export type Type = z.infer<RouteSchema>;
}
