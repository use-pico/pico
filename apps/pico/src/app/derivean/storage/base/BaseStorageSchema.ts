import {
    FilterSchema,
    IdentitySchema,
    withRepositorySchema,
} from "@use-pico/common";
import { z } from "zod";
import { ResourceSchema } from "~/app/derivean/resource/ResourceSchema";

const entity = IdentitySchema.merge(
	z.object({
		/**
		 * Resource
		 */
		resourceId: z.string().min(1),
		/**
		 * Storage limit of this resource
		 */
		limit: z.number().positive(),
	}),
);

export const BaseStorageSchema = withRepositorySchema({
	entity,
	output: entity.merge(
		z.object({
			resource: ResourceSchema.output,
		}),
	),
	shape: z.object({
		resourceId: z.string().min(1),
		limit: z.union([
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
			resourceId: z.string().optional(),
		}),
	),
});

export type BaseStorageSchema = typeof BaseStorageSchema;
