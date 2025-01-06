import {
    FilterSchema,
    IdentitySchema,
    translator,
    withSourceSchema,
} from "@use-pico/common";
import { z } from "zod";

const entity = IdentitySchema.merge(
	z.object({
		baseBuildingProductionId: z.string().min(1),
		resourceId: z.string().min(1),
		amount: z.number().nonnegative(),
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

export const BaseBuildingProductionRequirementSchema = withSourceSchema({
	entity,
	output: entity.merge(
		z.object({
			//
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
		passive: z.boolean(),
	}),
	filter: FilterSchema.merge(
		z.object({
			baseBuildingProductionId: z.string().optional(),
			resourceId: z.string().optional(),
			passive: z.boolean().optional(),
		}),
	),
	sort: ["resource"],
});

export type BaseBuildingProductionRequirementSchema =
	typeof BaseBuildingProductionRequirementSchema;
