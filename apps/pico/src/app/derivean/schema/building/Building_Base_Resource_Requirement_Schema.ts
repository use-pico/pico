import { FilterSchema, withFloatSchema } from "@use-pico/common";
import { z } from "zod";
import { withBuildingBaseResourceRequirementSchema } from "~/app/derivean/db/sdk";

export const Building_Base_Resource_Requirement_Schema =
	withBuildingBaseResourceRequirementSchema({
		shape: z.object({
			resourceId: z.string().min(1),
			amount: withFloatSchema(),
			passive: z.boolean(),
		}),
		filter: FilterSchema.merge(
			z.object({
				resourceId: z.string().optional(),
			}),
		),
	});

export type Building_Base_Resource_Requirement_Schema =
	typeof Building_Base_Resource_Requirement_Schema;
