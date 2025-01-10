import { FilterSchema, withFloatSchema } from "@use-pico/common";
import { z } from "zod";
import { withBuildingBaseProductionRequirementSchema } from "~/app/derivean/db/sdk";

export const Building_Base_Production_Requirement_Schema =
	withBuildingBaseProductionRequirementSchema({
		shape: z.object({
			resourceId: z.string().min(1),
			amount: withFloatSchema(),
			passive: z.boolean(),
		}),
		filter: FilterSchema.merge(
			z.object({
				//
			}),
		),
	});

export type Building_Base_Production_Requirement_Schema =
	typeof Building_Base_Production_Requirement_Schema;
