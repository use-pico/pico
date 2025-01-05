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
		userId: z.string().min(1),
		resourceId: z.string().min(1),
		amount: z.number().nonnegative(),
	}),
);

export const InventorySchema = withSourceSchema({
	entity,
	output: entity.merge(
		z.object({
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
			resourceId: z.string().optional(),
		}),
	),
});

export type InventorySchema = typeof InventorySchema;
