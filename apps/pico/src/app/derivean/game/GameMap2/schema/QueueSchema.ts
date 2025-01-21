import { z } from "zod";

export const QueueSchema = z.object({
	id: z.string().min(1),
	name: z.string().min(1),
	x: z.number(),
	y: z.number(),
	from: z.number().int().nonnegative(),
	to: z.number().int().nonnegative(),
	cycle: z.number().int().nonnegative(),
});

export type QueueSchema = typeof QueueSchema;

export namespace QueueSchema {
	export type Type = z.infer<QueueSchema>;
}
