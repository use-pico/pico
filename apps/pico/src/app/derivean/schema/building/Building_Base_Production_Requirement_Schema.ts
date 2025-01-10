import { FilterSchema } from "@use-pico/common";
import { z } from "zod";
import { withBuildingBaseProductionRequirementSchema } from "~/app/derivean/db/sdk";

export const Building_Base_Production_Requirement_Schema =
	withBuildingBaseProductionRequirementSchema({
		shape: z.object({
			//
		}),
		filter: FilterSchema.merge(
			z.object({
				//
			}),
		),
	});

export type Building_Base_Production_Requirement_Schema =
	typeof Building_Base_Production_Requirement_Schema;
