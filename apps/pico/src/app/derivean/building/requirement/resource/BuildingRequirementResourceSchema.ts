import {
    FilterSchema,
    IdentitySchema,
    withRepositorySchema,
} from "@use-pico/common";
import { z } from "zod";
import { ResourceSchema } from "~/app/derivean/resource/ResourceSchema";

const entity = IdentitySchema.merge(
	z.object({
		baseBuildingId: z.string().min(1),
		resourceId: z.string().min(1),
		amount: z.number().int().min(0),
	}),
);

export const BuildingRequirementResourceSchema = withRepositorySchema({
	entity,
	output: entity.merge(
		z.object({
			resource: ResourceSchema.output,
		}),
	),
	shape: z.object({
		baseBuildingId: z.string().min(1),
		resourceId: z.string().min(1),
		amount: z.number().int().min(0),
	}),
	filter: FilterSchema.merge(
		z.object({
			baseBuildingId: z.string().optional(),
			resourceId: z.string().optional(),
		}),
	),
});

export type BuildingRequirementResourceSchema =
	typeof BuildingRequirementResourceSchema;
