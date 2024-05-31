import {z} from "zod";

export const CountSchema = z.object({
	total: z.number(),
	where: z.number(),
	count: z.number(),
});
export type CountSchema = typeof CountSchema;
export namespace CountSchema {
	export type Type = z.infer<CountSchema>;
}
