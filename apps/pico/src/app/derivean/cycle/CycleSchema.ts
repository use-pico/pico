import {
    FilterSchema,
    IdentitySchema,
    withSourceSchema,
} from "@use-pico/common";
import { z } from "zod";

export const CycleSchema = withSourceSchema({
	entity: IdentitySchema.merge(
		z.object({
			userId: z.string().min(1),
			stamp: z.string().min(1),
		}),
	),
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
