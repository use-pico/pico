import {
    FilterSchema,
    IdentitySchema,
    withRepositorySchema,
} from "@use-pico/common";
import { z } from "zod";
import { BaseBuildingSchema } from "~/app/derivean/building/base/BaseBuildingSchema";
import { ResourceSchema } from "~/app/derivean/resource/ResourceSchema";

const entity = IdentitySchema.merge(
	z.object({
		baseBuildingId: z.string().min(1),
		/**
		 * Resource
		 */
		resourceId: z.string().min(1),
		/**
		 * Storage level
		 */
		level: z.number().positive(),
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
			baseBuilding: BaseBuildingSchema.output,
			resource: ResourceSchema.output,
		}),
	),
	shape: z.object({
		resourceId: z.string().min(1),
		level: z.union([
			z.number().positive(),
			z
				.string()
				.transform((value) => parseFloat(value))
				.refine((value) => !isNaN(value), {
					message: "Size must be a number",
				}),
		]),
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
			baseBuildingId: z.string().optional(),
			resourceId: z.string().optional(),
		}),
	),
});

export type BaseStorageSchema = typeof BaseStorageSchema;
