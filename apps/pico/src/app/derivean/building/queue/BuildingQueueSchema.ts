import {
    FilterSchema,
    IdentitySchema,
    withSourceSchema,
} from "@use-pico/common";
import { z } from "zod";
import { BaseBuildingSchema } from "~/app/derivean/building/base/BaseBuildingSchema";

const entity = IdentitySchema.merge(
	z.object({
		userId: z.string().min(1),
		baseBuildingId: z.string().min(1),
		start: z.number().nonnegative(),
		current: z.number().nonnegative(),
		finish: z.number().nonnegative(),
	}),
);

export const BuildingQueueSchema = withSourceSchema({
	entity,
	output: entity.merge(
		z.object({
			baseBuilding: BaseBuildingSchema.output,
		}),
	),
	shape: z.object({
		baseBuildingId: z.string().min(1),
		start: z.number().nonnegative(),
		current: z.number().nonnegative(),
		finish: z.number().nonnegative(),
	}),
	filter: FilterSchema.merge(
		z.object({
			userId: z.string().optional(),
			baseBuildingId: z.string().optional(),
			finishGte: z.number().optional(),
		}),
	),
});

export type BuildingQueueSchema = typeof BuildingQueueSchema;
