import { z } from "zod";

export const CountSchema = z.strictObject({
	where: z.number(),
	filter: z.number(),
	total: z.number(),
});

export type CountSchema = typeof CountSchema;

export namespace CountSchema {
	export type Type = z.infer<typeof CountSchema>;
}
