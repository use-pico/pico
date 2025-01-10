import { FilterSchema } from "@use-pico/common";
import { z } from "zod";
import { withBuildingSchema } from "~/app/derivean/db/sdk";

export const Building_Schema = withBuildingSchema({
	shape: z.object({
		buildingBaseId: z.string().min(1),
	}),
	filter: FilterSchema.merge(
		z.object({
			userId: z.string().optional(),
			buildingBaseId: z.string().optional(),
			name: z.string().optional(),
		}),
	),
});

export type Building_Schema = typeof Building_Schema;
