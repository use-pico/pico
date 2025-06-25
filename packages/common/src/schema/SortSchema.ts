import type { z } from "zod";
import type { OrderSchema } from "./OrderSchema";

export type SortSchema<
	T extends [
		string,
		...string[],
	],
> = z.ZodArray<
	z.ZodObject<
		{
			name: z.ZodEnum<T>;
			sort: OrderSchema;
		},
		"strip"
	>
>;
