import {
    FilterSchema,
    IdentitySchema,
    translator,
    withRepositorySchema,
} from "@use-pico/common";
import { z } from "zod";
import { BuildingSchema } from "~/app/derivean/building/BuildingSchema";
import { ResourceSchema } from "~/app/derivean/resource/ResourceSchema";

const entity = IdentitySchema.merge(
	z.object({
		buildingId: z.string().min(1),
		resourceId: z.string().min(1),
		amount: z.number().positive(),
	}),
);

export const BuildingResourceSchema = withRepositorySchema({
	entity,
	output: entity.merge(
		z.object({
			building: BuildingSchema.output,
			resource: ResourceSchema.output,
		}),
	),
	shape: z.object({
		resourceId: z.string().min(1),
		amount: z.union([
			z.number().positive(),
			z
				.string()
				.transform((value) => parseFloat(value))
				.refine((value) => !isNaN(value), {
					message: translator.text("Amount must be a number"),
				}),
		]),
	}),
	filter: FilterSchema.merge(
		z.object({
			userId: z.string().optional(),
			buildingId: z.string().optional(),
			baseBuildingId: z.string().optional(),
			resourceId: z.string().optional(),
		}),
	),
});

export type BuildingResourceSchema = typeof BuildingResourceSchema;
