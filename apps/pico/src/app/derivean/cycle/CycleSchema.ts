import {
    FilterSchema
} from "@use-pico/common";
import { z } from "zod";
import { withCycleSchema } from "~/app/derivean/db/sdk";

export const CycleSchema = withCycleSchema({
	/**
	 * Intentionally empty as the creation is done by
	 * system, so it should get everything from the
	 * entity.
	 */
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
