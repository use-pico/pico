import { FilterSchema } from "@use-pico/common";
import { z } from "zod";
import { withRouteResourceSchema } from "~/app/derivean/db/sdk";

export const RouteResourceSchema = withRouteResourceSchema({
	shape: z.object({
		resourceId: z.string().min(1),
		type: z.enum(["storage", "construction", "input", "output"]),
		amount: z.number().nonnegative(),
	}),
	filter: FilterSchema.merge(
		z.object({
			resourceId: z.string().optional(),
		}),
	),
});

export type RouteResourceSchema = typeof RouteResourceSchema;
