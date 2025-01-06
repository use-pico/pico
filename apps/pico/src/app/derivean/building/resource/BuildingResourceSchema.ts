import {
    FilterSchema,
    IdentitySchema,
    translator,
    withSourceSchema,
} from "@use-pico/common";
import { z } from "zod";
import { BuildingSchema } from "~/app/derivean/building/BuildingSchema";
import { ResourceSchema } from "~/app/derivean/resource/ResourceSchema";

const entity = IdentitySchema.merge(
	z.object({
		buildingId: z.string().min(1),
		resourceId: z.string().min(1),
		amount: z.number().nonnegative(),
	}),
);

export const BuildingResourceSchema = withSourceSchema({
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
			z.number().nonnegative(),
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
			resourceId: z.string().optional(),
			baseBuildingId: z.string().optional(),
		}),
	),
	sort: ["name", "resource"],
});

export type BuildingResourceSchema = typeof BuildingResourceSchema;
