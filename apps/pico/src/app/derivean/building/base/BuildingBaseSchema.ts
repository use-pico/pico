import { FilterSchema, withIntSchema } from "@use-pico/common";
import { z } from "zod";
import { withBuildingBaseSchema } from "~/app/derivean/db/sdk";

export const BuildingBaseSchema = withBuildingBaseSchema({
	shape: z.object({
		resourceId: z.string().min(1),
		cycles: withIntSchema(),
	}),
	filter: FilterSchema.merge(
		z.object({
			name: z.string().optional(),
		}),
	),
});

export type BuildingBaseSchema = typeof BuildingBaseSchema;
