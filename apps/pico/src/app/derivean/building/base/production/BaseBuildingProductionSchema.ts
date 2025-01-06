import {
    FilterSchema,
    IdentitySchema,
    translator,
    withSourceSchema,
} from "@use-pico/common";
import { z } from "zod";
import { ResourceSchema } from "~/app/derivean/resource/ResourceSchema";

const entity = IdentitySchema.merge(
	z.object({
		baseBuildingId: z.string().min(1),
		resourceId: z.string().min(1),
		amount: z.number().nonnegative(),
		cycles: z.number().nonnegative(),
	}),
);

export const BaseBuildingProductionSchema = withSourceSchema({
	entity,
	output: entity.merge(
		z.object({
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
		cycles: z.union([
			z.number().positive(),
			z
				.string()
				.transform((value) => parseFloat(value))
				.refine((value) => !isNaN(value), {
					message: translator.text("Cycles must be a number"),
				}),
		]),
	}),
	filter: FilterSchema.merge(
		z.object({
			baseBuildingId: z.string().optional(),
			resourceId: z.string().optional(),
		}),
	),
});

export type BaseBuildingProductionSchema = typeof BaseBuildingProductionSchema;
