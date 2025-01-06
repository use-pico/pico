import {
    TagSchema as CoolTagSchema,
    FilterSchema,
    translator,
    withSourceSchema,
} from "@use-pico/common";
import { z } from "zod";

export const TagSchema = withSourceSchema({
	entity: CoolTagSchema,
	shape: z.object({
		code: z.string().min(1),
		label: z.string().min(1),
		group: z.string().nullish(),
		sort: z.union([
			z.number().int().nonnegative(),
			z
				.string()
				.transform((value) => parseInt(value, 10))
				.refine((value) => !isNaN(value), {
					message: translator.text("Sort must be a number"),
				}),
		]),
	}),
	filter: FilterSchema.merge(
		z.object({
			code: z.string().optional(),
			group: z.string().optional(),
		}),
	),
	sort: ["sort", "code", "label", "group"],
});

export type TagSchema = typeof TagSchema;
