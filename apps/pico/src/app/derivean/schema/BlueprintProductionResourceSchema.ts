import { FilterSchema, withFloatSchema } from "@use-pico/common";
import { z } from "zod";
import { withBlueprintProductionResourceSchema } from "~/app/derivean/db/sdk";

export const BlueprintProductionResourceSchema =
	withBlueprintProductionResourceSchema({
		shape: z.object({
			resourceId: z.string().min(1),
			amount: withFloatSchema(),
		}),
		filter: FilterSchema.merge(
			z.object({
				resourceId: z.string().optional(),
			}),
		),
	});

export type BlueprintProductionResourceSchema =
	typeof BlueprintProductionResourceSchema;
