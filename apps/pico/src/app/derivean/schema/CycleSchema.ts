import { FilterSchema } from "@use-pico/common";
import { z } from "zod";
import { withCycleSchema } from "~/app/derivean/db/sdk";

export const CycleSchema = withCycleSchema({
	shape: z.object({
		//
	}),
	filter: FilterSchema.merge(
		z.object({
			userId: z.string().optional(),
		}),
	),
});

export type CycleSchema = typeof CycleSchema;
