import { FilterSchema, withFloatSchema } from "@use-pico/common";
import { z } from "zod";
import { withBlueprintRequirementSchema } from "~/app/derivean/db/sdk";

export const BlueprintRequirementSchema = withBlueprintRequirementSchema({
	shape: z.object({
		resourceId: z.string().min(1),
		amount: withFloatSchema(),
		passive: z.boolean(),
	}),
	filter: FilterSchema.merge(
		z.object({
			blueprintId: z.string().optional(),
			resourceId: z.string().optional(),
		}),
	),
});

export type BlueprintRequirementSchema = typeof BlueprintRequirementSchema;
