import type { z } from "zod";
import type { OrderSchema } from "./OrderSchema";

export type SortSchema<T extends z.core.util.EnumLike> = z.core.$ZodArray<
	z.core.$ZodObject<
		{
			name: z.core.$ZodEnum<T>;
			sort: OrderSchema;
		},
		z.core.$strip
	>
>;
