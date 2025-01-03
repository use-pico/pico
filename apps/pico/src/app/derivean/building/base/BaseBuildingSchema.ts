import {
    FilterSchema,
    IdentitySchema,
    translator,
    withRepositorySchema,
} from "@use-pico/common";
import { z } from "zod";
import { BaseBuildingLimitSchema } from "~/app/derivean/building/base/limit/BaseBuildingLimitSchema";
import { BaseBuildingRequirementSchema } from "~/app/derivean/building/base/requirement/BaseBuildingRequirementSchema";

const entity = IdentitySchema.merge(
	z.object({
		name: z.string().min(1),
		preview: z.union([
			z.boolean(),
			z
				.number()
				.int()
				.refine((val) => val === 0 || val === 1)
				.transform((val) => (typeof val === "boolean" ? val : val === 1)),
		]),
		cycles: z.number().int().positive(),
		limit: z.number().int().nonnegative(),
	}),
);

export const BaseBuildingSchema = withRepositorySchema({
	entity,
	output: entity.merge(
		z.object({
			requirements: z.array(BaseBuildingRequirementSchema.output),
			limits: z.array(BaseBuildingLimitSchema.output),
		}),
	),
	shape: z.object({
		name: z.string().min(1),
		preview: z.boolean(),
		cycles: z.union([
			z.number().int().positive(),
			z
				.string()
				.transform((value) => parseInt(value, 10))
				.refine((value) => !isNaN(value), {
					message: translator.text("Cycles must be a number"),
				}),
		]),
		limit: z.union([
			z.number().int().nonnegative(),
			z
				.string()
				.transform((value) => parseInt(value, 10))
				.refine((value) => !isNaN(value), {
					message: translator.text("Limit must be a number"),
				}),
		]),
	}),
	filter: FilterSchema.merge(
		z.object({
			name: z.string().optional(),
			preview: z.boolean().optional(),
		}),
	),
});

export type BaseBuildingSchema = typeof BaseBuildingSchema;
