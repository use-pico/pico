import {
	CursorSchema,
	FilterSchema,
	OrderSchema,
	type SortSchema,
} from "@use-pico/common";
import z from "zod";

export namespace withQuerySchema {
	export interface Props<
		TFilterSchema extends FilterSchema,
		TSortSchema extends SortSchema<any>,
	> {
		filter: TFilterSchema;
		sort: TSortSchema;
	}
}

export const withQuerySchema = <
	TFilterSchema extends FilterSchema,
	TSortSchema extends SortSchema<any>,
>({
	filter,
	sort,
}: withQuerySchema.Props<TFilterSchema, TSortSchema>) => {
	return z.object({
		cursor: CursorSchema.nullish(),
		filter: z.nullish(filter),
		where: z.nullish(filter),
		sort: z.nullish(sort),
	});
};

export const InventoryItemQuerySchema = withQuerySchema({
	filter: z.object({
		...FilterSchema.shape,
		name: z.string().nullish(),
		description: z.string().nullish(),
		amountLte: z.number().nullish(),
		amountGte: z.number().nullish(),
	}),
	sort: z.object({
		name: OrderSchema,
		amount: OrderSchema,
	}),
});

export type InventoryItemQuerySchema = typeof InventoryItemQuerySchema;

export namespace InventoryItemQuerySchema {
	export type Type = z.infer<typeof InventoryItemQuerySchema>;
}

const foo: InventoryItemQuerySchema.Type = {
	cursor: {
		page: 1,
		size: 10,
	},
	filter: {
		amountLte: 10,
	},
	sort: {
		amount: "asc",
	},
};
