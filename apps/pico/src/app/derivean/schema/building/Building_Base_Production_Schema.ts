import { FilterSchema, withFloatSchema, withIntSchema } from "@use-pico/common";
import { z } from "zod";
import { withBuildingBaseProductionSchema } from "~/app/derivean/db/sdk";

export const Building_Base_Production_Schema = withBuildingBaseProductionSchema(
	{
		shape: z.object({
			resourceId: z.string().min(1),
			amount: withFloatSchema(),
			cycles: withIntSchema(),
			limit: withIntSchema(),
		}),
		filter: FilterSchema.merge(
			z.object({
				buildingBaseId: z.string().optional(),
				resourceId: z.string().optional(),
			}),
		),
	},
);

export type Building_Base_Production_Schema =
	typeof Building_Base_Production_Schema;
