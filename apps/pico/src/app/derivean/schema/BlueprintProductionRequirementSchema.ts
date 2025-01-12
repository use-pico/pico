import { FilterSchema, withFloatSchema } from "@use-pico/common";
import { z } from "zod";
import { withBlueprintProductionRequirementSchema } from "~/app/derivean/db/sdk";

export const BlueprintProductionRequirementSchema =
	withBlueprintProductionRequirementSchema({
		shape: z.object({
			resourceId: z.string().min(1),
			amount: withFloatSchema(),
			passive: z.boolean(),
		}),
		filter: FilterSchema.merge(
			z.object({
				blueprintProductionId: z.string().optional(),
				resourceId: z.string().optional(),
			}),
		),
	});

export type BlueprintProductionRequirementSchema =
	typeof BlueprintProductionRequirementSchema;
