import {
    FilterSchema,
    IdentitySchema,
    withSourceSchema,
} from "@use-pico/common";
import { z } from "zod";
import { BuildingSchema } from "~/app/derivean/building/BuildingSchema";
import { ResourceSchema } from "~/app/derivean/resource/ResourceSchema";

const entity = IdentitySchema.merge(
	z.object({
		baseBuildingProductionId: z.string().min(1),
		buildingId: z.string().min(1),
		resourceId: z.string().min(1),
		amount: z.number().nonnegative(),
		start: z.number().nonnegative(),
		current: z.number().nonnegative(),
		finish: z.number().nonnegative(),
	}),
);

export const BuildingProductionQueueSchema = withSourceSchema({
	entity,
	output: entity.merge(
		z.object({
			building: BuildingSchema.output,
			resource: ResourceSchema.output,
		}),
	),
	shape: z.object({
		baseBuildingProductionId: z.string().min(1),
		buildingId: z.string().min(1),
		resourceId: z.string().min(1),
		amount: z.number().nonnegative(),
		start: z.number().nonnegative(),
		current: z.number().nonnegative(),
		finish: z.number().nonnegative(),
	}),
	filter: FilterSchema.merge(
		z.object({
			baseBuildingProductionId: z.string().optional(),
			buildingId: z.string().optional(),
			baseBuildingId: z.string().optional(),
			resourceId: z.string().optional(),
			userId: z.string().optional(),
			finishGte: z.number().optional(),
			finishGt: z.number().optional(),
		}),
	),
	sort: ["building", "resource", "start", "current", "finish"],
});

export type BuildingProductionQueueSchema =
	typeof BuildingProductionQueueSchema;
