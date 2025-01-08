import {
    FilterSchema,
    IdentitySchema,
    translator,
    withSourceSchema,
} from "@use-pico/common";
import { z } from "zod";

const entity = IdentitySchema.merge(
	z.object({
		resourceId: z.string().min(1),
		requirementId: z.string().min(1),
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

export const ResourceRequirementSchema = withSourceSchema({
	entity,
	shape: z.object({
		requirementId: z.string().min(1),
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
			resourceId: z.string().optional(),
			requirementId: z.string().optional(),
		}),
	),
	sort: ["resource", "requirement", "amount", "passive"],
});

export type ResourceRequirementSchema = typeof ResourceRequirementSchema;
