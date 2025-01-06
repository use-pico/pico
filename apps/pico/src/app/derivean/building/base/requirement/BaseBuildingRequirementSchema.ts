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
		amount: z.number().positive(),
		passive: z.union([
			z.boolean(),
			z
				.number()
				.int()
				.refine((val) => val === 0 || val === 1)
				.transform((val) => (typeof val === "boolean" ? val : val === 1)),
		]),
	}),
);

export const BaseBuildingRequirementSchema = withSourceSchema({
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
		passive: z.boolean(),
	}),
	filter: FilterSchema.merge(
		z.object({
			baseBuildingId: z.string().optional(),
			resourceId: z.string().optional(),
			passive: z.boolean().optional(),
		}),
	),
	sort: ["name", "resource", "passive"],
});

export type BaseBuildingRequirementSchema =
	typeof BaseBuildingRequirementSchema;
