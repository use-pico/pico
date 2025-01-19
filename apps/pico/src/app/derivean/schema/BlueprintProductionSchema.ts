import { FilterSchema, withFloatSchema, withIntSchema } from "@use-pico/common";
import { z } from "zod";
import { withBlueprintProductionSchema } from "~/app/derivean/db/sdk";

export const BlueprintProductionSchema = withBlueprintProductionSchema({
	shape: z.object({
		resourceId: z.string().min(1),
		amount: withFloatSchema(),
		cycles: withIntSchema(),
	}),
	filter: FilterSchema.merge(
		z.object({
			blueprintId: z.string().optional(),
			resourceId: z.string().optional(),
		}),
	),
});

export type BlueprintProductionSchema = typeof BlueprintProductionSchema;
