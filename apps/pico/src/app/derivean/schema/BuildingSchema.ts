import { FilterSchema, withFloatSchema } from "@use-pico/common";
import { z } from "zod";
import { withBuildingSchema } from "~/app/derivean/db/sdk";

export const BuildingSchema = withBuildingSchema({
	shape: z.object({
		blueprintId: z.string().min(1),
		productionId: z.string().optional(),
		recurringProductionId: z.string().optional(),
		x: withFloatSchema(),
		y: withFloatSchema(),
	}),
	filter: FilterSchema.merge(
		z.object({
			userId: z.string().optional(),
			blueprintId: z.string().optional(),
			name: z.string().optional(),
		}),
	),
});

export type BuildingSchema = typeof BuildingSchema;
