import { FilterSchema, withFloatSchema, withIntSchema } from "@use-pico/common";
import { z } from "zod";
import { withResourceProductionRequirementSchema } from "~/app/derivean/db/sdk";

export const ResourceProductionRequirementSchema =
	withResourceProductionRequirementSchema({
		shape: z.object({
			requirementId: z.string().min(1),
			amount: withFloatSchema(),
			passive: z.boolean(),
			level: withIntSchema(),
		}),
		filter: FilterSchema.merge(
			z.object({
				requirementId: z.string().optional(),
				resourceId: z.string().optional(),
			}),
		),
	});

export type ResourceProductionRequirementSchema =
	typeof ResourceProductionRequirementSchema;
