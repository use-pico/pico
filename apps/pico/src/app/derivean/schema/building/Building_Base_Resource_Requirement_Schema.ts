import { FilterSchema } from "@use-pico/common";
import { z } from "zod";
import { withBuildingBaseResourceRequirementSchema } from "~/app/derivean/db/sdk";

export const Building_Base_Resource_Requirement_Schema =
	withBuildingBaseResourceRequirementSchema({
		shape: z.object({
			//
		}),
		filter: FilterSchema.merge(
			z.object({
				//
			}),
		),
	});

export type Building_Base_Resource_Requirement_Schema =
	typeof Building_Base_Resource_Requirement_Schema;
