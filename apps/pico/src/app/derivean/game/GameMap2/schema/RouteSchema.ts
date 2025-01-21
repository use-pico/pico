import { z } from "zod";

export const RouteSchema = z.object({
	id: z.string().min(1),
	fromId: z.string().min(1),
	toId: z.string().min(1),
});

export type RouteSchema = typeof RouteSchema;

export namespace RouteSchema {
	export type Type = z.infer<RouteSchema>;
}
