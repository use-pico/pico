import {
    FilterSchema,
    IdentitySchema,
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

export const StorageSchema = withRepositorySchema({
	entity,
	output: entity.merge(
		z.object({
			resource: ResourceSchema.output,
			building: BuildingSchema.output,
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
					message: "Size must be a number",
				}),
		]),
	}),
	filter: FilterSchema.merge(
		z.object({
			buildingId: z.string().optional(),
			resourceId: z.string().optional(),
		}),
	),
});

export type StorageSchema = typeof StorageSchema;