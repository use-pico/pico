import {
    TagSchema as CoolTagSchema,
    FilterSchema,
    withRepositorySchema,
} from "@use-pico/common";
import { z } from "zod";

export const TagSchema = withRepositorySchema({
	entity: CoolTagSchema,
	shape: z.object({
		code: z.string().min(1),
		label: z.string().min(1),
		group: z.string().optional(),
		sort: z.number().optional(),
	}),
	filter: FilterSchema.merge(
		z.object({
			code: z.string().optional(),
			group: z.string().optional(),
		}),
	),
});

export type TagSchema = typeof TagSchema;
