import { FilterSchema, withIntSchema } from "@use-pico/common";
import { z } from "zod";
import { withBuildingBaseSchema } from "~/app/derivean/db/sdk";

export const Building_Base_Schema = withBuildingBaseSchema({
	shape: z.object({
		name: z.string().min(1),
		cycles: withIntSchema(),
	}),
	filter: FilterSchema.merge(
		z.object({
			name: z.string().optional(),
		}),
	),
});

export type Building_Base_Schema = typeof Building_Base_Schema;
