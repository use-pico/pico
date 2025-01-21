import { FilterSchema } from "@use-pico/common";
import { z } from "zod";
import { withRouteSchema } from "~/app/derivean/db/sdk";

export const RouteSchema = withRouteSchema({
	shape: z.object({
		fromId: z.string().min(1),
		toId: z.string().min(1),
	}),
	filter: FilterSchema.merge(
		z.object({
			fromId: z.string().optional(),
			toId: z.string().optional(),
		}),
	),
});

export type RouteSchema = typeof RouteSchema;
