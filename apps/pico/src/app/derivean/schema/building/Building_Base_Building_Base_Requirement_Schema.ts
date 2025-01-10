import { FilterSchema } from "@use-pico/common";
import { z } from "zod";
import { withBuildingBaseBuildingBaseRequirementSchema } from "~/app/derivean/db/sdk";

export const Building_Base_Building_Base_Requirement_Schema =
	withBuildingBaseBuildingBaseRequirementSchema({
		shape: z.object({
			requirementId: z.string().min(1),
		}),
		filter: FilterSchema.merge(
			z.object({
				buildingBaseId: z.string().optional(),
				requirementId: z.string().optional(),
			}),
		),
	});

export type Building_Base_Building_Base_Requirement_Schema =
	typeof Building_Base_Building_Base_Requirement_Schema;
