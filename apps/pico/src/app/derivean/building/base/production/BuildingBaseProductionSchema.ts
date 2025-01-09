import { FilterSchema } from "@use-pico/common";
import { z } from "zod";
import { withBuildingBaseProductionSchema } from "~/app/derivean/db/sdk";

export const BuildingBaseProductionSchema = withBuildingBaseProductionSchema({
	shape: z.object({
		resourceProductionId: z.string().min(1),
	}),
	filter: FilterSchema.merge(
		z.object({
			buildingBaseId: z.string().optional(),
			resourceProductionId: z.string().optional(),
		}),
	),
});

export type BuildingBaseProductionSchema = typeof BuildingBaseProductionSchema;
