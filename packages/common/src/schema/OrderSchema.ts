import { z } from "zod";

export const OrderSchema = z
	.enum([
		"asc",
		"desc",
	])
	.nullish();

export type OrderSchema = typeof OrderSchema;

export namespace OrderSchema {
	export type Type = z.infer<OrderSchema>;
}
