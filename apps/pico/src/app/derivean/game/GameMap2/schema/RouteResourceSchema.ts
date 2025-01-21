import { z } from "zod";

export const RouteResourceSchema = z.object({
	id: z.string().min(1),
	routeId: z.string().min(1),
	resourceId: z.string().min(1),
	name: z.string().min(1),
	amount: z.number().nonnegative(),
});

export type RouteResourceSchema = typeof RouteResourceSchema;

export namespace RouteResourceSchema {
	export type Type = z.infer<RouteResourceSchema>;
}
