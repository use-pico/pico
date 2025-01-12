import { FilterSchema, withIntSchema } from "@use-pico/common";
import { z } from "zod";
import { withBlueprintSchema } from "~/app/derivean/db/sdk";

export const BlueprintSchema = withBlueprintSchema({
	shape: z.object({
		name: z.string().min(1),
		upgradeId: z.string().optional(),
		cycles: withIntSchema(),
		productionLimit: withIntSchema(),
		sort: withIntSchema(),
	}),
	filter: FilterSchema.merge(
		z.object({
			name: z.string().optional(),
			upgradeId: z.string().optional(),
		}),
	),
});

export type BlueprintSchema = typeof BlueprintSchema;
